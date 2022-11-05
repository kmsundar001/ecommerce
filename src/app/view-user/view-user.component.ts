import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataService } from '../data.service';
import { ServiceAPIService } from '../service-api.service';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  public userDetailsArray: any = [];
  public count: any;
  public passFlag: boolean = false;
  public rePassFlag: boolean = false;
  public password: any;
  public repeatPass: any;
  public oldPass: any;
  public id: any;
  public profileImg: any;
  constructor(private router: Router, private http: HttpClient, private serverAPI: ServiceAPIService) { }
  async ngOnInit() {
    this.id = dataService.getUserID();
    this.serverAPI.getUser().subscribe(res => {
      var obj = JSON.parse(JSON.stringify(res));
      this.count = res.length - 1; // for minus the andmin count
      this.userDetailsArray = obj.filter((x: any) => { this.profileImg = x.profilePic; return x.id == this.id; });
    })
  }
  checkValidation(type: string) {
    if (type == "pass") {
      this.passFlag = this.validatePassword(this.password) ? true : false;
    } else {
      this.passFlag = this.password == this.repeatPass ? true : false;
    }
  }
  validatePassword(password: any) {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/
    var test = re.test(password);
    return test;
  }
  changePassword() {
    if (this.passFlag == true && this.rePassFlag == true) {
      this.serverAPI.getUser().subscribe(res => {
        var obj = JSON.parse(JSON.stringify(res));
        var getUser = obj.filter((x: any) => { return x.password == this.oldPass && x.id == this.id })
        if (getUser.length != 0) {
          var send = {
            password: this.password
          }
          this.serverAPI.updateUser(this.id, send).subscribe(res => {
            var obj = JSON.parse(JSON.stringify(res));
          });
        } else {
          alert("old password not matched")
        }
      })
    }
  }
  signOut() {
    this.router.navigateByUrl("loging");
  }
}
