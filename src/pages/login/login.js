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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LoginCheck } from '../../services/login-check';
import { MenuService } from '../../services/menu-service';
import { DefaultPageComponent } from '../base-page';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CompanyService } from '../../providers/company-service/company-service';
var LoginCredModel = (function () {
    function LoginCredModel(email, password) {
        this.email = email;
        this.password = password;
    }
    return LoginCredModel;
}());
export { LoginCredModel };
var Login = (function (_super) {
    __extends(Login, _super);
    function Login(navCtrl, navParams, loginCheck, menuService, events, authService, companyService) {
        var _this = _super.call(this, navCtrl, navParams, loginCheck, menuService, events) || this;
        _this.authService = authService;
        _this.companyService = companyService;
        _this.credential = new LoginCredModel('', '');
        return _this;
    }
    Login.prototype.postLogin = function () {
        console.log('this.credential', this.credential);
        this.authService.login(this.credential);
    };
    Login.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    return Login;
}(DefaultPageComponent));
Login = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
        providers: [LoginCheck, MenuService, AuthServiceProvider, CompanyService]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoginCheck, MenuService,
        Events,
        AuthServiceProvider, CompanyService])
], Login);
export { Login };
//# sourceMappingURL=login.js.map