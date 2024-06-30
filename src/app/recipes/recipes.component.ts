import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // Adjust the import path as necessary
import { Recipe } from '../data.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }
}