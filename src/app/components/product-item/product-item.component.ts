import { Component } from '@angular/core';


@Component({
  selector: 'app-phone-item',
  standalone: true,
  imports: [],
  templateUrl: './phone-item.component.html',
  styleUrls: ['./phone-item.component.css']
})
export class PhoneDetailComponent {
  selectedQuantity: any;
  addToCart(_t3: any) {
    throw new Error('Method not implemented.');
  }
}
