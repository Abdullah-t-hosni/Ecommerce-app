import { Component, OnDestroy, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { GetHomeproductsService } from '../../Shared/services/get-homeproducts.service';
import { SharedProductsService } from '../../Shared/services/shared-products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Allproducts } from '../../Shared/interfaces/allproducts';
import { Subscription } from 'rxjs';
import { Success } from '../../Shared/interfaces/success';
import { CartService } from 'src/app/Shared/services/cart.service';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _GetHomeproductsService: GetHomeproductsService,
    private _SharedProductsService: SharedProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WhishlistService
  ) {}
  changeDisplay: boolean = true;
  searchTitle: string = '';
  homeProducts!: Allproducts[];
  dataindex: number = 1;
  callApi!: Subscription;
  productsLoaded: boolean = true;
  searchArray: Allproducts[] = [];
  currentWishList: string[] = [''];
  ngOnInit(): void {
    this.getAllproducts();
    // this.getUserLogedWishList();
  }
  ngOnDestroy(): void {
    this.callApi.unsubscribe();
  }

  getAllproducts(): void {
    this.callApi = this._GetHomeproductsService.getHomeProducts().subscribe({
      next: (response) => {
        let allProductsResponse: Allproducts[] = response.data;
        let randomNumberArr: number[] = [];
        let displayRandomProducts: Allproducts[] = [];
        for (let i = 0; i < allProductsResponse.length; ) {
          let randomNumberGenerator: number = Math.floor(
            Math.random() * allProductsResponse.length
          );
          if (!randomNumberArr.includes(randomNumberGenerator)) {
            randomNumberArr.push(randomNumberGenerator);
            displayRandomProducts.push(
              allProductsResponse[randomNumberGenerator]
            );
            i++;
            this.homeProducts = displayRandomProducts;
          }
        }
        this._SharedProductsService.currentProducts = response.data;
        this.productsLoaded = false;
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



  changedisplayClicOne(): void {
    this.changeDisplay = true;
  }
  changedisplayClicTwo(): void {
    this.changeDisplay = false;
  }

  searchReasult(searchvalue: string): void {
    this.searchArray = this.homeProducts.filter((curentProduct) =>
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
      next: (response: Success) => {
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

  addToWishList(productId: string): void {
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
  removeFromWishList(productId: string): void {
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
  //   this._WishListService.currentWishList.subscribe({
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
}
