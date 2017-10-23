var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { API_URL } from '../../config/config';
// import {LoaderService} from  '../services/loader.service';
/*
 Generated class for the BaseServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var BaseServiceProvider = (function () {
    function BaseServiceProvider(http, navCtrl, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.base_url = API_URL;
        this.companies = API_URL + '/company';
        this.http = http;
        console.log('Hello BaseServiceProvider Provider');
    }
    BaseServiceProvider.prototype.startLoader = function (content) {
        if (content === void 0) { content = 'Wait a moment..'; }
        this.loader = this.loadingCtrl.create({
            content: content,
        });
        this.loader.present();
    };
    BaseServiceProvider.prototype.stopLoader = function () {
        console.log('stopLoader : this.loader', this.loader);
        if (this.loader) {
            this.loader.dismiss();
        }
    };
    BaseServiceProvider.prototype.finallyEndRequest = function () {
        this.stopLoader();
        // if(errors && errors.error == 'token_not_provided' ){
        //     this.toastMessage('Token Expired Relogin', 'danger', 'bottom');
        //      return {code:400,status:'Failure',data:[]};
        // }
        return [];
    };
    ;
    BaseServiceProvider.prototype.interceptObservable = function (observable) {
        var _this = this;
        return observable.map(function (res) {
            console.log('res.json()', res.json());
            return res.json();
        }).catch(function (err, source) {
            if (err instanceof Response && err.status != 500) {
                var errorData = err.json();
                if (errorData.error == 'token_expired' || errorData.error == 'token_not_provided' || errorData.error == 'token_not_provided' || errorData.error == 'token_invalid') {
                    _this.removeAuthData();
                    _this.toastMessage('Token Expired Re login', 'danger', 'bottom');
                    return Observable.throw('Token Expired');
                }
                else if (err.status == 400 && errorData && errorData.validation_errors) {
                    _this.toastMessage('Enter Proper Data', 'danger', 'top');
                    for (var key in errorData.validation_errors) {
                        if (errorData.validation_errors.hasOwnProperty(key)) {
                            _this.toastMessage(errorData.validation_errors[key][0], 'danger', 'bottom');
                        }
                    }
                    return Observable.throw('Validation Fail');
                }
                else if (err.status == 400 && errorData && errorData.message) {
                    _this.toastMessage(errorData.message, 'danger', 'bottom');
                }
                else {
                    _this.toastMessage('Exception throw', 'danger', 'bottom');
                    return Observable.throw('Token Expired');
                }
                return Observable.throw('backend server error');
            }
            else {
                _this.toastMessage('Internal server error', 'danger', 'bottom');
            }
            return Observable.throw('backend server error');
        }).finally(function () {
            _this.stopLoader();
        });
    };
    BaseServiceProvider.prototype.catchRequest = function (observable) {
        return ([]);
        // let errors:any;
        // try {
        //     errors = error.json();
        // } catch (e) {
        //     console.log('internal server eerrros');
        //     return ([]);
        // }
        // // console.log(errors);
        // if(errors && errors.error == 'token_not_provided' ){
        //     this.toastMessage('Token Expired Relogin', 'danger', 'bottom');
        //       return ([]);
        // }
        // if(error.status== 400 && errors && errors.validation_errors){
        //     for (var key in errors.validation_errors) {
        //         if (errors.validation_errors.hasOwnProperty(key)) {
        //              this.toastMessage(errors.validation_errors[key][0], 'danger', 'bottom');
        //         }
        //     }
        //     return ([]);
        // }
        //  if (error.status == 401 && errors && errors.message) {
        //       this.toastMessage(errors.message, 'danger', 'bottom');
        //     return ([]);
        // }
        // if (error.status == 422) {
        //     for (var key in errors) {
        //         if (errors.hasOwnProperty(key)) {
        //             this.toastMessage(errors[key], 'danger', 'bottom');
        //         }
        //     }
        //      console.log('2');
        //   return ([]);
        // }
        // if (error.status == 404 && errors && errors.message) {
        //     this.toastMessage(errors.message, 'danger', 'bottom');
        //     console.log('3');
        //     return ([]);
        // }
        // if (errors && (errors.error == 'token_expired' || errors.error == 'token_not_provided' ||
        //     errors.error == 'token_not_provided' || errors.error == 'token_invalid')
        // ) {
        //     this.removeAuthData();
        //     this.loginMessage();
        //     console.log('5');
        //     return ([]);
        // }
        // else if ((error.status == 400 && !errors.status && errors.message) || (error.status == 400 && errors.status && errors.message)) {
        //     this.toastMessage(errors.message, 'warning');
        //     console.log('6');
        //     return ([]);
        // } else if (error.status == 401 && errors && errors.error == 'invalid_credentials') {
        //     this.toastMessage('Invalid Credentials', 'warning');
        //     this.removeAuthData();
        //     console.log('7');
        //     return ([]);
        // }
        // else{
        //     console.log('8');
        //      return ([]);
        // }
    };
    ;
    BaseServiceProvider.prototype.mapRes = function (res) {
        return (res.json());
    };
    ;
    BaseServiceProvider.prototype.setOption = function () {
        var token = this.getToken();
        var headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        var options = new RequestOptions({ headers: headers });
        this.options = options;
    };
    BaseServiceProvider.prototype.getOption = function () {
        var token = this.getToken() || null;
        var headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        var options = new RequestOptions({ headers: headers });
        return options;
    };
    BaseServiceProvider.prototype.isLoggedIn = function () {
        if (this.getToken()) {
            return true;
        }
        else {
            return false;
        }
    };
    BaseServiceProvider.prototype.removeAuthData = function () {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
    };
    BaseServiceProvider.prototype.logout = function () {
        this.removeAuthData();
    };
    BaseServiceProvider.prototype.httpErrorHandler = function (error) {
        var errors;
        try {
            errors = error.json();
        }
        catch (e) {
            console.log('internal server eerrros');
        }
        if (error.status == 400 && errors && errors.validation_errors) {
            for (var key in errors.validation_errors) {
                if (errors.validation_errors.hasOwnProperty(key)) {
                    console.log('errors.validation_errors[key]', errors.validation_errors[key][0]);
                    // this.toastMessage(errors.validation_errors[key], 'danger', 'bottom');
                }
            }
        }
        if (error.status == 422) {
            for (var key in errors) {
                if (errors.hasOwnProperty(key)) {
                    this.toastMessage(errors[key], 'danger', 'bottom');
                }
            }
            return false;
        }
        if (error.status == 404 && errors && errors.message) {
            return false;
        }
        if (errors && (errors.error == 'token_expired' || errors.error == 'token_not_provided' ||
            errors.error == 'token_not_provided' || errors.error == 'token_invalid')) {
            this.removeAuthData();
            this.loginMessage();
            // this.navCtrl.push(HomePage);
        }
        else if ((error.status == 400 && !errors.status && errors.message) || (error.status == 400 && errors.status && errors.message)) {
            this.toastMessage(errors.message, 'warning');
        }
        else if (error.status == 401 && errors && errors.error == 'invalid_credentials') {
            this.toastMessage('Invalid Credentials', 'warning');
            this.removeAuthData();
        }
    };
    BaseServiceProvider.prototype.loginMessage = function () {
        var toast = this.toastCtrl.create({
            message: 'UnAuthorised!',
            duration: 3000,
            cssClass: 'warning',
            position: 'top',
        });
        toast.present();
    };
    BaseServiceProvider.prototype.toastMessage = function (message, cls, position) {
        if (position === void 0) { position = 'top'; }
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            showCloseButton: false,
            dismissOnPageChange: false,
            cssClass: cls,
            position: position,
        });
        toast.present();
    };
    BaseServiceProvider.prototype.getAuthHeader = function () {
        var token = this.getToken();
        var headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return headers;
    };
    BaseServiceProvider.prototype.postAuthHeader = function () {
        var headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.getToken() });
        return headers;
    };
    BaseServiceProvider.prototype.getToken = function () {
        return window.localStorage.getItem('token') || null;
    };
    BaseServiceProvider.prototype.getUser = function () {
        var u = window.localStorage.getItem('user') || [];
        return JSON.parse(u);
    };
    BaseServiceProvider.prototype.getUserName = function () {
        var user = this.getUser();
        if (user.name) {
            return user.name;
        }
        return 'Guest';
    };
    BaseServiceProvider.prototype.getSelectedCompany = function () {
        var c = window.localStorage.getItem('currentCompany') || [];
        return JSON.parse(c);
    };
    BaseServiceProvider.prototype.setUser = function (user) {
        return window.localStorage.setItem('user', JSON.stringify(user));
    };
    BaseServiceProvider.prototype.getCompanies = function () {
        return this.http.get(this.companies, this.getOption()).map(function (res) {
            var response = res.json();
            if (response.code == 200) {
                window.localStorage.setItem('companies', JSON.stringify(response.data.companies));
                window.localStorage.setItem('currentCompany', JSON.stringify(response.data.companies[0]));
                window.localStorage.setItem('company_id', response.data.companies[0].id);
                return response.data;
            }
        });
    };
    BaseServiceProvider.prototype.setCompanyId = function (id) {
        window.localStorage.setItem('company_id', id);
    };
    BaseServiceProvider.prototype.getCompanyId = function () {
        var company_id = parseInt(window.localStorage.getItem('company_id'));
        if (company_id) {
            return company_id;
        }
        console.log('company not found!');
        return 0;
    };
    BaseServiceProvider.prototype.getUrlWithCompany = function (url) {
        return url + "?company_id=" + this.getCompanyId();
    };
    BaseServiceProvider.prototype.getCurrentCompanyName = function () {
        var company = this.getSelectedCompany();
        if (company && company.name) {
            return company.name;
        }
        return '_';
    };
    BaseServiceProvider.prototype.getCurrentPrefix = function () {
    };
    return BaseServiceProvider;
}());
BaseServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, NavController, ToastController, LoadingController])
], BaseServiceProvider);
export { BaseServiceProvider };
//# sourceMappingURL=base-service.js.map