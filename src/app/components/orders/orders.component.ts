import { User } from './../../Shared/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Allorders } from 'src/app/Shared/interfaces/allorders';
import {AuthService} from "../../Shared/services/auth.service";
import { AllordersService } from 'src/app/Shared/services/allorders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  truckCounter: number = 0;
  allOrders!: Allorders;
  allOrdersService: any;
  constructor(private _allOrdersService: AllordersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
   this.authService.userData.subscribe((userData) => {
     this._allOrdersService.getUserOrders(userData.id).subscribe({
       next: (response: Allorders) => {
         this.truckCounter = response.length;
         this.allOrders = response;
         this.allOrdersService.changeTruckCount(response.length);

       },
     });
   })
  }


}


