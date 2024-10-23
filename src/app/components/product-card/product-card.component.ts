import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Phone } from '../../models/product';


@Component({
  selector: 'app-phone-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class PhoneCardComponent {
newItem(arg0: any) {
throw new Error('Method not implemented.');
}
  @Input() id!: number;
  @Input() title!: string;
  @Input() images!: string[];
  @Input() price!: number;
  @Input() short_desc!: string; // Assuming this is in the Phone model now
  @Input() category!: string;
  @Input() quantity!: number;
  @Input() description!: string;
  @Input() image: string | undefined = undefined;
  @Output() onAdd = new EventEmitter<Phone>(); // Emit the phone when adding to cart
product: any;
phone: any;


  addToCart() {
    const phone: Phone = {
      id: this.id,
      title: this.title,
      price: this.price,
      short_desc: this.short_desc, // Assuming this is in the Phone model
      category: this.category,
      quantity: this.quantity,
      description: this.description,
      images: this.images,
      image: '',
      items: [],
      totalCount: 0,
      name: ''
    };
    this.onAdd.emit(phone); // Emit the phone object using emit()
  }
}
