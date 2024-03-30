import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { Categories } from 'src/app/Shared/interfaces/categories';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  allCategories: Categories[] = [];

  constructor(private ecomdataService: EcomdataService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.ecomdataService.getCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }
}
