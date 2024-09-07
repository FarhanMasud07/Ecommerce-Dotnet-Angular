import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { BasketItem } from '../../shared/models/basket';
import { AccountService } from '../../account/account.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterModule, BsDropdownModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    public basketService: BasketService,
    public accountService: AccountService
  ) {}

  getCount(items: BasketItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
