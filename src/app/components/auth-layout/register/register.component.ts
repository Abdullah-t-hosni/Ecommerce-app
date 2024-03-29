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
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  msgError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
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
      rePassword: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    {
      validators: this.validateRePassword
    }
  )

  validateRePassword(registerForm: any) {
    let passwordControl = registerForm.get('password');
    let rePasswordControl = registerForm.get('rePassword');

    if (
      passwordControl.value == rePasswordControl.value
    ) {
      return null;
    } else {
      rePasswordControl.setErrors({
        rePasswordNotMatch: 'password and rePassword not match',
      });
      return { rePasswordNotMatch: 'password and rePassword not match' };
    }
  }

  onSubmit(): void {
    if (this.registerForm.value) {
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
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

  //   markAllAsTouched(form: FormGroup): void {
  //     Object.values(form.controls).forEach((control:any) => {
  //       control.markAsTouched();
  //       if (control.control) {
  //         this.markAllAsTouched(control);
  //       }
  //     })
  //   }
  //
}
