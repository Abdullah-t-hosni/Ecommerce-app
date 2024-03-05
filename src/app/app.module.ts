import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { LoginComponent } from './components/auth-layout/login/login.component';
import { RegisterComponent } from './components/auth-layout/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavBlankComponent } from './components/blank-layout/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/auth-layout/nav-auth/nav-auth.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './components/auth-layout/forgot-password/forgot-password.component';
import { MainSliderComponent } from './components/home/main-slider/main-slider.component';
import { SliderWrapperComponent } from './components/home/slider-wrapper/slider-wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { termtextPipe } from './termtext.pipe';
import { SearchPipe } from './search.pipe';
import { ToastrModule } from 'ngx-toastr';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { CategoriesSliderComponent } from './components/categories/categories-slider/categories-slider.component';
import { FeatureProductsComponent } from './components/products/feature-products/feature-products.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterProductsPipe } from './filter-products.pipe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HttpInterceptorInterceptor } from './interceptors/http.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { WhishlistComponent } from './components/whishlist/whishlist.component';

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
    CategoriesSliderComponent,
    FeatureProductsComponent,
    FilterProductsPipe,
    CheckoutComponent,
    OrdersComponent,
    WhishlistComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    RxReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
