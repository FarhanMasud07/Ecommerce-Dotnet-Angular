import { CanActivate, Router } from '@angular/router';
import { OrdersService } from '../../orders/orders.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderCompleteGuard implements CanActivate {
  constructor(private orderService: OrdersService, private router: Router) {}
  canActivate(): boolean {
    if (this.orderService.orderComplete) {
      return true;
    } else {
      this.router.navigateByUrl('/shop');
      return false;
    }
  }
}
