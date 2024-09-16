import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { take, tap } from 'rxjs';
import { SignalrService } from './core/services/signalr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService,
    private signalRService: SignalrService
  ) {}
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    basketId && this.basketService.getBasket(basketId);
  }
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService
      .loadCurrentUser(token)
      .pipe(
        take(1),
        tap(() => this.signalRService.createHubConnection())
      )
      .subscribe();
  }
}
