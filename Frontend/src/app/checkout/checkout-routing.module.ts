import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { OrderCompleteGuard } from '../core/guards/order-complete.guard';

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  {
    path: 'success',
    component: CheckoutSuccessComponent,
    canActivate: [OrderCompleteGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
