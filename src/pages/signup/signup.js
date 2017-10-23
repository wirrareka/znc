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
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'ngx-validators';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginCheck } from '../../services/login-check';
import { MenuService } from '../../services/menu-service';
import { DefaultPageComponent } from '../base-page';
var signUpModel = (function () {
    function signUpModel(name, email, password, password_confirmation) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }
    return signUpModel;
}());
export { signUpModel };
var Signup = (function (_super) {
    __extends(Signup, _super);
    function Signup(navCtrl, navParams, loginCheck, menuService, events, formBuilder, authService) {
        var _this = _super.call(this, navCtrl, navParams, loginCheck, menuService, events) || this;
        _this.formBuilder = formBuilder;
        _this.authService = authService;
        _this.user = new signUpModel('', '', '', '');
        _this.refresh();
        return _this;
    }
    Signup.prototype.refresh = function () {
        this.myForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([Validators.required, EmailValidators.normal,])),
            password: new FormControl('', Validators.required),
            password_confirmation: new FormControl('', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ]))
        });
    };
    Signup.prototype.userTemp = function () {
        return new signUpModel('', '', '', '');
    };
    Signup.prototype.isEqualPassword = function (control) {
        if (!this.myForm) {
            return { passwordsNotMatch: true };
        }
        if (control.value !== this.myForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    };
    Signup.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    Signup.prototype.postSignup = function () {
        var _this = this;
        this.authService.signup(this.user).subscribe(function (res) {
            if (res.status == 'success') {
                _this.user = _this.userTemp();
                _this.authService.toastMessage(res.message, 'success', 'bottom');
                _this.redirect('Login');
            }
        });
    };
    return Signup;
}(DefaultPageComponent));
Signup = __decorate([
    IonicPage(),
    Component({
        selector: 'page-signup',
        templateUrl: 'signup.html',
        providers: [LoginCheck, MenuService, AuthServiceProvider]
    }),
    __metadata("design:paramtypes", [NavController, NavParams, LoginCheck, MenuService, Events, FormBuilder, AuthServiceProvider])
], Signup);
export { Signup };
//# sourceMappingURL=signup.js.map