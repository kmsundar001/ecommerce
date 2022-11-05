import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataService } from '../data.service';
import { ServiceAPIService } from '../service-api.service';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;
  public fortgotEmail: any;
  public fortgotName: any;
  public forgotPassFlag: boolean = true;
  public passFlag: boolean = false;
  public rePassFlag: boolean = false
  public restpassword: any;
  public repeatPass: any;
  public userId: any;
  constructor(private router: Router, private http: HttpClient, private serverAPI: ServiceAPIService) { }
  ngOnInit(): void { }
  signIn() {
    this.router.navigateByUrl("register");
  }
  login() {
    this.serverAPI.getUser().subscribe(res => {
      var obj = JSON.parse(JSON.stringify(res));
      var active;
      var userDetails
      var getUser = obj.filter((x: any) => { return x.email == this.email && x.password == this.password }).map((x: any) => { active = x.active; userDetails = x; return x.id });
      dataService.setUserId(getUser[0]);
      if (getUser.length != 0) {
        if (this.email == "admin") {
          this.router.navigateByUrl("dashboard");
        } else {
          if (active == true) {
            localStorage.setItem("getUser", JSON.stringify(userDetails));
            this.router.navigateByUrl("/home");
          } else {
            alert("Your account has been deactivated by Admin");
          }
        }
      } else {
        alert("Invalid login credentials");
      }
    })
  }
  changePassword() {
    //$("#exampleModal").modal('hide');
    this.restpassword = "";
    this.repeatPass = "";
    this.serverAPI.getUser().subscribe(res => {
      var obj = JSON.parse(JSON.stringify(res));
      var tempArray = obj.filter((x: any) => { return x.userName == this.fortgotName && x.email == this.fortgotEmail });
      if (tempArray.length != 0) {
        if (tempArray[0].active == true) {
          this.forgotPassFlag = false;
          this.userId = tempArray[0].id;
        } else {
          alert("Your account has been deactivated by Admin");
        }
      } else {
        alert("Invalid login credentials");
      }
    })
  }
  forgotPasword() {
    this.forgotPassFlag = true;
    this.fortgotEmail = "";
    this.fortgotName = "";
    $("#exampleModal").modal('show');
  }
  checkValidation(type: string) {
    if (type == "pass") {
      this.passFlag = this.validatePassword(this.restpassword) ? true : false;
    } else {
      this.rePassFlag = this.restpassword == this.repeatPass ? true : false;
    }
  }
  validatePassword(password: any) {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
    var test = re.test(password);
    return test;
  }
  resetPassword() {
    if (this.passFlag == true && this.rePassFlag == true) {
      var send = {
        password: this.restpassword,
      }
      this.serverAPI.updateUser(this.userId, send).subscribe(res => {
      })
    }
  }
}
