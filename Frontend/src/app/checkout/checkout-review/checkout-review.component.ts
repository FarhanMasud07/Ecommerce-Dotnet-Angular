import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  createPaymentIntent() {
    //throw new Error('Method not implemented.');
  }
}
