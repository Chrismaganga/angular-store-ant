import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

import { Observable } from 'rxjs';
import { PhoneService } from '../../services/products.service';
import { Phone, Phones } from '../../models/product';
import { error } from 'console';

@Component({
  selector: 'app-phone-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class PhoneListComponent implements OnInit {
  phones: Phone[] = [];
  loading = false;
  errorMessage: string | null = null;

  constructor(private phoneService: PhoneService) { }

  ngOnInit(): void {
    this.fetchPhones();
  }
  fetchPhones() {
    throw new Error('Method not implemented.');
  }

  addToCart(phone: Phone): any {
    throw new Error('Method not implemented.');
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
    // Display the error message to the user
    alert(this.errorMessage);
  }
}
