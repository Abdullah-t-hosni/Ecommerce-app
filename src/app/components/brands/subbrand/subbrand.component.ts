import { Allproducts } from '../../../Shared/interfaces/allproducts';
import { Component, OnInit } from '@angular/core';
import { SpecificBrand } from 'src/app/Shared/interfaces/specific-brand';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from '../../../Shared/services/offers.service';
import { SharedProductsService } from '../../../Shared/services/shared-products.service';
import { GetHomeproductsService } from '../../../Shared/services/get-homeproducts.service';
import { ToastrService } from 'ngx-toastr';
import { Successadd } from '../../../Shared/interfaces/successadd';
import { Product } from 'src/app/Shared/interfaces/product';
import { BrandsService } from 'src/app/Shared/services/brands.service';
import { CartService } from 'src/app/Shared/services/cart.service';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';

@Component({
  selector: 'app-subbrand',
  templateUrl: './subbrand.component.html',
  styleUrls: ['./subbrand.component.css']
})
export class SubbrandComponent  {
  products: Product[] = [];
  brandDetails!: SpecificBrand;
  categoryProducts!: Allproducts[];
  displayMode: 'grid' | 'list' = 'grid';
  changeDisplay: boolean = true;
  searchTitle: string = '';
  dataindex: number = 1;
  productsLoaded: boolean = true;
  searchArray: Allproducts[] = [];
  BrandId!: string | null;
  currentWishList: string[] = [''];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _BrandsService: BrandsService,
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private _GetHomeproductsService: GetHomeproductsService,
    private _ToastrService: ToastrService,
    private _WishListService: WhishlistService
  ) {}




  ngOnInit(): void {
    this.getCategoryIDFromRoute();
    // this.getUserLogedWishList();
  }

  getCategoryIDFromRoute(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        this.BrandId = response.get('id');
        this.getSpecificBrand(this.BrandId);
      },
    });
  }

  getSpecificBrand(BrandId: string | null): void {
    this._BrandsService.getSpecificBrand(BrandId).subscribe({
      next: (response) => {
        this.brandDetails = response.data;
        this.getCategoryProducts();
        this.productsLoaded = false;
      },
    });
  }
  getCategoryProducts(): void {
    this._GetHomeproductsService.gitHomeProducts().subscribe({
      next: (response) => {
        let Allproducts: Allproducts[] = response.data;
        let categoryProducts: Allproducts[] = [];
        Allproducts.forEach((product) => {
          if (product.brand.name == this.brandDetails.name) {
            categoryProducts.push(product);
          }
        });
        this.categoryProducts = categoryProducts;
      },
    });
  }

  currentIndex(i: number, lightBox: HTMLDivElement): void {
    lightBox.classList.remove('d-none');
    this.dataindex = i;
  }
  closeLightBox(lightBox: HTMLDivElement): void {
    lightBox.classList.add('d-none');
  }

  getOffer(i: number, items: Allproducts[]): number {
    return this._OffersService.getOffer(i, items);
  }
  changedisplayClicOne(): void {
    this.changeDisplay = true;
  }
  changedisplayClicTwo(): void {
    this.changeDisplay = false;
  }
  searchReasult(searchvalue: string): void {
    this.searchArray = this.categoryProducts.filter((curentProduct) =>
      curentProduct.title.toLowerCase().includes(searchvalue.toLowerCase())
    );
  }
  openSearchResult(): void {
    this._SharedProductsService.currentProducts = this.searchArray;
    if (this.searchArray.length > 0) {
      this._Router.navigate(['/search']);
    }
  }
  addToCart(_Id: string): void {
    this._CartService.addToCart(_Id).subscribe({
      next: (response: Successadd) => {
        let cartTotalProducts = 0;
        response.data.products.forEach((element) => {
          cartTotalProducts += element.count;
        });
        this._CartService.updateCartCount(cartTotalProducts);
        this._ToastrService.success(
          response.message + '<img src="./assets/6828646.png">'
        );
      },
      error: (err) => {
        this._ToastrService.warning(err.error.message);
      },
    });
  }
  addToWishList(productId: string ): void {
    this._WishListService.addToWishList(productId).subscribe({
      next: (response) => {
        this.currentWishList = response.data;
        this._ToastrService.success(
          response.message +
            `<i class="text-danger fa-solid fa-heart fa-lg"></i>`
        );
      },
    });
  }
  removeFromWishList(productId: string ): void {
    this._WishListService.removeFromWishList(productId).subscribe({
      next: (response) => {
        this.currentWishList = response.data;
        this._ToastrService.warning(
          response.message + ` <i class="fa-solid fa-lg fa-trash"></i>`
        );
      },
    });
  }
  // getUserLogedWishList(): void {
  //   this._WishListService.numOfWishItems.subscribe({
  //     next: (response) => {
  //       if (response) {
  //         let wishList = response.data.map((product: any) => product._id);
  //         this.currentWishList = wishList;
  //       }
  //     },
  //   });
  // }
  imageIsLoading: boolean = true;

  imageLoaded(): void {
    setTimeout(() => {
      this.imageIsLoading = false;
    }, 1500);
  }

  toggleDisplayMode(mode: 'grid' | 'list'): void {
    this.displayMode = mode;
  }
}
