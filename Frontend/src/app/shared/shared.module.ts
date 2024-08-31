import { NgModule } from '@angular/core';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  imports: [PagingHeaderComponent, PagerComponent],
  exports: [PagingHeaderComponent, PagerComponent],
})
export class SharedModule {}
