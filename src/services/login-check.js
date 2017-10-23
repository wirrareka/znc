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
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
var LoginCheck = (function () {
    function LoginCheck(http) {
        this.http = http;
        this.authSubject = new Subject();
        this.authState = this.authSubject.asObservable();
        this.authSubject.next({ is_logged_in: this.isLoggedIn() });
        console.log('authSubject', this.authSubject);
    }
    LoginCheck.prototype.getUser = function () {
        var user = window.localStorage.getItem('user') || '[]';
        return JSON.parse(user);
    };
    LoginCheck.prototype.getCompanies = function () {
        var companies = window.localStorage.getItem('companies');
        if (companies) {
            return JSON.parse(companies);
        }
        else {
            return [];
        }
    };
    LoginCheck.prototype.getCurrentCompany = function () {
        var companies = window.localStorage.getItem('currentCompany');
        return JSON.parse(companies);
    };
    LoginCheck.prototype.getCurrentCompanyName = function () {
        var company = this.getCurrentCompany();
        if (company) {
            return company.name;
        }
        return '_';
    };
    LoginCheck.prototype.getUserName = function () {
        var user = window.localStorage.getItem('user');
        this.user = JSON.parse(user);
        if (this.user && this.user.name) {
            return this.user.name;
        }
        else {
            this.authSubject.next({ is_logged_in: false });
        }
        return 'Unknown';
    };
    LoginCheck.prototype.isLoggedIn = function () {
        if (this.getToken()) {
            this.authSubject.next({ is_logged_in: true });
            return true;
        }
        else {
            this.authSubject.next({ is_logged_in: false });
            return false;
        }
    };
    LoginCheck.prototype.getToken = function () {
        return window.localStorage.getItem('token') || null;
    };
    LoginCheck.prototype.logout = function () {
        window.localStorage.clear();
        this.authSubject.next({ is_logged_in: false });
    };
    LoginCheck.prototype.setCompanyId = function (id) {
        window.localStorage.setItem('company_id', id);
    };
    LoginCheck.prototype.getCompanyId = function () {
        return window.localStorage.getItem('company_id') || null;
    };
    return LoginCheck;
}());
LoginCheck = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], LoginCheck);
export { LoginCheck };
//# sourceMappingURL=login-check.js.map