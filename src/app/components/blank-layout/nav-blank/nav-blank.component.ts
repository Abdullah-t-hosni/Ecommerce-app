import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/Shared/services/auth.service';
import { CartService } from 'src/app/Shared/services/cart.service';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';


@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css'],
})
export class NavBlankComponent {
  numOfCartItems = 0;
  numOfWishItems = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private wishlistService: WhishlistService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // Subscribe to changes in the number of wishlist items
    this.wishlistService.numOfWishItems.subscribe((response: number) => {
      this.numOfWishItems = response;
    });

    // Subscribe to changes in the number of cart items
    this.cartService.changeCartCount.subscribe((response: number) => {
      this.numOfCartItems = response;
    });
  }

  // Method to log out the user
  logOutUser(): void {
    this.authService.logout();
  }
}
