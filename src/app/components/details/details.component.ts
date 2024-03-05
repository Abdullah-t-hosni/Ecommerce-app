import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { Product } from 'src/app/Shared/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _EcomdataService: EcomdataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2:Renderer2
  ) {}

    product: any

  detailsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  productDetails: Product = {} as Product;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct: any = params.get('id');

        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next: (response) => {
            this.productDetails = response.data;
          },
        });
      },

      error: (err) => {
        console.log(err);
      
      }
    });
  }



  addCart(id: string ,element:HTMLButtonElement ): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
       
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');
        this._CartService.numOfCartItems.next(
          response.numOfCartItems
        )
      },

      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    });
  }
}
