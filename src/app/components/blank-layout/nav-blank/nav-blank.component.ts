import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
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
    private elementRef: ElementRef,
    private renderer2:Renderer2


  ) {
    this.wishlistService.numOfWishItems.subscribe((response: number) => {
      this.numOfWishItems = response;
    });

    this.cartService.changeCartCount.subscribe((response: number) => {
      this.numOfCartItems = response;
    });
  }

    @ViewChild('nav') navElement!: ElementRef;
  @HostListener('window:scroll')
  onScroll():void {

    if (scrollY > 200){
      this.renderer2.addClass(this.navElement.nativeElement, 'px-5');
      this.renderer2.addClass(this.navElement.nativeElement, 'shadow');
      
    }
      else{
        this.renderer2.removeClass(this.navElement.nativeElement, 'px-5');
        this.renderer2.removeClass(this.navElement.nativeElement,'shadow');

      }
    }

    logOutUser(): void {
      this.authService.logout();
    }

}


