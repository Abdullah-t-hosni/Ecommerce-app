import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Shared/interfaces/product';
import { CartService } from 'src/app/Shared/services/cart.service';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';

@Component({
  selector: 'app-feature-products',
  templateUrl: './feature-products.component.html',
  styleUrls: ['./feature-products.component.css'],
})
export class FeatureProductsComponent implements OnInit {
  constructor(
    private _EcomdataService: EcomdataService,
    private _ToastrService: ToastrService,
    private _CartService: CartService
  ) {}

  products: Product[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    //get All Products..
    this.getAllProducts();
  }

  getAllProducts() {
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
       
        this._ToastrService.success(response.message);
        this._CartService.numOfCartItems.next(
          response.numOfCartItems
        )
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
