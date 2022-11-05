import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataService } from '../data.service';
import { ServiceAPIService } from '../service-api.service';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public getUserDetails: any = [];
  public getProductListArray: any = [];
  public name: any;
  public cartCount: any;
  constructor(private router: Router, private serverAPI: ServiceAPIService) { }
  ngOnInit(): void {
    this.getUserDetails = localStorage.getItem("getUser");
    this.getUserDetails = JSON.parse(this.getUserDetails);
    this.name = this.getUserDetails.name;
    this.cartCount = this.getUserDetails.product.length;
    this.serverAPI.getProduct().subscribe(res => {
      var obj = JSON.parse(JSON.stringify(res))
      this.getProductListArray = obj.map((x: any) => { return { ...x, "quantity": "1", "amount": parseFloat(x.price).toFixed(2) } });
    });
  }
  chanageQuanity(product: any, action: any) {
    if (action == "plus") {
      product.quantity = parseInt(product.quantity) + 1;
    } else {
      product.quantity = product.quantity != 1 ? parseInt(product.quantity) - 1 : product.quantity;
    }
    if (this.getUserDetails.product.length != 0) {
      this.getUserDetails.product.forEach((x: any) => {
        if (x.id == product.id) {
          x.quantity = product.quantity;
          x.amount = parseFloat(product.price) * parseInt(product.quantity);
        }
      });
    }
  }
  addCart(product: any) {
    var fineArray = this.getUserDetails.product.map((o: any) => o.id).indexOf(product.id);
    if (fineArray == -1) {
      this.getUserDetails.product.push(product);
    }
    this.cartCount = this.getUserDetails.product.length;
  }
  gotoCart() {
    localStorage.removeItem("getUser");
    localStorage.setItem("getUser", JSON.stringify(this.getUserDetails));
    this.router.navigateByUrl("/myCart");
  }
  checkOut() {
    localStorage.removeItem("getUser");
    localStorage.setItem("getUser", JSON.stringify(this.getUserDetails));
    this.serverAPI.checkout().subscribe(res => {
      alert("Product Saved Successfully");
      this.router.navigateByUrl("/login");
    });
  }
}
