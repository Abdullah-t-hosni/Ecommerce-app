import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService ) {}

  categories:any[]=[];

  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 9
      }
    },
    nav: true
  }
  

 

  ngOnInit(): void {
       //get Categories..

  this._EcomdataService.getCategories().subscribe({
    next: (response) => {
      this.categories = response.data;
    },

    error: (err) => {
      console.log(err);
      
    }
  })

}

}
