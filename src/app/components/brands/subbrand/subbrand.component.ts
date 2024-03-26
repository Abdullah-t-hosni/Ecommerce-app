import { Allproducts } from './../../core/interfaces/allproducts';
import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { SpecificBrand } from 'src/app/Shared/interfaces/specific-brand';
import { ActivatedRoute, Router } from '@angular/router';
import { OffersService } from '../../core/services/offers.service';
import { SharedProductsService } from '../../core/services/shared-products.service';
import { CartService } from '../../core/services/cart.service';
import { GetHomeproductsService } from '../../core/services/get-homeproducts.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { Successadd } from '../../core/interfaces/successadd';
import { Product } from 'src/app/Shared/interfaces/product';

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
    private _WishListService: WishListService
  ) {}




  ngOnInit(): void {
    this.getCategoryIDFromRoute();
    this.getUserLogedWishList();
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
        this._CartService.updateCartCound(cartTotalProducts);
        this._ToastrService.success(
          response.message + '<img src="./assets/6828646.png">'
        );
      },
      error: (err) => {
        this._ToastrService.warning(err.error.message);
      },
    });
  }
  addToWishList(productId: string | null): void {
    this._WishListService.addToWisthList(productId).subscribe({
      next: (response) => {
        this.currentWishList = response.data;
        this._WishListService.changeHeartCount(response.data.length);
        this._ToastrService.success(
          response.message +
            `<i class="text-danger fa-solid fa-heart fa-lg"></i>`
        );
      },
    });
  }
  removeFromWishList(productId: string | null): void {
    this._WishListService.RemoveProductFromWishList(productId).subscribe({
      next: (response) => {
        this._WishListService.changeHeartCount(response.data.length);
        this.currentWishList = response.data;
        this._ToastrService.warning(
          response.message + ` <i class="fa-solid fa-lg fa-trash"></i>`
        );
      },
    });
  }
  getUserLogedWishList(): void {
    this._WishListService.currentWishList.subscribe({
      next: (response) => {
        if (response) {
          let wishList = response.data.map((product: any) => product._id);
          this.currentWishList = wishList;
        }
      },
    });
  }
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
