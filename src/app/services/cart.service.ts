import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Define the structure of cart data with type safety
  cartData = {
    products: [] as Array<{ id: number; price: number; quantity: number; image: string; title: string; maxQuantity: number }>,
    total: 0,
  };

  // Observable to track cart data changes
  cartDataObs$ = new BehaviorSubject(this.cartData);

  constructor(
    private _notification: NzNotificationService,
    private _api: ApiService
  ) {
    // Load cart data from localStorage, if available
    const localCartData = localStorage.getItem('cart');
    if (localCartData) {
      this.cartData = JSON.parse(localCartData);
      this.cartDataObs$.next(this.cartData); // Update observable with loaded data
    }
  }

  submitCheckout(userId: any, cart: any) {
    // POST request to create an order
    return this._api.postTypeRequest('orders/create', {
      userId: userId,
      cart: cart,
    });
  }

  addProduct(params: { id: number; price: number; quantity?: number; image: string; title: string; maxQuantity: number }): void {
    const { id, price, quantity = 1, image, title, maxQuantity } = params;
    const product = { id, price, quantity, image, title, maxQuantity };

    if (!this.isProductInCart(id)) {
      // Add new product to cart
      this.cartData.products.push(product);
    } else {
      // Update quantity of existing product
      let updatedProducts = [...this.cartData.products];
      let productIndex = updatedProducts.findIndex((prod) => prod.id === id);

      // Update product quantity
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: updatedProducts[productIndex].quantity + quantity,
      };

      this.cartData.products = updatedProducts;
    }

    // Update total and notify the user
    this.cartData.total = this.getCartTotal();
    this._notification.create(
      'success',
      'Product added to cart',
      `${title} was successfully added to the cart`
    );
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  updateCart(id: number, quantity: number): void {
    // Update product quantity
    const updatedProducts = [...this.cartData.products];
    const productIndex = updatedProducts.findIndex((prod) => prod.id === id);

    if (productIndex !== -1) {
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: quantity,
      };
      this.cartData.products = updatedProducts;
      this.cartData.total = this.getCartTotal();
      this.cartDataObs$.next({ ...this.cartData });
      localStorage.setItem('cart', JSON.stringify(this.cartData));
    }
  }

  removeProduct(id: number): void {
    // Remove product from cart
    const updatedProducts = this.cartData.products.filter(
      (prod) => prod.id !== id
    );
    this.cartData.products = updatedProducts;
    this.cartData.total = this.getCartTotal();
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));

    // Notify user
    this._notification.create(
      'success',
      'Removed successfully',
      'The selected item was removed from the cart successfully'
    );
  }

  clearCart(): void {
    // Clear cart
    this.cartData = {
      products: [],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartData });
    localStorage.setItem('cart', JSON.stringify(this.cartData));
  }

  getCartTotal(): number {
    // Calculate the total price of the cart
    return this.cartData.products.reduce(
      (totalSum, prod) => totalSum + prod.price * prod.quantity,
      0
    );
  }

  isProductInCart(id: number): boolean {
    // Check if the product exists in the cart
    return this.cartData.products.some((prod) => prod.id === id);
  }
}
