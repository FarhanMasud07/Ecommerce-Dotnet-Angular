import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [NgIf, CurrencyPipe, AsyncPipe],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss',
})
export class OrderTotalsComponent {
  constructor(public basketService: BasketService) {}
}
