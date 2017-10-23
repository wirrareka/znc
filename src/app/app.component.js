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
import { Platform, NavController, Navbar, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginCheck } from '../services/login-check';
import { MenuService } from '../services/menu-service';
import { Deploy } from '@ionic/cloud-angular';
import { CompanyEventService } from '../providers/company-event-service/company-event-service';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menuService, loginCheck, deploy, companyEventService, events) {
        var _this = this;
        this.platform = platform;
        this.menuService = menuService;
        this.loginCheck = loginCheck;
        this.deploy = deploy;
        this.companyEventService = companyEventService;
        this.events = events;
        this.rootPage = "Dashboard";
        this.is_logged_in = false;
        this.selected_company = null;
        this.subitemshow = false;
        this.checkNetwork();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.menu = _this.menuService.menu;
            _this.loginCheck.isLoggedIn();
            _this.subscription = _this.loginCheck.authState
                .subscribe(function (state) {
                _this.is_logged_in = state.is_logged_in;
                if (!_this.is_logged_in) {
                    _this.events.publish('user:logout');
                }
                else {
                    _this.companies = _this.loginCheck.getCompanies();
                }
            });
        });
    }
    MyApp.prototype.changeCompany = function (event) {
        var _this = this;
        this.loginCheck.setCompanyId(this.selected_company);
        var temp = this.companies;
        var c = temp.filter(function (item) {
            if (item.id == _this.selected_company)
                return item;
        });
        window.localStorage.setItem('currentCompany', JSON.stringify(c[0]));
        this.events.publish('company:change');
        this.menu.close();
    };
    MyApp.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.navBar.backButtonClick = function (e) {
            // todo something
            _this.content.pop();
        };
    };
    MyApp.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    MyApp.prototype.toggleSubmenu = function () {
        this.subitemshow = !this.subitemshow;
    };
    MyApp.prototype.isLoginAccess = function () {
        this.loginCheck.isLoggedIn();
        return this.is_logged_in;
    };
    MyApp.prototype.getUserName = function () {
        this.loginCheck.isLoggedIn();
        return this.loginCheck.getUserName();
    };
    MyApp.prototype.redirect = function (name) {
        this.nav.setRoot(name);
        this.menu.close();
    };
    MyApp.prototype.logout = function () {
        this.loginCheck.logout();
        this.redirect('Login');
    };
    MyApp.prototype.checkNetwork = function () {
        this.platform.ready().then(function () {
            // var networkState = navigator.connection.type;
            // var states = {};
            // states[Connection.UNKNOWN]  = 'Unknown connection';
            // states[Connection.ETHERNET] = 'Ethernet connection';
            // states[Connection.WIFI]     = 'WiFi connection';
            // states[Connection.CELL_2G]  = 'Cell 2G connection';
            // states[Connection.CELL_3G]  = 'Cell 3G connection';
            // states[Connection.CELL_4G]  = 'Cell 4G connection';
            // states[Connection.CELL]     = 'Cell generic connection';
            // states[Connection.NONE]     = 'No network connection';
            // console.log('states[networkState]',states[networkState]);
        });
    };
    return MyApp;
}());
__decorate([
    ViewChild(Navbar),
    __metadata("design:type", Navbar)
], MyApp.prototype, "navBar", void 0);
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
__decorate([
    ViewChild('content'),
    __metadata("design:type", NavController)
], MyApp.prototype, "content", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html',
        providers: [MenuService, LoginCheck, CompanyEventService]
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, MenuService, LoginCheck, Deploy, CompanyEventService, Events])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map