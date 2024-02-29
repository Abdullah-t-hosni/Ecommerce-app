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
