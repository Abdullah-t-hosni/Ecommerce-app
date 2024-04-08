import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/Shared/interfaces/product';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css'],
})
export class WhishlistComponent implements OnInit {
  products: Product[] = [];
  wishListData: string[] | null = null;

  constructor(
    private wishlistService: WhishlistService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist(): void {
    this.wishlistService.getWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        this.wishListData = response.data.map((item: any) => item._id);
      },
    });
  }

  addCart(id: string, element: HTMLButtonElement): void {
    this.renderer.setAttribute(element, 'disabled', 'true');
    this.cartService.addToCart(id).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.renderer.removeAttribute(element, 'disabled');
        this.cartService.totalCartItems.next(response.numOfCartItems);
      },
      error: () => {
        this.renderer.removeAttribute(element, 'disabled');
      },
    });
  }

  addFav(id: string): void {
    this.wishlistService.addToWishList(id).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }

  removeFav(id: string): void {
    this.wishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.wishListData = response.data;
        this.products = this.products.filter((item) => this.wishListData?.includes(item._id));
        this.getWishlist();

      },
    });
  }
}
