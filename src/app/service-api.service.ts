import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ServiceAPIService {
  //public GetURL:any = "http://localhost:3000/user/";
  public GetURL: any = "https://dataservice01.herokuapp.com/user/";
  public productURL: any = "https://dataservice01.herokuapp.com/product/";
  // public GetURL:any = "https://my-json-server.typicode.com/kmsundar001/userBackEnd/user"
  constructor(private http: HttpClient) { }
  public getUser() {
    return this.http.get(this.GetURL).pipe(map((res: any) => { return res }))
  }
  public postUser(data: any) {
    return this.http.post(this.GetURL, data).pipe(map((res: any) => { return res }))
  }
  public updateUser(id: any, data: any) {
    return this.http.patch(this.GetURL + id, data).pipe(map((res: any) => { return res }))
  }
  public updateUserAllDate(id: any, data: any) {
    return this.http.put(this.GetURL + id, data).pipe(map((res: any) => { return res }))
  }
  public deleteUser(id: any) {
    return this.http.delete(this.GetURL + id).pipe(map((res: any) => { return res }))
  }
  //  CURD for
  public getProduct() {
    return this.http.get(this.productURL).pipe(map((res: any) => { return res }))
  }
  public postProduct(data: any) {
    return this.http.post(this.productURL, data).pipe(map((res: any) => { return res }))
  }
  public updateProductAllDate(id: any, data: any) {
    return this.http.put(this.productURL + id, data).pipe(map((res: any) => { return res }))
  }
  public deleteProduct(id: any) {
    return this.http.delete(this.productURL + id).pipe(map((res: any) => { return res }))
  }
  public checkout() {
    var getUser: any = localStorage.getItem("getUser");
    getUser = JSON.parse(getUser);
    var id = getUser.id;
    getUser.id = undefined;
    return this.http.patch(this.GetURL + id, getUser).pipe(map((res: any) => { return res }))
  }
}
