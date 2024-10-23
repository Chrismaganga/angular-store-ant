
import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  name: string;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class  ProductDetailComponent {
  product: Product = {
    id: 1,
    name: 'Sample Product',
    description: 'This is a description of the sample product.',
    price: 49.99,
    imageUrl: 'https://via.placeholder.com/320',
  };

  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];

  cart: CartItem[] = [];

  addToCart(): void {
    const existingItem = this.cart.find(item => item.name === this.product.name);
    if (existingItem) {
      // If item exists in the cart, update its quantity and price
      existingItem.quantity += this.selectedQuantity;
      existingItem.totalPrice += this.product.price * this.selectedQuantity;
    } else {
      // Add a new item to the cart
      const cartItem: CartItem = {
        name: this.product.name,
        quantity: this.selectedQuantity,
        totalPrice: this.product.price * this.selectedQuantity
      };
      this.cart.push(cartItem);
    }

    // Reset selected quantity
    this.selectedQuantity = 1;
  }
}
