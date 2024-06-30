import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  itemsGroupedByType: { [type: string]: Item[] } = {};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getItems().subscribe(items => {
      this.items = items;
      this.groupItemsByType();
    });
  }

  private groupItemsByType(): void {
    this.itemsGroupedByType = {};
    for (const item of this.items) {
      if (!this.itemsGroupedByType[item.Type]) {
        this.itemsGroupedByType[item.Type] = [];
      }
      this.itemsGroupedByType[item.Type].push(item);
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}