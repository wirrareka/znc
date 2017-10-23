var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Transfer } from '@ionic-native/transfer';
import { GoogleMaps } from '@ionic-native/google-maps';
import 'chart.js/dist/Chart.bundle';
import { ChartsModule } from 'ng2-charts';
import { IonicApp, IonicErrorHandler, IonicModule, NavController, MenuController, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ValidatorsModule } from 'ngx-validators';
import { MyApp } from './app.component';
import { BaseServiceProvider } from '../providers/base-service/base-service';
import { EmailValidatorDirective } from '../directives/email-validator/email-validator';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CommonService } from '../providers/common-service/common-service';
import { CompanyService } from '../providers/company-service/company-service';
import { PortfolioService } from '../providers/portfolio-service/portfolio-service';
import { PropertyService } from '../providers/property-service/property-service';
import { LoginCheck } from '../services/login-check';
import { MenuService } from '../services/menu-service';
import { EqualValidator } from '../directives/equal-validator/equal-validator';
import { CloudModule } from '@ionic/cloud-angular';
import { LogTypeServiceProvider } from '../providers/log-type-service/log-type-service';
import { SubLogTypeServiceProvider } from '../providers/sub-log-type-service/sub-log-type-service';
import { LogEntriesService } from '../providers/log-entries-service/log-entries-service';
import { WalletService } from '../providers/wallet-service/wallet-service';
import { UserService } from '../providers/user-service/user-service';
import { InvitationService } from '../providers/invitation-service/invitation-service';
import { SearchPipe } from '../pipes/search/search';
import { DevicePermissionServiceProvider } from '../providers/device-permission-service/device-permission-service';
import { WorkOrderServiceProvider } from '../providers/work-order-service/work-order-service';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CompanyEventService } from '../providers/company-event-service/company-event-service';
import { AssetService } from '../providers/asset-service/asset-service';
import { PrivilegeService } from '../providers/privilege-service/privilege-service';
import { UsergroupService } from '../providers/usergroup-service/usergroup-service';
var cloudSettings = {
    'core': {
        'app_id': 'fed069ff'
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            EmailValidatorDirective,
            EqualValidator,
            SearchPipe
        ],
        imports: [
            CommonModule,
            HttpModule,
            ReactiveFormsModule,
            BrowserModule,
            IonicModule.forRoot(MyApp),
            CloudModule.forRoot(cloudSettings),
            ValidatorsModule,
            ChartsModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp
        ],
        providers: [
            StatusBar,
            Transfer,
            Geolocation,
            Diagnostic,
            SplashScreen,
            GoogleMaps,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            {
                provide: AuthServiceProvider,
                useFactory: function (http, NavCtrl, toastCtrl, LoadingCtrl) {
                    return new AuthServiceProvider(http, NavCtrl, toastCtrl, LoadingCtrl);
                },
                deps: [Http, NavController, ToastController]
            },
            {
                provide: MenuService,
                useFactory: function (menuCtrl) {
                    return new MenuService(menuCtrl);
                },
                deps: [MenuController]
            },
            BaseServiceProvider,
            CommonService,
            CompanyService,
            PortfolioService,
            PropertyService,
            LoginCheck,
            LogTypeServiceProvider,
            SubLogTypeServiceProvider,
            LogEntriesService,
            WalletService,
            UserService,
            InvitationService,
            DevicePermissionServiceProvider,
            WorkOrderServiceProvider,
            CompanyEventService,
            AssetService,
            PrivilegeService,
            UsergroupService
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map