import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { BasketItem } from '../../shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(public basketService: BasketService) {}

  getCount(items: BasketItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
