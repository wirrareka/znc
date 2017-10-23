import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {LoginCheck} from '../../services/login-check';
import {MenuService} from '../../services/menu-service';
import {DefaultPageComponent} from '../base-page';

declare var $: any;


@IonicPage()
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
    providers: [LoginCheck, MenuService]
})
export class Dashboard extends DefaultPageComponent {
    is_logout_called :boolean = false;

    constructor(navCtrl: NavController,
                navParams: NavParams,
                loginCheck: LoginCheck,
                menuService: MenuService,
                events: Events) {

        super(navCtrl, navParams, loginCheck, menuService, events);

        if (!this.loginCheck.isLoggedIn()) {
            this.redirect('Login', {}, true);
        }

        this.events.subscribe('user:logout', (payload) => {
            if (!this.is_logout_called) {
                this.is_logout_called = true;
                this.redirect('Login', {}, true);
            }
        });

    }

    ionViewWillLeave(){
        this.events.unsubscribe('user:logout');
    }

}
