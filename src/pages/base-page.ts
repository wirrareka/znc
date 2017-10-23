import {NavController, NavParams, Events} from 'ionic-angular';

import {LoginCheck} from '../services/login-check';
import {MenuService} from '../services/menu-service';


export class DefaultPageComponent {

    current_company_name: string = '_';


    constructor(public navCtrl: NavController, public navParams: NavParams, public loginCheck: LoginCheck, public menuService: MenuService, public events: Events) {


    }

    ionViewWillEnter() {

        this.refresh();

    }

    refresh() {
    }


    localProfile() {
        return this.loginCheck.getUser();
    }


    redirect(name, params = {}, isRoot = false) {

        if (isRoot) {
            this.navCtrl.setRoot(name, params);
        } else {
            this.navCtrl.push(name, params);
        }

    }


}
