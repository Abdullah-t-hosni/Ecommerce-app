
import { ForgotPasswordComponent } from './components/auth-layout/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/auth-layout/login/login.component';
import { RegisterComponent } from './components/auth-layout/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './Shared/guards/auth.guard'
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { SubbrandComponent } from './components/brands/subbrand/subbrand.component';
import { SubcategoryComponent } from './components/categories/subcategory/subcategory.component';


const routes: Routes = [
  {
    path: '',
   component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout/:cartId', component: CheckoutComponent },
      { path: 'allorders', component: OrdersComponent },
      { path: 'whishlist', component: WhishlistComponent },
      {path: 'specific-brand/:id', component: SubbrandComponent},
      {path: 'subcategory/:id', component: SubcategoryComponent},

    ],
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
