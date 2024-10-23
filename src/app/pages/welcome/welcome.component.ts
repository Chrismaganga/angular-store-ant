import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { Phone } from '../../models/product';
import { PhoneService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { from, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterModule], // Import RouterModule if you're using routerLink
})
export class WelcomeComponent implements OnInit {
  phones: Phone[] = [];
  loading = false;
  additionalLoading = false;
  phonePageCounter = 1;
  screenWidth!: number;
  screenHeight!: number;
  category: string = '';
  price: number = 0;
  quantity: number = 0;
  http: any;
  apiUrl: any;
phone: any;
product: any;

  constructor(
    private phoneService: PhoneService,
    private cartService: CartService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.initializeScreenSize();
  }

  ngOnInit(): void {
    this.initializeScreenSize();
    this.fetchPhones();
  }

  fetchPhones(): void {
    this.loading = true;
    throw new Error('Method not implemented.');
  }

  initializeScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  addToCart(phone: Phone): void {
    this.cartService.getCart().pipe(
      map((cart: Phone[]) => cart.find((item: Phone) => item.id === phone.id))
    ).subscribe((existingPhone: Phone | undefined) => {
      if (existingPhone) {
        existingPhone.quantity++;
      } else {
        this.cartService.addToCart({ ...phone, quantity: 1 });
      }

      this.cartService.updateCartTotal();
    });
  }
}
