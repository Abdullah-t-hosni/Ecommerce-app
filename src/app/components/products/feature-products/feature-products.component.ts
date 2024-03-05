import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Shared/services/cart.service';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';


@Component({
  selector: 'app-feature-products',
  templateUrl: './feature-products.component.html',
  styleUrls: ['./feature-products.component.css'],
})
export class FeatureProductsComponent{

  constructor(
    private _EcomdataService: EcomdataService,
    private _ToastrService: ToastrService,
    private _CartService: CartService
  ) {}




}
