import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Phone } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Phone[] = [];
  private cartTotal = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<Phone[]>([]);

  constructor() {}

  // Get all products in the cart
  getCart(): Observable<Phone[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Add product to the cart
  addToCart(product: Phone): void {
    const existingProduct = this.cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // If product already exists, increase its quantity
      existingProduct.quantity!++;
    } else {
      // Add new product with quantity 1
      this.cartItems.push({ ...product, quantity: 1 });
    }

    // Update cart items and total
    this.updateCart();
  }

  // Remove product from the cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCart();
  }

  // Update the total price of the cart
  updateCartTotal(): Observable<number> {
    return this.cartTotal.asObservable();
  }

  // Clear the cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Update cart items and total
  private updateCart(): void {
    this.cartItemsSubject.next(this.cartItems);

    const total = this.cartItems.reduce((sum, item) => {
      return sum + item.price * (item.quantity || 1);
    }, 0);

    this.cartTotal.next(total);
  }
}
