import { Component } from '@angular/core';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent {
  numOfCartItems: number = 0;

  constructor( private _AuthService: AuthService,private _cartService: CartService) {
    
    this._cartService.numOfCartItems.subscribe(response => {
      this.numOfCartItems = response;
    });
  }

  logOutUser(): void {
    this._AuthService.logout();
  }
}
