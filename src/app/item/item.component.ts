import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../data.service'; // Adjust the path as necessary

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: Item | undefined;

  name(item: Item | undefined): string {
    return item ? item.Name : '???';
  }

  iconUrl(item: Item | undefined): string {
    return item ? `DSP-Json/${item.IconPath}.png` : 'DSP-Json/unknown.png';
  }

  count(item: Item | undefined): number {
    return item ? item.StackSize : 0;
  }
}