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
  constructor(private _AllordersService: AllordersService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
   this.authService.UserData.subscribe((data) => {
     this._AllordersService.getUserOrders(data.id).subscribe({
       next: (response: Allorders) => {
         this._AllordersService.changeTruckCount(response.length);
         this.truckCounter = response.length;
         this.allOrders = response;
       },
     });
   })
  }


}
