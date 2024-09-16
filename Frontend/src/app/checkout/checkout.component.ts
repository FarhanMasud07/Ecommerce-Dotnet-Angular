import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CdkStep } from '@angular/cdk/stepper';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    SharedModule,
    CheckoutAddressComponent,
    CheckoutDeliveryComponent,
    CheckoutReviewComponent,
    CheckoutPaymentComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  addressInteracted: boolean = false;
  checkoutForm: FormGroup | any;
  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.initForm();
  }
  ngOnInit(): void {
    this.getAddressFormValues();
  }
  initForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: ['', Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: ['', Validators.required],
      }),
    });
  }
  inter(e: CdkStep) {
    e.interacted && (this.addressInteracted = e.interacted);
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: (address) => {
        address && this.checkoutForm.get('addressForm')?.patchValue(address);
      },
    });
  }
}
