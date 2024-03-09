import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';
import { Categories } from 'src/app/Shared/interfaces/categories';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Categories[] = [];

  constructor(private _EcomdataService: EcomdataService , private _ActivatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    //get Categories..

    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    });
   
  }

  }
    
  
