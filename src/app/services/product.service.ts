import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 29.99, imageUrl: 'assets/images/product1.jpg', description: 'Description for Product 1' },
    { id: 2, name: 'Product 2', price: 39.99, imageUrl: 'assets/images/product2.jpg', description: 'Description for Product 2' },
    { id: 3, name: 'Product 3', price: 49.99, imageUrl: 'assets/images/product3.jpg', description: 'Description for Product 3' },
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }
}

