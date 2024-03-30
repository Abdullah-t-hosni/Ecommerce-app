import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/Shared/interfaces/product';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Shared/services/cart.service';
import { termtextPipe } from '../../termtext.pipe'

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css'],
})
export class WhishlistComponent implements OnInit {
  products: Product[] =  [];
  wishListData: null | string[] = [];

  constructor(
    private _WhishlistService: WhishlistService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.getWish()
  }

  getWish(){
    this._WhishlistService.getWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        let newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      },

    });
  }

  addCart(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.totalCartItems.next(response.numOfCartItems);
      },

      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
  addFav(id: string): void {
    this._WhishlistService.addToWishList(id).subscribe({
      next: (response) => {

        this._ToastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }

  removeFav(id: string): void {
    this._WhishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.wishListData = response.data;

        const newList = this.products.filter((item) =>
          this.wishListData?.includes(item._id)
        );
        this.products = newList;
      },
    });
  }
}
