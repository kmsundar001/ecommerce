import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ServiceAPIService } from './service-api.service';
import { ViewUserComponent } from './view-user/view-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';// import { AngularFireModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { MycartComponent } from './mycart/mycart.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    ViewUserComponent,
    DashboardComponent,
    AddProductComponent,
    HomeComponent,
    MycartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC6i03KweFyjQrcK8w-jE3on3d0gsaikLw",
      authDomain: "userdetails-ebabc.firebaseapp.com",
      projectId: "userdetails-ebabc",
      storageBucket: "userdetails-ebabc.appspot.com",
      messagingSenderId: "543388278837",
      appId: "1:543388278837:web:0d2664c695576c1842517c",
      measurementId: "G-NP43V7C0NR"
    }),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
