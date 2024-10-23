import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse
import { Product } from '../../models/product';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    this.productService['getProducts']().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.handleError(error);
        this.loading = false;
      }
    );
  }

  handleError(error: HttpErrorResponse): void {
    // Handle the error appropriately
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      this.errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code
      this.errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error('Error occurred:', this.errorMessage);
  }
}
