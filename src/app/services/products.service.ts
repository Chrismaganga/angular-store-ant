import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/product'; // Adjust the import path accordingly
import { env } from 'process';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl; // Your API URL
  baseUrl: any;

  constructor(private http: HttpClient) {}

  getAllProducts(limit: number, page: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/products?_limit=${limit}&_page=${page}`);
      // return this.http.get(`${this.apiUrl}/products`);
  }
}
