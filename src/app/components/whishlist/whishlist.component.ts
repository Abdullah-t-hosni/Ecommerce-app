import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/Shared/interfaces/product';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Shared/services/cart.service';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css'],
})
export class WhishlistComponent implements OnInit {
  listDetails: any = {};
  products: Product[] = [];
  wishListData: string[] = [];

  constructor(
    private _WhishlistService: WhishlistService,
    private _ToastrService: ToastrService,
    private _CartService: CartService,
    private _EcomdataService: EcomdataService,
    private _Renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this._WhishlistService.getWishList().subscribe({
      next: (response) => {
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCart(id: string, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.numOfCartItems.next(response.numOfCartItems);
      },

      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
  addFav(id: string): void {
    this._WhishlistService.addToWishList(id).subscribe({
      next: (response) => {
        console.log(response);

        this._ToastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }

  removeFav(id: string): void {
    this._WhishlistService.removeFromWishList(id).subscribe({
      next: (response) => {
        console.log(response);
        this._ToastrService.success(response.message);
        this.wishListData = response.data;

        const newList = this.products.filter((item) =>
          this.wishListData.includes(item._id)
        );
        this.products = newList;
      },
    });
  }
}
