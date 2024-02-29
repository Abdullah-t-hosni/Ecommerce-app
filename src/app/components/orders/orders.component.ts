import { Component } from '@angular/core';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {

  cartDetails: any = {};
  constructor(private _cartService: CartService) {}


}
