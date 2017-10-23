import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

export interface AuthState {
    is_logged_in: boolean;
}

/*
 Generated class for the LoginCheck provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

export interface IUser{
    name:string;
}

@Injectable()
export class LoginCheck {

    private authSubject = new Subject<AuthState>();
    authState = this.authSubject.asObservable();

    user:IUser;

    constructor(public http: Http) {
        this.authSubject.next(<AuthState>{is_logged_in: this.isLoggedIn()});

    }

    getUser() {
      let user=window.localStorage.getItem('visitor') || '[]';
      return JSON.parse(user);
    }

    getUserId() {
       let user : any = this.getUser();
       if (user && user.id){
           return user.id;
       }
       return 0;
    }

    getCompanies() {
      let companies:any=window.localStorage.getItem('companies');

      if(companies){
          return JSON.parse(companies);
      }else{
          return [];
      }

    }

    getCurrentCompany() {
      let companies=window.localStorage.getItem('currentCompany');
      return JSON.parse(companies);
    }

    getCurrentCompanyName() {
      let company=this.getCurrentCompany();
      if (company){
          return company.name;
      }
      return '_';
    }


     companyPrefix(){
      let prefix = this.getCurrentCompanyName();

      let strArr = prefix.split(" ");
      let new_prefix="";
      strArr.map((item) => {
        new_prefix+=item.charAt(0).toUpperCase();
         return item;
      });

      if(new_prefix){
        return new_prefix;
      }
      else{
        return '_';
      }

  }

    getUserName() {
        let user=window.localStorage.getItem('visitor');

        this.user=JSON.parse(user);
        if (this.user && this.user.name){
          return this.user.name;
        }else{
            this.authSubject.next(<AuthState>{is_logged_in: false});
        }
        return 'Unknown';
    }

    isLoggedIn() {
        if (this.getToken()) {
            this.authSubject.next(<AuthState>{is_logged_in: true});
            return true;
        }
        else {
            this.authSubject.next(<AuthState>{is_logged_in: false});
            return false;
        }
    }

    getToken() {
         if (window.localStorage.getItem('uuid') && window.localStorage.getItem('visitor')){
             return window.localStorage.getItem('uuid');
         }
         return null;
        // return window.localStorage.getItem('uuid') || null;
    }

    logout(){
        window.localStorage.clear();
        this.authSubject.next(<AuthState>{is_logged_in: false});
    }

     setCompanyId(id){
        window.localStorage.setItem('company_id',id);
    }

    getCompanyId(){
        return window.localStorage.getItem('company_id') || null;
    }

}