import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(private basketService: BasketService) {}
  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    basketId && this.basketService.getBasket(basketId);
  }
}
