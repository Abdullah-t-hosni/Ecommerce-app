import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { Product } from 'src/app/Shared/interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService) { }


  detailsSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  productDetails:Product = {} as Product;
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        
       let idProduct:any = params.get('id')

        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next: (response) => {
            
            this.productDetails = response.data
          }
        })
      }
      
    })
  }
}
