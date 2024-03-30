import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { CartService } from 'src/app/Shared/services/cart.service';
import { Product } from 'src/app/Shared/interfaces/product';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  productDetails: Product = {} as Product;
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

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _ecomdataService: EcomdataService,
    private _cartService: CartService,
    private _toastrService: ToastrService,
    private _renderer2: Renderer2
  ) {}

   ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      const idProduct = params.get('id');
      this._ecomdataService.getProductDetails(idProduct).subscribe({
        next: (response) => {
          this.productDetails = response.data;
        },
      });
    });
  }

  addCart(id: string, element: HTMLButtonElement): void {
    if (id) {
      this._renderer2.setAttribute(element, 'disabled', 'true');
      this._cartService.addToCart(id).subscribe({
        next: (response) => {
          this._toastrService.success(response.message);
          this._renderer2.removeAttribute(element, 'disabled');
          this._cartService.totalCartItems.next(response.numOfCartItems);
        },
        error: (error) => {
          console.error('Error occurred while adding to cart:', error);
          this._renderer2.removeAttribute(element, 'disabled');
        },
      });
    }
  }

}
