import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { Product } from '../../models/product'; // Ensure this is the correct path to your Product model

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() id!: number;
  @Input() title!: string;
  @Input() images!: string[];
  @Input() price!: number;
  @Input() short_desc!: string; // Assuming this is in the Product model now
  @Input() category!: string;
  @Input() quantity!: number;
  @Input()description!: string;
  @Input() image: string | undefined = undefined;
  @Output() onAdd = new EventEmitter<Product>(); // Emit the product when adding to cart

  addToCart() {
    const product: Product = {
      id: this.id,
      title: this.title,
      price: this.price,
      short_desc: this.short_desc, // Assuming this is in the Product model
      category: this.category,
      quantity: this.quantity,
      description: this.description,
      images: this.images,
      image: '',
      items: [],
      totalCount: 0
    };
    this.onAdd.emit(product); // Emit the product object using emit()
  }
}

