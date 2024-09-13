import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeliveryMethod } from '../../shared/models/deliveryMethod';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CheckoutService } from '../checkout.service';
import { BasketService } from '../../basket/basket.service';
import { CdkStepperModule } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, ReactiveFormsModule, CdkStepperModule],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent implements OnChanges {
  @Input() checkoutForm?: FormGroup | any;
  @Input() addressInteracted: boolean = false;
  deliveryMethods: DeliveryMethod[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private basketService: BasketService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    changes['addressInteracted'].currentValue && this.retrieveDeliveryMethods();
  }

  retrieveDeliveryMethods() {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: (dm) => (this.deliveryMethods = dm),
    });
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
