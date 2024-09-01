import { NgModule } from '@angular/core';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { OrderTotalsComponent } from './order-totals/order-totals.component';

@NgModule({
  imports: [
    PagingHeaderComponent,
    PagerComponent,
    BasketSummaryComponent,
    OrderTotalsComponent,
  ],
  exports: [
    PagingHeaderComponent,
    PagerComponent,
    BasketSummaryComponent,
    OrderTotalsComponent,
  ],
})
export class SharedModule {}
