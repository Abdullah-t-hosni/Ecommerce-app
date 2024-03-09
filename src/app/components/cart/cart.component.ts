import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Shared/services/cart.service';
import { Product } from 'src/app/Shared/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: any = null;
  product: Product[] = [];

  constructor(private _CartService: CartService, private _Router: Router) {}

  removeFromCart(id: string): void {
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
   
    });
  }

  changeCount(id: string, count: number): void {
    this._CartService.updateCartQuantity(id, count).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
   
    });
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },

    });
  }

  clear(): void {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this.cartDetails = null;
        }
      },

    });
  }
}
