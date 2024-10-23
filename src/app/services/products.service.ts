import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Phone } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  getAllPhones(arg0: number, phonePageCounter: number) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://jsonserver.reactbd.com/phone';

  constructor(private http: HttpClient) { }

  getPhone(id: number): Observable<Phone> {
    return this.http.get<Phone>(`${this.apiUrl}/${id}`);
  }

}
