import { ReturnStatement } from "@angular/compiler";
export class dataService {
    // set create print 
    static id: any;
    static getUserID() {
        return this.id;
    }
    static setUserId(value: any) {
        this.id = null;
        this.id = value;
    }
    // edit user Details
    static editUser: any;
    static getEditUser() {
        return this.editUser;
    }
    static setEditUser(value: any) {
        this.editUser = null;
        this.editUser = value;
    }
}