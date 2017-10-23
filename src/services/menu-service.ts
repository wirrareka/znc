import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {MenuController} from 'ionic-angular';

import { Platform} from 'ionic-angular';

import {AndroidPermissions} from '@ionic-native/android-permissions';
export interface MenuState {
    show: boolean;
}


@Injectable()
export class MenuService {

    private menuSubject = new Subject<MenuState>();
    menuState = this.menuSubject.asObservable();

    constructor(public menu: MenuController,public platform:Platform, public androidPermissions: AndroidPermissions) {

        // console.log('this.menu',this.menu);

    }

    setState(status: boolean) {
        this.menuSubject.next(<MenuState>{show: status});
    }

    checkPermissions() {

        if (this.platform.is('cordova')) {
            const list_permissions = [
                this.androidPermissions.PERMISSION.CAMERA,
                this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
                this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
            ];
            for (let i = 0; i < list_permissions.length; i++) {
                this.addPermission(list_permissions[i]);
            }
        }
    }

    addPermission(permission) {
        this.androidPermissions.checkPermission(permission).then((status) => {
            if (!status.hasPermission) {
                this.androidPermissions.requestPermission(permission).then((result) => {
                    //all good
                });
            }
        });
    }
}