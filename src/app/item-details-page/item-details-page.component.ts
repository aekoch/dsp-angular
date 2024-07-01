import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Item, Recipe } from '../data.service';

@Component({
  selector: 'app-item-details-page',
  templateUrl: './item-details-page.component.html',
  styleUrls: ['./item-details-page.component.scss']
})
export class ItemDetailsPageComponent implements OnInit {
  item: Item | undefined;
  recipesOutputtingItem: Recipe[] = [];
  recipesInputtingItem: Recipe[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemId = +params['id'];
      this.dataService.getItem(itemId).subscribe(item => {
        this.item = item;
      });
      this.dataService.getRecipes().subscribe(recipes => {
        this.recipesOutputtingItem = recipes.filter(recipe => recipe.Outputs.some(output => output.Item.ID === this.item?.ID));
        this.recipesInputtingItem = recipes.filter(recipe => recipe.Inputs.some(input => input.Item.ID === this.item?.ID));
      });
    });
  }

  imageUrl(item: Item | undefined): string {
    return item ? `DSP-Json/${item.IconPath}.png ` : `DSP-Icons/unknown.png`;
  }
}