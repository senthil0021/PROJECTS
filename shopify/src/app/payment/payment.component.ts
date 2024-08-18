import { Component } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  onSubmit() {
    
    console.log('Payment submitted');
    alert('payment successfull')
    
  }
}
