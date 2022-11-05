import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceAPIService } from '../service-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Output() getproduct: EventEmitter<any> = new EventEmitter<any>();
  public productId: any;
  public productName: any;
  public productPrice: any;
  public productDescription: any;
  public productPic: any;
  public image: any;
  public editFlag: boolean = false
  public imageChangeFlag: boolean = false;
  public viewFlag: boolean = false;
  public title: any;
  constructor(private serverAPI: ServiceAPIService, private fireBase: AngularFireStorage) { }
  ngOnInit(): void {
    this.title = "Add"
    if (localStorage.getItem('editUser') != undefined || localStorage.getItem('viewUser') != undefined) {
      var get: any = localStorage.getItem('editUser') != undefined ? localStorage.getItem('editUser') : localStorage.getItem('viewUser');
      this.title = localStorage.getItem('editUser') != undefined ? "Edit" : "View";
      get = JSON.parse(get);
      this.productId = get.id
      this.productName = get.name;
      this.productPrice = get.price;
      this.productDescription = get.description;
      this.image = get.image;
      this.editFlag = localStorage.getItem('editUser') != undefined ? true : false;
      this.viewFlag = localStorage.getItem('viewUser') != undefined ? true : false;
    }
  }
  chooseImg($event: any) {
    this.productPic = $event.target.files[0];
    this.image = $event.target.files[0];
    this.imageChangeFlag = true;
  }
  addProduct(): void {
    if (this.imageChangeFlag == true) {
      this.uploadImages();
    } else if (this.viewFlag == true) {
      this.uploadDetails(null)
    } else {
      this.uploadDetails(this.image);
    }
  }
  uploadDetails(image: any) {
    var sendData = {
      "name": this.productName,
      "price": this.productPrice,
      "description": this.productDescription,
      "image": image
    }
    this.editFlag = false;
    if (this.viewFlag == true) {
      this.getproduct.emit("view");
    } else {
      this.getproduct.emit(sendData);
    }
  }
  uploadImages() {
    var today: any = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;
    var fileName = this.productName + "(" + today + ")";
    let uploadImg = new FormData();
    uploadImg.set("name", fileName);
    uploadImg.set("file", this.image);
    const fileRef = this.fireBase.ref(this.productName + today);
    this.fireBase.upload(this.productName + today, this.image).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.imageChangeFlag = false;
          this.uploadDetails(url);
        })
      })
    ).subscribe();
  }
}
