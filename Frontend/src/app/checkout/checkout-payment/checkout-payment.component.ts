import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { Basket } from '../../shared/models/basket';
import { OrderToCreate } from '../../shared/models/order';
import { Address } from '../../shared/models/user';
import { SharedModule } from '../../shared/shared.module';
import { NgIf } from '@angular/common';
import {
  loadStripe,
  Stripe,
  StripeCardCvcElement,
  StripeCardExpiryElement,
  StripeCardNumberElement,
  StripeElements,
} from '@stripe/stripe-js';
import { firstValueFrom, Observable } from 'rxjs';
import { OrdersService } from '../../orders/orders.service';

@Component({
  selector: 'app-checkout-payment',
  standalone: true,
  imports: [NgIf, SharedModule, ReactiveFormsModule],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss',
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup | any;
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;

  loading = false;
  cardErrors: any;
  cardCvcComplete = false;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;
  constructor(
    private basketService: BasketService,
    private orderService: OrdersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    loadStripe(
      'pk_test_51PyVMWI8zoqmmFVn1Ocu6FX4pdtZj6WHPkZnVEUQ8yExjrMS3xanJdGO5Zu1DCKaL8fdh8CPdEzJqXiJcQT5rSTC00mfbYZBH5'
    ).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumberValidation(elements);
        this.cardExpiryValidation(elements);
        this.cardCvcValidation(elements);
      }
    });
  }
  get paymentFormComplete() {
    return (
      this.checkoutForm?.get('paymentForm')?.valid &&
      this.cardNumberComplete &&
      this.cardExpiryComplete &&
      this.cardCvcComplete
    );
  }
  private cardNumberValidation(elements: StripeElements) {
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement?.nativeElement);
    this.cardNumber.on('change', (event) => {
      this.cardNumberComplete = event.complete;
      if (event.error) this.cardErrors = event.error.message;
      else this.cardErrors = null;
    });
  }

  private cardExpiryValidation(elements: StripeElements) {
    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement?.nativeElement);
    this.cardExpiry.on('change', (event) => {
      this.cardExpiryComplete = event.complete;
      if (event.error) this.cardErrors = event.error.message;
      else this.cardErrors = null;
    });
  }

  private cardCvcValidation(elements: StripeElements) {
    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement?.nativeElement);
    this.cardCvc.on('change', (event) => {
      this.cardCvcComplete = event.complete;
      if (event.error) this.cardErrors = event.error.message;
      else this.cardErrors = null;
    });
  }

  async submitOrder() {
    this.loading = true;
    const basket = this.basketService.getCurrentBasketValue();
    if (!basket) throw new Error('cannot get basket');
    try {
      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);
      if (paymentResult.paymentIntent) {
        this.orderService.orderComplete = true;
        this.basketService.deleteBasket(basket);
        const navigationExtras: NavigationExtras = { state: createdOrder };
        this.router.navigate(['checkout/success', navigationExtras]);
      } else {
        this.toastr.error(paymentResult.error.message);
      }
    } catch (err: any) {
      console.log(err);
      this.toastr.error(err.message);
    } finally {
      this.loading = false;
    }
  }
  private async confirmPaymentWithStripe(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!, {
      payment_method: {
        card: this.cardNumber!,
        billing_details: {
          name: this.checkoutForm?.get('paymentForm')?.get('nameOnCard')?.value,
        },
      },
    });
    if (!result) throw new Error('Problem attempting payment with stripe');
    return result;
  }
  private async createOrder(basket: Basket | null) {
    if (!basket) throw new Error('Basket is null');
    const orderToCreate = await this.getOrderToCreate(basket);
    return firstValueFrom(this.orderService.createOrder(orderToCreate));
  }

  private async getOrderToCreate(basket: Basket): Promise<OrderToCreate> {
    const deliveryMethodId = this.checkoutForm
      ?.get('deliveryForm')
      ?.get('deliveryMethod')?.value;
    const shipToAddress = this.checkoutForm?.get('addressForm')
      ?.value as Address;

    if (!deliveryMethodId || !shipToAddress)
      throw new Error('Problem with basket');
    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress,
      discount: await this.getDiscount(),
    };
  }
  async getDiscount(): Promise<number | undefined> {
    const res = await firstValueFrom(this.basketService.basketTotalSource$);
    return res?.discount;
  }
}
