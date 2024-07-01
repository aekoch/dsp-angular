// src/app/recipe/recipe.component.ts
import { Component, Input } from '@angular/core';
import { ItemCount, Recipe } from '../data.service'; // Adjust the import path as necessary
import { DataService } from '../data.service';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {
  @Input() recipe!: Recipe;
  
  constructor() {}

  iconUrl(recipe: Recipe): string {
    return recipe.IconPath ? `DSP-Json/${recipe.IconPath}.png` : 'DSP-Json/unknown.png';
  }

  inputsPerMinute(recipe: Recipe): ItemCount[] {
    return recipe.Inputs.map(input => { return { Item: input.Item, Count: Number((input.Count * (60 / recipe.TimeSpend) * 60).toPrecision(3))  } });
  }

  outputsPerMinute(recipe: Recipe): ItemCount[] {
    return recipe.Outputs.map(output => { return { Item: output.Item, Count: Number((output.Count * (60 / recipe.TimeSpend) * 60).toPrecision(3)) } });
  }

}