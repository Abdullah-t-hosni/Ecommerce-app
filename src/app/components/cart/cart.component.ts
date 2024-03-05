import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/Shared/interfaces/cart';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cartDetails:any = {};

  constructor(private _CartService: CartService) {}

  removeFromCart(id: string): void {
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  changeCount(id: string, count: number): void {
    this._CartService.updateCartQuantity(id, count).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  clearCart(): void {
    this._CartService.removeCart().subscribe({
      next: (response) => {
        if(response.message === 'success'){
          this.cartDetails = null;
          this.getCart();
        }
      
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
