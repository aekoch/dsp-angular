// src/app/recipe/recipe.component.ts
import { Component, Input } from '@angular/core';
import { Recipe } from '../data.service'; // Adjust the import path as necessary
import { DataService } from '../data.service';

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
}