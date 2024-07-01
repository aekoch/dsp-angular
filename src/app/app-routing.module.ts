import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { ItemDetailsPageComponent } from './item-details-page/item-details-page.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailsPageComponent },
  { path: 'recipes', component: RecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }