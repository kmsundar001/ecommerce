import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MycartComponent } from './mycart/mycart.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'viewuser', component: ViewUserComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'home', component: HomeComponent},
  {path: 'myCart', component: MycartComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
