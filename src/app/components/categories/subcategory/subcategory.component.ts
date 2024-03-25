import { Component, OnInit, Renderer2 } from '@angular/core';
import { Specificcategorie } from 'src/app/Shared/interfaces/specificcategorie';
import { Allproducts } from '../../core/interfaces/allproducts';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorisService } from '../../core/services/categoris.service';
import { OffersService } from '../../core/services/offers.service';
import { SharedProductsService } from '../../core/services/shared-products.service';
import { CartService } from '../../core/services/cart.service';
import { GetHomeproductsService } from '../../core/services/get-homeproducts.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../core/services/wish-list.service';
import { Product } from 'src/app/Shared/interfaces/product';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit{
  products: Product[] = [];

  categoryDetails!: Specificcategorie;
  categoryProducts!: Allproducts[];

  changeDisplay: boolean = true;
  searchTitle: string = '';
  dataindex: number = 1;
  productsLoaded: boolean = true;
  searchArray: Allproducts[] = [];
  currentWishList: string[] = [''];
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CategorisService: CategorisService,
    private _OffersService: OffersService,
    private _SharedProductsService: SharedProductsService,
    private _Router: Router,
    private _CartService: CartService,
    private _GetHomeproductsService: GetHomeproductsService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService,
    private _Renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.getCategoryIDFromRoute();
    this.getUserLogedWishList();
  }

  categoryId!: string | null;

  getCategoryIDFromRoute(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (response) => {
        this.categoryId = response.get('id');
        this.getSpecificCategory(this.categoryId);
      },
    });
  }

  getSpecificCategory(categoryId: string | null): void {
    this._CategorisService.getSpecificCategory(categoryId).subscribe({
      next: (response) => {
        this.categoryDetails = response.data;
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
          if (product.category.name == this.categoryDetails.name) {
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
  addToWishList(productId: string | null): void {
    this._WishListService.addToWisthList(productId).subscribe({
      next: (response) => {
        console.log(response.data);
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
    console.log('Loaded Successfylly');
  }
}


