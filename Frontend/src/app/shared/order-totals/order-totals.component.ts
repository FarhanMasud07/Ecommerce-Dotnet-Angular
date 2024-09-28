import {
  AsyncPipe,
  CurrencyPipe,
  NgIf,
  Location as loc,
} from '@angular/common';
import { Component, inject } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, of, take } from 'rxjs';

@Component({
  selector: 'app-order-totals',
  standalone: true,
  imports: [NgIf, FormsModule, CurrencyPipe, AsyncPipe],
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.scss',
})
export class OrderTotalsComponent {
  location = inject(loc);
  code?: string;
  constructor(public basketService: BasketService) {}
  applyCouponCode() {
    if (!this.code) return;
    this.basketService.applyDiscount(this.code).subscribe({
      next: async (coupon) => {
        const currentBasket = this.basketService.getCurrentBasketValue();
        if (currentBasket) {
          currentBasket.coupon = coupon;
          this.basketService.setBasket(currentBasket);
          this.code = undefined;
          this.location.path() === '/checkout' &&
            (await firstValueFrom(this.basketService.createPaymentIntent()));
        }
      },
    });
  }
  async removeCouponCode() {
    const currentBasket = this.basketService.getCurrentBasketValue();
    if (!currentBasket) return;
    if (currentBasket.coupon) currentBasket.coupon = undefined;
    this.basketService.setBasket(currentBasket);
    this.location.path() === '/checkout' &&
      (await firstValueFrom(this.basketService.createPaymentIntent()));
  }
}
