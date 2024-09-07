import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { SharedModule } from '../shared/shared.module';
import { BasketItem } from '../shared/models/basket';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [NgIf, AsyncPipe, SharedModule, RouterModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  constructor(public basketService: BasketService) {}
  incrementQuantity(item: BasketItem) {
    this.basketService.addItemToBasket(item);
  }

  removeItem(event: { id: number; quantity: number }) {
    this.basketService.removeItemFromBasket(event.id, event.quantity);
  }
}
