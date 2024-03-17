import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../core/services/brands.service';
import { Brands } from '../core/interfaces/brands';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService:BrandsService) {}
  allBrands!: Brands;
  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.allBrands = response;
      },
    });
  }
}

