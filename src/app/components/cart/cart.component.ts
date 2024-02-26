import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Shared/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartDetails:any= {};

  constructor(private _CartService: CartService) { 
  }

  removeFromCart(id:string): void {
    this._CartService.removeItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.data
      },

      error: (err) => {
        console.log(err);
      }
      
    })
  }

  changeCount(id:string , count:number): void {
    this._CartService.updateCartQuantity(id,count).subscribe({
      next: (response) => {
        
        this.cartDetails = response.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        
        this.cartDetails = response.data
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

  
}
