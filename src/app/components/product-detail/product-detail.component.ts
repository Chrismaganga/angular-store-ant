import { Component, OnInit } from '@angular/core';
import { Phone } from '../../models/product';
import { PhoneService } from '../../services/products.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-detail',
  templateUrl: './phone-detail.component.html',
  styleUrls: ['./phone-detail.component.css']
})
export class PhoneDetailComponent implements OnInit {
  phone: Phone = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    title: '',
    short_desc: '',
    category: '',
    quantity: 0,
    images: [],
    items: [],
    totalCount: 0
  };

  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];

  cart: CartItem[] = [];

  constructor(private phoneService: PhoneService) {}

  ngOnInit(): void {
    this.getPhone();
  }

  getPhone(): void {
    this.phoneService.getPhone(1).subscribe(
      (phone: Phone) => {
        this.phone = phone;
      },
      (error: any) => {
        console.error('Error occurred:', error);
      }
    );
  }

  addToCart(): void {
    const existingItem = this.cart.find(item => item.name === this.phone.name);
    if (existingItem) {
      // If item exists in the cart, update its quantity and price
      existingItem.quantity += this.selectedQuantity;
      existingItem.totalPrice += this.phone.price * this.selectedQuantity;
    } else {
      // Add a new item to the cart
      const cartItem: CartItem = {
        name: this.phone.name,
        quantity: this.selectedQuantity,
        totalPrice: this.phone.price * this.selectedQuantity,
        id: 0,
        title: '',
        image: '',
        price: 0,
        short_desc: '',
        category: '',
        description: '',
        images: [],
        items: [],
        totalCount: 0,
      };
      this.cart.push(cartItem);
    }

    // Reset selected quantity
    this.selectedQuantity = 1;
  }
}
