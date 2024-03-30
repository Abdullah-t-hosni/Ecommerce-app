// Import necessary modules
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Constructor to inject AuthService and Router
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  // Initialize variables
  msgError: string = '';
  isLoading: boolean = false;

  // Initialize registerForm FormGroup with form controls and validation
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  },
  // Add custom validator for matching password and rePassword
  {
    validators: this.validateRePassword
  });

  // Custom validator function for matching password and rePassword
  validateRePassword(registerForm: any) {
    let passwordControl = registerForm.get('password');
    let rePasswordControl = registerForm.get('rePassword');

    if (passwordControl.value == rePasswordControl.value) {
      return null;
    } else {
      rePasswordControl.setErrors({
        rePasswordNotMatch: 'password and rePassword not match',
      });
      return { rePasswordNotMatch: 'password and rePassword not match' };
    }
  }

  // Submit function to handle form submission
  onSubmit(): void {
    if (this.registerForm.value) {
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message;
        },
        complete: () => console.log('success'),
      });
    }
  }

  // Additional function for marking all form controls as touched
  // Uncomment and use if needed
  // markAllAsTouched(form: FormGroup): void {
  //   Object.values(form.controls).forEach((control:any) => {
  //     control.markAsTouched();
  //     if (control.control) {
  //       this.markAllAsTouched(control);
  //     }
  //   })
  // }
}
