import { Component } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { OnInit } from '@angular/core';
import { Product } from 'src/app/Shared/interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _EcomdataService: EcomdataService) {}

  products: Product[] = [];
  ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    });
  }
}
