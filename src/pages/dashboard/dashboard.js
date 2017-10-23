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
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Select } from 'ionic-angular';
import { LoginCheck } from '../../services/login-check';
import { MenuService } from '../../services/menu-service';
import { DefaultPageComponent } from '../base-page';
/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Dashboard = (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard(navCtrl, navParams, loginCheck, menuService, events) {
        var _this = _super.call(this, navCtrl, navParams, loginCheck, menuService, events) || this;
        _this.companies = [];
        _this.selected_company = null;
        _this.is_show_company_dropdown = 'none';
        return _this;
    }
    Dashboard.prototype.compnayDropDownHide = function (event) {
        console.log('event', event);
    };
    Dashboard.prototype.changeCompany = function (event) {
        var _this = this;
        this.loginCheck.setCompanyId(this.default_company_id);
        var temp = this.defaultCompanies;
        var c = temp.filter(function (item) {
            if (item.id == _this.default_company_id)
                return item;
        });
        window.localStorage.setItem('currentCompany', JSON.stringify(c[0]));
        this.events.publish('company:change');
        // this.companyDropDown.close();
        this.is_show_company_dropdown = 'none';
    };
    Dashboard.prototype.show = function () {
        this.is_show_company_dropdown = 'block';
        this.companyDropDown.open();
    };
    Dashboard.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    return Dashboard;
}(DefaultPageComponent));
__decorate([
    ViewChild('companyDropDown'),
    __metadata("design:type", Select)
], Dashboard.prototype, "companyDropDown", void 0);
Dashboard = __decorate([
    IonicPage(),
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html',
        providers: [LoginCheck, MenuService]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoginCheck,
        MenuService,
        Events])
], Dashboard);
export { Dashboard };
//# sourceMappingURL=dashboard.js.map