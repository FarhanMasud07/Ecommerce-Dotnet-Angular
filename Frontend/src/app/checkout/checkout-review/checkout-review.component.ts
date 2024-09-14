import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss',
})
export class CheckoutReviewComponent {
  @Input() appStepper?: CdkStepper;

  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => {
        this.appStepper?.next();
      },
      error: (error) => this.toastr.error(error.message),
    });
  }
}
