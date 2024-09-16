import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignalrService } from '../../core/services/signalr.service';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [NgIf, DatePipe, NgFor, CurrencyPipe, RouterModule],
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.scss',
})
export class CheckoutSuccessComponent implements OnDestroy {
  constructor(
    public signalrService: SignalrService,
    private orderService: OrdersService
  ) {}
  ngOnDestroy(): void {
    this.orderService.orderComplete = false;
    this.signalrService.orderSignal.set(null);
  }
}
