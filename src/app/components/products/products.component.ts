import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/Shared/services/cart.service';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { Product } from 'src/app/Shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from 'src/app/Shared/services/whishlist.service';
import { AllordersService } from 'src/app/Shared/services/allorders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  searchTerm: string = '';
  wishListData: string[] = [];
  pageSize: number = 0;
  currentPage: number = 1;
  total: number = 0;

  constructor(
    private ecomdataService: EcomdataService,
    private toastrService: ToastrService,
    private cartService: CartService,
    private renderer2: Renderer2,
    private wishListService: WhishlistService,
    private allordersService: AllordersService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.ecomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }

  addCart(id: string, element: HTMLButtonElement): void {
    this.renderer2.setAttribute(element, 'disabled', 'true');
    this.cartService.addToCart(id).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.renderer2.removeAttribute(element, 'disabled');
        this.cartService.totalCartItems.next(response.numOfCartItems);
      },
      error: (err) => {
        this.renderer2.removeAttribute(element, 'disabled');
      },
    });
  }

  addFav(id: string): void {
    this.wishListService.addToWishList(id).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }

  removeFav(id: string): void {
    this.wishListService.removeFromWishList(id).subscribe({
      next: (response) => {
        this.toastrService.success(response.message);
        this.wishListData = response.data;
      },
    });
  }

  pageChanged(event: number):void{
    this.ecomdataService.getAllProducts(event).subscribe({
      next: (response) => {
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
    });
  }
}
