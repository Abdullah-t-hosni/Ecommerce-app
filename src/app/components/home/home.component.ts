import { Component } from '@angular/core';
import { EcomdataService } from 'src/app/Shared/services/ecomdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private _ecomdataService: EcomdataService,
    
  ) {}



  
}
