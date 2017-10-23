import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {ProximioDreamfactoryProvider} from '../../providers/proximio-dreamfactory/proximio-dreamfactory';

import {LoginCheck} from '../../services/login-check';
import {MenuService} from '../../services/menu-service';
import {DefaultPageComponent} from '../base-page';

import {UniqueDeviceID} from '@ionic-native/unique-device-id';


import { Platform} from 'ionic-angular';


export class signUpModel {
    name: string;
    phone: string;
    uuid: string;
    firm: string;
    comment: string;

    constructor(name: string, phone: string, firm: string, comment: string, uuid: string) {
        this.name = name;
        this.phone = phone;
        this.uuid = uuid;
        this.firm = firm;
        this.comment = comment;
    }

}

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
    providers: [LoginCheck, MenuService, AuthServiceProvider, ProximioDreamfactoryProvider]
})
export class Signup extends DefaultPageComponent {
    user: any = new signUpModel('', '', '', '', '');
    response: string = '';
    uuid: any = '';
    myForm: FormGroup;

    signup_status: boolean = false;


    is_in_progress : boolean = false;
    uuid_waiting : boolean = true;

    constructor(navCtrl: NavController, navParams: NavParams,
                public platform: Platform,
                loginCheck: LoginCheck, menuService: MenuService,
                events: Events, public formBuilder: FormBuilder,
                private proximioDreamfactory: ProximioDreamfactoryProvider,
                private authServiceProvider: AuthServiceProvider,
                private uniqueDeviceID: UniqueDeviceID) {


        super(navCtrl, navParams, loginCheck, menuService, events);

        if (window.localStorage.getItem('uuid')){
            this.uuid = window.localStorage.getItem('uuid');
            this.user.uuid = window.localStorage.getItem('uuid');
            this.uuid_waiting = false;
        }


        this.refresh();
        // this.uuid = 'ecd5bb03-8cae-785d-3589-580625742128';
        // this.user.uuid = 'ecd5bb03-8cae-785d-3589-580625742128';
        this.checkApi();
    }

    checkApi() {
        this.platform.ready().then(() => {
            if(this.platform.is('cordova')){
                this.uniqueDeviceID.get()
                .then((uuid: any) => {
                    this.uuid = uuid;
                    this.uuid_waiting = false;
                    this.user.uuid = uuid;
                    this.getVisitor();
                })
                .catch((error: any) => {
                    console.log('error',error);
                });
            }else{
                this.getVisitor();
            }
        });
    }

    getVisitor(){
        if (this.uuid){
            this.proximioDreamfactory.getVisitorByUuid(this.uuid).subscribe((res: any) => {
                if (res  && res.resource && res.resource.length > 0){
                    this.signup_status = true;
                    this.uuid_waiting = false;
                    window.localStorage.setItem('uuid', this.uuid);
                    this.proximioDreamfactory.setVisitor(res.resource[0]);
                    this.navCtrl.push('ProximiDemo');
                }
            });
        }else{
            this.authServiceProvider.toastMessage('please restart your application','danger','top');
        }
    }


    refresh() {
        this.getDeviceId();
        this.myForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            uuid: new FormControl(this.uuid, Validators.required),
            phone: new FormControl('', Validators.required),
            firm: new FormControl('', Validators.required),
            comment: new FormControl('', Validators.required)
        });
    }

    userTemp() {
        return new signUpModel('', '', '', '', '');
    }

    postSignup() {
        this.getDeviceId();
        if(this.uuid){
            this.is_in_progress = true;
            this.proximioDreamfactory.getVisitorByUuid(this.uuid).subscribe((res: any) => {
                if (res && res.resource && res.resource.length > 0) {
                    let currentUUids = res.resource.map((v: any) => v.uuid == this.uuid).values();
                    this.proximioDreamfactory.setVisitor(currentUUids[0]);
                    this.navCtrl.push('ProximiDemo');
                }
                else {
                       this.proximioDreamfactory.saveVisitor({
                           resource: [this.user]
                       }).subscribe((res: any) => {
                           this.proximioDreamfactory.getVisitorByUuid(this.user.uuid).subscribe((res: any) => {
                               if (res && res.resource && res.resource.length > 0) {
                                   let currentUUids = res.resource.map((v: any) => v.uuid == this.user.uuid).values();
                                   this.proximioDreamfactory.setVisitor(currentUUids[0]);
                                   this.navCtrl.push('ProximiDemo');
                               }
                           });
                       });
                }
                this.is_in_progress = false;
            });
        }else{
            this.is_in_progress = false;
            this.authServiceProvider.toastMessage('please restart your application!','danger','top');
        }
    }

    getDeviceId() {
        this.uniqueDeviceID.get()
        .then((uuid: any) => {
            this.uuid = uuid;
            this.user.uuid = this.uuid;
            window.localStorage.setItem('uuid', this.uuid);
        })
        .catch((error: any) => {
            // this.authService.toastMessage('uniqueDeviceID Plugin not found!', 'danger', 'bottom');
        });
    }


}
