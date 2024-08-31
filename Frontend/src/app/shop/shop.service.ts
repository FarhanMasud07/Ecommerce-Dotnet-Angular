import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { environment } from '../../environments/environment';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = environment.apiUrl;
  shopParams = new ShopParams();
  constructor(private http: HttpClient) {}

  getProducts() {
    let params = new HttpParams();

    this.shopParams.brandId > 0 &&
      (params = params.append('brandId', this.shopParams['brandId']));
    this.shopParams.typeId > 0 &&
      (params = params.append('typeId', this.shopParams.typeId));
    this.shopParams.sort &&
      (params = params.append('sort', this.shopParams.sort));
    this.shopParams.pageNumber &&
      (params = params.append('pageIndex', this.shopParams.pageNumber));
    this.shopParams.pageSize &&
      (params = params.append('pageSize', this.shopParams.pageSize));
    this.shopParams.search &&
      (params = params.append('search', this.shopParams.search));

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', {
      params,
    });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.http.get<Type[]>(this.baseUrl + 'products/types');
  }

  getShopParams() {
    return this.shopParams;
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
}
