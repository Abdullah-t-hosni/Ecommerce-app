import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartId:string=''

  shippingAddress: FormGroup = new FormGroup({
    address: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),

})

constructor(private _CartService:CartService , private _activatedRoute:ActivatedRoute) {
  // this._activatedRoute.paramMap.subscribe((response:any)=>{
  // this.cartId = response.params.cartId

  // })

this._CartService.cartId.subscribe(response =>{
  this.cartId = response
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
