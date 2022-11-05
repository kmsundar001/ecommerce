import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataService } from '../data.service';
import { ServiceAPIService } from '../service-api.service';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public productDetailsArray: any = [];
  public count: any;
  public productId: any;
  public productListFlag: boolean = true;
  public addProductsFlag: boolean = false;
  public lastId: any;
  public editFlag: boolean = false;
  constructor(private router: Router, private serverAPI: ServiceAPIService) { }
  ngOnInit(): void {
    localStorage.clear();
    this.getProduct();
  }
  getProduct() {
    this.serverAPI.getProduct().subscribe(res => {
      var obj = JSON.parse(JSON.stringify(res));
      this.productDetailsArray = obj;
      this.lastId = obj.filter((x: any, i: any) => { i == (x.length - 1) }).map((x: any) => { return x.id });
      this.count = this.productDetailsArray.length;
    })
  }
  addProduct() {
    this.productListFlag = false;
    this.addProductsFlag = true;
  }
  deleteUser(id: any) {
    this.productId = id;
    $("#exampleModal").modal('show');
  }
  confirmDelete(action: any) {
    if (action == "yes") {
      this.serverAPI.deleteProduct(this.productId).subscribe(res => {
        this.getProduct();
      })
    } else {
      $("#exampleModal").modal('hide');
    }
  }
  editProduct(product: any) {
    this.productListFlag = false;
    this.addProductsFlag = true;
    this.editFlag = true;
    this.productId = product.id;
    localStorage.setItem("editUser", JSON.stringify(product));
  }
  saveProduct(value: any) {
    if (value != "view") {
      if (this.editFlag == true) {
        this.serverAPI.updateProductAllDate(this.productId, value).subscribe(res => {
          var obj = JSON.parse(JSON.stringify(res));
          localStorage.removeItem("editUser");
          this.editFlag = false;
          this.getProduct();
        })
      } else {
        value = { "id": parseInt(this.lastId[0]) + 1, ...value }
        this.serverAPI.postProduct(value).subscribe(res => {
          var obj = JSON.parse(JSON.stringify(res));
          this.getProduct();
        })
      }
    }
    this.productListFlag = true;
    this.addProductsFlag = false;
    localStorage.clear();
  }
  viewProduct(viewProduct: any) {
    this.productListFlag = false;
    this.addProductsFlag = true;
    localStorage.setItem("viewUser", JSON.stringify(viewProduct));
  }
  signOut() {
    this.router.navigateByUrl("/login")
  }
}
