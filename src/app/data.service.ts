import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Item {
  ID: number;
  Name: string;
  IconPath: string;
  StackSize: number;
  Type: string;
  Desc: string;
  Upgrades: any[]; // Consider defining a more specific type if possible
  Fluid: boolean;
}

const defaultItem: Item = {
  ID: -1,
  Name: 'Unknown',
  IconPath: 'unknown.png',
  StackSize: 0,
  Type: 'Unknown',
  Desc: '???',
  Upgrades: [],
  Fluid: false
};

interface RawRecipe {
  ID: number;
  Name: string;
  PreTech?: number;
  Handcraft: boolean;
  Type: string;
  TimeSpend: number;
  Items: number[];
  ItemCounts: number[];
  Results: number[];
  ResultCounts: number[];
  IconPath?: string;
}

export interface ItemCount {
  Item: Item;
  Count: number;
}

export interface Recipe {
  ID: number;
  Name: string;
  PreTech?: number;
  Handcraft: boolean;
  Type: string;
  TimeSpend: number;
  IconPath: string;
  Inputs: ItemCount[];
  Outputs: ItemCount[]; 
}

export class Data {
  Items: Item[] = [];
  Recipes: Recipe[] = [];
  Techs: any[] = [];

  constructor(items: Item[], recipes: Recipe[], techs: any[]) {
    this.Items = items;
    this.Recipes = recipes;
    this.Techs = techs;
  }

  getItem(id: number): Item | undefined {
    return this.Items.find(item => item.ID === id);
  }

  getRecipe(id: number): Recipe | undefined {
    return this.Recipes.find(recipe => recipe.ID === id);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private basePath = 'DSP-Json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Data> {
    return new Observable<Data>(observer => {
      const items = this.getItems();
      const recipes = this.getRecipes();
      const techs = this.getTechs();
      forkJoin([items, recipes, techs]).subscribe(([Items, Recipes, Techs]: [Item[], Recipe[], any[]]) => {
        observer.next(new Data(Items, Recipes, Techs));
        observer.complete();
      });
    });
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.basePath}/items.json`);
  }

  getItem(id: number): Observable<Item | undefined> {
    return this.getItems().pipe(map(items => items.find(item => item.ID === id) || undefined));
  }

  private getRawRecipes(): Observable<RawRecipe[]> {
    return this.http.get<RawRecipe[]>(`${this.basePath}/recipes.json`);
  }

  getRecipes(): Observable<Recipe[]> {
    const items = this.getItems();
    const rawRecipes = this.getRawRecipes();
    return forkJoin([items, rawRecipes]).pipe(map(([Items, RawRecipes]: [Item[], RawRecipe[]]) => {
      return RawRecipes.map(rawRecipe => {
        const inputs = rawRecipe.Items.map((id, index) => ({ Item: Items.find(item => item.ID === id) || defaultItem, Count: rawRecipe.ItemCounts[index] }));
        const outputs = rawRecipe.Results.map((id, index) => ({ Item: Items.find(item => item.ID === id) || defaultItem, Count: rawRecipe.ResultCounts[index] }));
        const IconPath = this.recipeIcon(rawRecipe, outputs)
        return { ...rawRecipe, Inputs: inputs, Outputs: outputs, IconPath: IconPath };
      });
    }));
  }

  private recipeIcon(recipe: RawRecipe, outputs: ItemCount[]): string {
    if (recipe.IconPath) {
      return recipe.IconPath;
    }
    if (outputs.length === 1) {
      return outputs[0].Item.IconPath;
    }
    return 'unknown';
  }

  getTechs(): Observable<any> { // Consider defining a specific type for techs
    return this.http.get(`${this.basePath}/techs.json`);
  }

  getIcon(iconName: string): Observable<Blob> {
    return this.http.get(`${this.basePath}/icons/${iconName}`, { responseType: 'blob' });
  }
}