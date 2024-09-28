import { createId } from '@paralleldrive/cuid2';

export interface BasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface Basket {
  id: string;
  items: BasketItem[];
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMetodId?: number;
  shippingPrice: number;
}

export class Basket implements Basket {
  id = createId();
  items: BasketItem[] = [];
  shippingPrice = 0;
  coupon?: Coupon;
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
  discount: number;
}
export type Coupon = {
  name: string;
  amountOff?: number;
  percentOff?: number;
  promotionCode: string;
  couponId: string;
};
