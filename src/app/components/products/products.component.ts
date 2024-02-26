import { Component } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/Shared/interfaces/product';
import { CartService } from 'src/app/Shared/services/cart.service';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _EcomdataService: EcomdataService , private _CartService: CartService) {}

 products: Product[] = [];
 searchTerm: string = "";
 
  ngOnInit(): void {
    //get All Products..
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
  }


  addCart(id:string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response);

      },

      error: (err) => {
        console.log(err);
      }
    })
  }

}