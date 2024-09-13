import { NgModule } from '@angular/core';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { TextInputComponent } from './component/text-input/text-input.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';

@NgModule({
  imports: [
    PagingHeaderComponent,
    PagerComponent,
    BasketSummaryComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    BasketSummaryComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    CdkStepperModule,
  ],
})
export class SharedModule {}
