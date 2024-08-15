import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addcard',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './addcard.component.html',
  styleUrl: './addcard.component.css'
})
export class AddcardComponent {
  productName: string = '';
  productImage: string = '';
  productPrice: number = 0;
  quantity: number = 1;
  discount: number = 0;
  totalPrice: number = 0;

  private basePrice: number = 0; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve product details from URL queryParams
    this.route.queryParams.subscribe(params => {
      this.productName = params['name'];
      this.productImage = params['image'];
      this.basePrice = +params['price'] || 0;
      this.productPrice = this.basePrice;
      this.calculateTotalPrice();
    });
  }

  increment(): void {
    this.quantity++;
    this.calculateTotalPrice();
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.productPrice * this.quantity;

    // Example discount logic: 10% discount if more than 5 items are bought
    if (this.quantity >=2) {
      this.discount = this.totalPrice * 0.10; // 10% discount
    } else {
      this.discount = 0;
    }

    this.totalPrice -= this.discount;
  }
}