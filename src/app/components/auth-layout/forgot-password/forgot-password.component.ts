import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpassService } from 'src/app/Shared/services/forgotpass.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {

  constructor(private _forgotpassService:ForgotpassService  , private _Router:Router) {}
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  email: string = '';
  userMsg: string = '';

  forgotForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  resetPassword: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
  });

  forgotpassword(): void {
    let userEmail = this.forgotForm.value;
    this.email = userEmail.email;

    
    this._forgotpassService.forgotPassword(userEmail).subscribe({
      next: (response) => {
        console.log(response);
        this.userMsg = response.message;
        this.step1 = false;
        this.step2 = true;
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },

      complete: () => {
        this.userMsg = 'success';
      },
    })

  }

  resetcode(): void {

    let resetCode = this.resetCode.value;

   this._forgotpassService.resetcode(resetCode).subscribe({
     next: (response) => {
       console.log(response);
       this.userMsg = response.message;
       this.step2 = false;
       this.step3 = true;
     },
     error: (err) => {
       this.userMsg = err.error.message;
     },

     complete: () => {
       this.userMsg = 'success';
     },
   })
  }

  resetpassword(): void {

    let newPassword = this.resetPassword.value;
    newPassword.email = this.email;
    this._forgotpassService.resetPassword(newPassword).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('eToken', response.token);
          this._Router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.userMsg = err.error.message;
      },
  })
  }
  } 