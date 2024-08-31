import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [NavBarComponent, SectionHeaderComponent, NgxSpinnerModule],
  exports: [NavBarComponent, SectionHeaderComponent, NgxSpinnerModule],
})
export class CoreModule {}
