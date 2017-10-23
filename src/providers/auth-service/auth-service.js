var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { API_URL } from '../../config/config';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { BaseServiceProvider } from '../base-service/base-service';
import 'rxjs/add/observable/forkJoin';
var AuthServiceProvider = (function (_super) {
    __extends(AuthServiceProvider, _super);
    function AuthServiceProvider(http, navCtrl, toastCtrl, LoadingCtrl) {
        var _this = _super.call(this, http, navCtrl, toastCtrl, LoadingCtrl) || this;
        _this.loginURL = API_URL + '/user/authenticate';
        _this.signupURL = API_URL + '/user/create';
        _this.postEmailURL = API_URL + '/password/email';
        _this.change_password_url = API_URL + '/password/email';
        _this.currentUserProfile = API_URL + '/user';
        _this.update_profile_url = API_URL + '/user/update/';
        _this.companies = API_URL + '/company/index';
        return _this;
    }
    AuthServiceProvider.prototype.profile = function (is_loader) {
        if (is_loader === void 0) { is_loader = true; }
        this.startLoader('profile loading..');
        return this.interceptObservable(this.http.get(this.currentUserProfile, this.getOption()));
    };
    AuthServiceProvider.prototype.postEmail = function (data) {
        this.startLoader();
        var body = JSON.stringify(data);
        return this.interceptObservable(this.http.post(this.postEmailURL, body, this.getOption()).timeout(3000));
    };
    AuthServiceProvider.prototype.updateProfile = function (id, data) {
        this.startLoader();
        var body = JSON.stringify(data);
        return this.interceptObservable(this.http.post(this.update_profile_url + id, body, this.getOption()));
    };
    AuthServiceProvider.prototype.postChangePassword = function (data) {
        this.startLoader();
        var body = JSON.stringify(data);
        return this.interceptObservable(this.http.post(this.change_password_url, body, this.getOption()));
    };
    AuthServiceProvider.prototype.signup = function (data) {
        this.startLoader();
        var body = JSON.stringify(data);
        return this.interceptObservable(this.http.post(this.signupURL, body, this.getOption()));
    };
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        this.startLoader();
        var body = JSON.stringify(credentials);
        console.log('this.loginURL', this.loginURL);
        var options = this.getOption();
        var loginObserver = this.http.post(this.loginURL, body, options)
            .map(this.mapRes);
        loginObserver.subscribe(function (res) { return _this.loginSuc(res); }, function (err) {
            _this.stopLoader();
            _this.toastMessage('Login fail', 'danger', 'bottom');
            _this.catchRequest(err);
        });
    };
    AuthServiceProvider.prototype.loginSuc = function (res) {
        var _this = this;
        if (res && res.token) {
            this.removeAuthData();
            window.localStorage.setItem('token', res.token);
            this.setOption();
            this.stopLoader();
            this.getCompanies().subscribe(function (res) { });
            this.profile().subscribe(function (data) {
                window.localStorage.setItem('user', JSON.stringify(data));
                _this.toastMessage('Login successfully', 'success', 'bottom');
            }, function (errr) {
            }, function () {
                _this.navCtrl.push("Dashboard");
            });
        }
    };
    ;
    return AuthServiceProvider;
}(BaseServiceProvider));
AuthServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, NavController, ToastController, LoadingController])
], AuthServiceProvider);
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map