import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartId: string = '';
  shippingAddress: FormGroup;

  constructor(
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.shippingAddress = new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: any) => {
      this.cartId = params.get('cartId') || '';
    });
  }

  handleOnline(): void {
    this._cartService.generateOnlinePayment(this.cartId, this.shippingAddress.value)
      .subscribe({
        next: (response) => {
          window.location.href = response.session.url;
        },
        error: (error) => {
          console.error('Error occurred during online payment:', error);
        }
      });
  }
}
