import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Categories } from 'src/app/Shared/interfaces/categories';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.css']
})
export class CategoriesSliderComponent implements OnInit {
  category: Categories[] = [];
  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    margin: 10,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 9 }
    },
    nav: true
  };

  constructor(private _EcomdataService: EcomdataService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        this.category = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
