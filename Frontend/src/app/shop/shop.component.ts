import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { NgFor, NgIf } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';
import { SharedModule } from '../shared/shared.module';
import { take } from 'rxjs';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgFor, NgIf, ProductItemComponent, SharedModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  totalCount: number = 0;
  shopParams: ShopParams;
  debounceTimeOut: any;

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to high', value: 'priceAsc' },
    { name: 'Price: High to low', value: 'priceDesc' },
  ];
  constructor(private shopService: ShopService) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  private getProducts() {
    this.shopService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.totalCount = res.count;
        },
        error: (error) => console.log(error),
      });
  }
  private getBrands() {
    this.shopService.getBrands().subscribe({
      next: (res) => (this.brands = [{ id: 0, name: 'All' }, ...res]),
      error: (error) => console.log(error),
    });
  }
  private getTypes() {
    this.shopService.getTypes().subscribe({
      next: (res) => (this.types = [{ id: 0, name: 'All' }, ...res]),
      error: (error) => console.log(error),
    });
  }

  private setShopAndCallGetProducts(shopPayload: ShopParams) {
    this.shopService.setShopParams(shopPayload);
    this.shopParams = shopPayload;
    this.getProducts();
  }

  onBrandSelected(brandId: number) {
    const shopPayload = this.shopService.getShopParams();
    shopPayload.brandId = brandId;
    shopPayload.pageNumber = 1;
    this.setShopAndCallGetProducts(shopPayload);
  }

  onTypeSelected(typeId: number) {
    const shopPayload = this.shopService.getShopParams();
    shopPayload.typeId = typeId;
    shopPayload.pageNumber = 1;
    this.setShopAndCallGetProducts(shopPayload);
  }
  onSortSelected(e: any) {
    const shopPayload = this.shopService.getShopParams();
    shopPayload.sort = e?.target?.value;
    this.setShopAndCallGetProducts(shopPayload);
  }

  onPageChanged(event: any) {
    const shopPayload = this.shopService.getShopParams();
    if (shopPayload.pageNumber !== event) {
      shopPayload.pageNumber = event;
      this.setShopAndCallGetProducts(shopPayload);
    }
  }
  onSearch(event: any): void {
    const searchValue = event?.target?.value;
    const shopPayload = this.shopService.getShopParams();
    shopPayload.search = searchValue;
    shopPayload.pageNumber = 1;
    this.debounceTimeOut && clearInterval(this.debounceTimeOut);
    this.debounceTimeOut = setTimeout(() => {
      this.setShopAndCallGetProducts(shopPayload);
    }, 500);
  }
  reset() {
    this.searchTerm && (this.searchTerm.nativeElement.value = '');
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
}
