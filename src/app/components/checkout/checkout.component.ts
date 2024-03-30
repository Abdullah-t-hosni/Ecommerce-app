import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartId:string=''

  shippingAddress: FormGroup = new FormGroup({
    address: new FormControl('' ) ,
    city: new FormControl(''),
    phone: new FormControl(''),

})

constructor(private _CartService:CartService , private _activatedRoute:ActivatedRoute) {


  this._activatedRoute.paramMap.subscribe((response:any)=>{
  this.cartId = response.params.cartId
  })
}
handleOnline(){
  this._CartService.generateOnlinePayment(this.cartId,this.shippingAddress.value).subscribe({
    next: (response) => {
      window.location.href = response.session.url
    },

  })
}

}



