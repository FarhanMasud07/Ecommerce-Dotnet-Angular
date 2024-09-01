import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgIf, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  quantity = 1;
  quantityInBasket = 0;

  constructor(
    private shopService: ShopService,
    private bcService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    id &&
      this.shopService.getProduct(+id).subscribe({
        next: (res) => {
          this.product = res;
          this.bcService.set('@productDetails', res.name);
          this.setQuantityIntoBasket(+id);
        },
        error: (err) => console.error('Error:', err),
      });
  }

  private setQuantityIntoBasket(id: number) {
    this.basketService.basketSource$.pipe(take(1)).subscribe({
      next: (basket) => {
        const item = basket?.items.find((x) => x.id === id);
        if (item) {
          this.quantity = item.quantity;
          this.quantityInBasket = item.quantity;
        }
      },
    });
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    this.quantity--;
  }

  updateBasket() {
    if (this.product) {
      if (this.quantity > this.quantityInBasket) {
        const itemsToAdd = this.quantity - this.quantityInBasket;
        this.quantityInBasket += itemsToAdd;
        this.basketService.addItemToBasket(this.product, itemsToAdd);
      } else {
        const itemsToRemove = this.quantityInBasket - this.quantity;
        this.quantityInBasket -= itemsToRemove;
        this.basketService.removeItemFromBasket(this.product.id, itemsToRemove);
      }
    }
  }
  get buttonText() {
    return this.quantityInBasket === 0 ? 'Add to basket' : 'Update basket';
  }
}
