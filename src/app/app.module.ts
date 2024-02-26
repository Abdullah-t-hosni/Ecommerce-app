import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  {HttpClientModule} from '@angular/common/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { SliderWrapperComponent } from './components/slider-wrapper/slider-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CarouselModule } from 'ngx-owl-carousel-o';
import { termtextPipe } from './termtext.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
    ForgotPasswordComponent,
    MainSliderComponent,
    SliderWrapperComponent,
    termtextPipe,
    SearchPipe,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
