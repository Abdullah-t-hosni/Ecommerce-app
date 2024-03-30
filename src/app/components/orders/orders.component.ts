import { Component } from '@angular/core';
import { Allorders } from 'src/app/Shared/interfaces/allorders';
import { AllordersService } from 'src/app/Shared/services/allorders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {

  truckCounter: number = 0;
  allOrders!: Allorders;
  constructor(private _AllordersService: AllordersService) {}

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    this._AllordersService.getUserOrders().subscribe({
      next: (response: Allorders) => {
        this._AllordersService.changeTruckCount(response.length);
        this.truckCounter = response.length;
        this.allOrders = response;
      },
    });
  }


}
