import { Component, OnInit } from '@angular/core';
import { Brands } from 'src/app/Shared/interfaces/brands';
import { BrandsService } from 'src/app/Shared/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  allBrands!: Brands;

  constructor(private _brandsService: BrandsService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this._brandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.allBrands = response;
      },
    });
  }
}
