import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  // Constructor to inject dependencies
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  // Properties
  msgError: string = ''; // Holds error message
  isLoading: boolean = false; // Indicates loading state

  // Form group for login
  loginForm = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });

  // Function to handle form submission
  onSubmit(): void {
    if (this.loginForm.value) { // Check if form is valid
      this.isLoading = true; // Set loading state to true

      // Call AuthService to perform login
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // If login is successful, navigate to home page
          if (response.message == 'success') {
            this.isLoading = false; // Set loading state to false
            localStorage.setItem('eToken', response.token); // Store token in local storage
            this._AuthService.saveUserData(); // Save user data
            this._Router.navigate(['/home']); // Navigate to home page
          }
        },
        error: (err: HttpErrorResponse) => {
          // If there's an error, set error message and reset loading state
          this.isLoading = false;
          this.msgError = err.error.message;
        },
        complete: () => console.log('success'), // Log completion
      });
    }
  }
}
