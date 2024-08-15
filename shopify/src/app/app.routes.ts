import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './products/products.component';
import { AddcardComponent } from './addcard/addcard.component';
import { PaymentComponent } from './payment/payment.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent },
  { path: 'addcard', component:AddcardComponent},
  {path:'payment',component:PaymentComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'reset-password',component:ResetPasswordComponent}
];