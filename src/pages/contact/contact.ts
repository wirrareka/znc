import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DefaultPageComponent} from '../base-page';

import {LoginCheck} from '../../services/login-check';
import {MenuService} from '../../services/menu-service';
import {ProximioDreamfactoryProvider} from '../../providers/proximio-dreamfactory/proximio-dreamfactory';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import * as configData from '../../config/config';

export class ContactModel {
    public name;
    public email;
    public subject;
    public message;

    constructor(_name: string,
                _email: string,
                _subject: string,
                _message: string) {
        this.name = _name;
        this.email = _email;
        this.subject = _subject;
        this.message = _message;
    }
}

@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
    providers: [LoginCheck, MenuService, ProximioDreamfactoryProvider,AuthServiceProvider]
})
export class Contact extends DefaultPageComponent {
    contact: ContactModel = new ContactModel('', '', '', '');
    myForm: FormGroup;

    is_in_progress : boolean = false;

    constructor(navCtrl: NavController,
                navParams: NavParams,
                events: Events,
                loginCheck: LoginCheck,
                menuService: MenuService,
                public formBuilder: FormBuilder,
                private proximioDreamfactory: ProximioDreamfactoryProvider,
                private authService: AuthServiceProvider) {

        super(navCtrl, navParams, loginCheck, menuService, events);
        this.refresh();
    }

    refresh(){
        this.myForm = this.formBuilder.group({
          name: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          subject: new FormControl('', Validators.required),
          message: new FormControl('', Validators.required)
      });
    }

    submitContactForm(event) {

        let edata : any = configData.REPORT_FROM_DATA;
        if (this.myForm.valid) {
            this.is_in_progress = true;
            let data = {
                "to": [
                    {
                        "name": edata.send_to_name,
                        "email": edata.send_to_email
                    }
                ],
                "subject": this.contact.subject,
                "body_text": "",
                "body_html": this.contact.message,
                "from_name": this.contact.name,
                "from_email": this.contact.email,
                "reply_to_name": this.contact.name,
                "reply_to_email": this.contact.email
            };
            this.proximioDreamfactory.sendEmail(data).toPromise().then((res) => {
                let responseJson = res.json();
                if (responseJson && responseJson.count == 1) {
                    this.contact = new ContactModel('', '', '', '');
                    this.authService.toastMessage('form submitted', 'success', 'top');
                }
                this.is_in_progress = false;
            }).catch((err) => {
                this.is_in_progress = false;
                this.authService.toastMessage('Whoops,Something went wrong!', 'danger', 'top');
            });
        }else{
            this.authService.toastMessage('all fields are mandatory!', 'success', 'top');
        }
    }

    ionViewDidLoad() {

    }

}
