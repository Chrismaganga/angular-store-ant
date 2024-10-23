import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm!: FormGroup;

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      paymentMethod: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form Submitted!', this.checkoutForm.value);
    }
  }
}
