import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { Product, Products } from '../../models/product'; // Ensure Product interface reflects the data structure
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomeComponent implements OnInit {
  products: Product[] = []; // Array to hold products
  loading = false; // Loading indicator for initial fetch
  additionalLoading = false; // Loading indicator for additional product fetch
  productPageCounter = 1; // Counter for pagination
  screenWidth!: number; // Screen width for responsive design
  screenHeight!: number; // Screen height for responsive design
  Products: Products;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.initializeScreenSize();
  }

  ngOnInit(): void {
    this.initializeScreenSize();
    this.fetchProducts();
  }

  initializeScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

fetchProducts(): void {
  this.loading = true;
  this.productService.getAllProducts(9, this.productPageCounter).subscribe(
    (res: Products) => { // Ensure this is Products type
      this.Products = res; // Assign directly to products
      this.loading = false; // Stop loading
    },
    (err) => {
      console.error(err); // Log error
      this.loading = false; // Stop loading
    }
  );
}

showMoreProducts(): void {
  this.additionalLoading = true; // Start loading indicator
  this.productPageCounter++; // Increment page counter

  this.productService.getAllProducts(9, this.productPageCounter).subscribe(
    (res: Products) => { // Ensure this is Products type
      this.products = [...this.products, ...res]; // Merge new products
      this.additionalLoading = false; // Stop loading
    },
    (err) => {
      console.error(err); // Log error
      this.additionalLoading = false; // Stop loading
    }
  );
}

}
