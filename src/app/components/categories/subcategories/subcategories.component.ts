import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { Product } from 'src/app/Shared/interfaces/product';
import { CartService } from 'src/app/Shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';
import { Subcategories } from 'src/app/Shared/interfaces/subcategories';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css'],
})
export class SubcategoriesComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WhishlistService: WhishlistService
  ) {}

  subCategories: any = [];
  product: Product[] = [];
  wishListData: string[] = [];


  ngOnInit(): void {
    //get SubCategories..
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let categoryId: any = params.get('id');

            this._EcomdataService
              .getSubCategories(categoryId)
              .subscribe({
                next: (response) => {
                  this.product = response.data;
                },
              });
        
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
      },
    });
  }
}
