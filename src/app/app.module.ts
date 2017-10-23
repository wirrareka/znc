import {BrowserModule} from '@angular/platform-browser';
import {RequestOptions} from '@angular/http';
import {ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
    IonicApp,
    IonicErrorHandler,
    IonicModule
} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {BaseServiceProvider} from '../providers/base-service/base-service';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import {CommonService} from '../providers/common-service/common-service';
import {LoginCheck} from '../services/login-check';
import {MenuService} from '../services/menu-service';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import {CustomPipesModule} from '../pipes/custom-pipes.module';
import {CustomDirectivesModule} from '../directives/custom-directives.module';
import { ValidatorsModule } from 'ngx-validators';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import {DfRequestOptions} from '../config/interceptors';
import { ProximioDreamfactoryProvider } from '../providers/proximio-dreamfactory/proximio-dreamfactory';
import { ProximiIoProvider } from '../providers/proximi-io/proximi-io';

import { Camera} from '@ionic-native/camera';
@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        CustomPipesModule.forRoot(),
        CustomDirectivesModule.forRoot(),
        ValidatorsModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        UniqueDeviceID,
        Camera,
        AndroidPermissions,
        {provide: RequestOptions, useClass: DfRequestOptions},
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        MenuService,
        AuthServiceProvider,
        BaseServiceProvider,
        CommonService,
        LoginCheck,
    ProximioDreamfactoryProvider,
    ProximiIoProvider
    ]
})
export class AppModule {
}
