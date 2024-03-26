import { WishListService } from './../../core/services/wish-list.service';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent {
  numOfCartItems: number = 0;
  numOfWishItems: number = 0;

  constructor(private _AuthService: AuthService, private _cartService: CartService, private _WishListService: WishListService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this._WishListService.wishListCount.subscribe((response: number) => {
      this.numOfWishItems = response;
    })

    this._cartService.changeCartCount.subscribe((response: number) => {
      this.numOfCartItems = response;
    });
  }

  logOutUser(): void {
    this._AuthService.logout();
  }


}
