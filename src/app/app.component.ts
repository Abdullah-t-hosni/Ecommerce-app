import {Component, OnInit} from '@angular/core';
import {CartService} from "./Shared/services/cart.service";
import {AuthService} from "./Shared/services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Ecommerce-app';
  constructor(private cartService: CartService, private authService: AuthService) {
  }
  ngOnInit() {
    this.authService.saveUserData();
    this.cartService.getUserCart().subscribe({
      next: (response) => {
        this.cartService.totalCartItems.next(response.numOfCartItems);
        this.cartService.cartId.next(response.data._id);
      },
    });
  }
}
