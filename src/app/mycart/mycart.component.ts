import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAPIService } from '../service-api.service';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  public getUserDetails: any = [];
  public name: any;
  public totalAmount: any;
  constructor(private router: Router, private serverAPI: ServiceAPIService) { }
  ngOnInit(): void {
    this.getUserDetails = localStorage.getItem("getUser");
    this.getUserDetails = JSON.parse(this.getUserDetails);
    this.name = this.getUserDetails.name;
    this.totalAmount = this.getUserDetails.product.reduce((temp: any, x: any) => { return (temp + parseFloat(x.amount)) }, 0)
  }
  deleteUser(id: any) {
    this.getUserDetails.product.forEach((element: any, index: any, obj: any) => {
      if (element.id == id) {
        obj.splice(index, 1);
      }
    });
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
