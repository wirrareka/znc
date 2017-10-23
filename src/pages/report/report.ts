import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DefaultPageComponent} from '../base-page';

import {LoginCheck} from '../../services/login-check';
import {MenuService} from '../../services/menu-service';
import {ProximioDreamfactoryProvider} from '../../providers/proximio-dreamfactory/proximio-dreamfactory';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';


import {ActionSheetController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as ConfigData from "../../config/config";


export class ReportModel {
    public description;
    public attchments;

    constructor(_description: string,
                _attchments: string[]) {
        this.description = _description;
        this.attchments = _attchments;
    }
}


@IonicPage()
@Component({
    selector: 'page-report',
    templateUrl: 'report.html',
    providers: [LoginCheck, MenuService, ProximioDreamfactoryProvider,AuthServiceProvider]
})
export class Report extends DefaultPageComponent {
    report: ReportModel = new ReportModel('', []);
    myForm: FormGroup;

    is_in_progress : boolean = false;


    constructor(navCtrl: NavController,
                navParams: NavParams,
                events: Events,
                loginCheck: LoginCheck,
                menuService: MenuService,
                public formBuilder: FormBuilder,
                private camera: Camera,
                private actionsheetCtrl: ActionSheetController,
                private proximioDreamfactory: ProximioDreamfactoryProvider,
                private authService: AuthServiceProvider) {

        super(navCtrl, navParams, loginCheck, menuService, events);
        this.refresh();
    }




    openActions() {
        let actionSheet = this.actionsheetCtrl.create({
            cssClass: 'action-sheets-basic-page action-icons',
            buttons: [
                {
                    text: 'Take Photo',
                    icon: 'camera',
                    handler: () => {

                        const options: CameraOptions = {
                          quality: 100,
                          destinationType: this.camera.DestinationType.DATA_URL,
                          encodingType: this.camera.EncodingType.JPEG,
                          mediaType: this.camera.MediaType.PICTURE
                        };
                        this.camera.getPicture(options).then((imageData) => {
                            let base64Image = 'data:image/jpeg;base64,' + imageData;
                            this.report.attchments.push(base64Image);
                        }).catch((err) => {
                            this.authService.toastMessage('Permission not set!', 'danger', 'top');
                        });
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'close-circle',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        actionSheet.present();
    }

    reportTemplate = (data:ReportModel) => {
        let images = '';
            if (data.attchments.length > 0){
                for (let i=0;i<data.attchments.length; i++){
                    images+='<a href="'+data.attchments[i]+'" download><img src="'+data.attchments[i]+'" width="100"' +
                        ' height="100"/></a><code>'+data.attchments[i]+'</code><br />';
                }
            }
            if (images !=''){
                images = '<h1>Attachment</h1><br>'+images;
            }
            return `<div>
                <p>${data.description}</p><br>
                ${images}
            </div>`;
    };

    refresh(){
        this.myForm = this.formBuilder.group({
            description: new FormControl('', Validators.required)
      });
    }

    submitReportForm(event) {
        this.is_in_progress = true;
        let reportConfig : any = ConfigData.REPORT_FROM_DATA;


        let attachmentContent = this.reportTemplate(this.report);


        let user : any = this.loginCheck.getUser();
        if (!user){
            user['name'] = 'Unknown';
            user['id'] = 'Unknown';
            user['uuid'] = 'Unknown';
            user['phone'] = 'N/A';
        }

        let data = {
            "to": [
                {
                    "name": reportConfig.send_to_name,
                    "email": reportConfig.send_to_email
                }
            ],
            "subject": reportConfig.subject,
            "body_text": '',
            "body_html": '',
            "from_name": user['name'],
            "from_email": reportConfig.email,
            "reply_to_name": user['name'],
            "reply_to_email": reportConfig.reply_to_email
        };


       let content =  `
            <h4>Username : ${data.from_name}</h4><br>
            <h4>Phone : ${user['phone']}</h4><br>
            <h4>Id : ${user['id']}</h4><br>
            <h4>uuid : ${user['uuid']}</h4><br>
            <br> ${attachmentContent}<br>
            <strong>Thank You!</strong>
       ` ;

        data.body_html = content;
        data.body_text = content;

        this.proximioDreamfactory.sendEmail(data).toPromise().then((res) => {
            let responseJson = res.json();
            if (responseJson && responseJson.count == 1) {
                this.report = new ReportModel('', []);
                this.authService.toastMessage('report submitted', 'success', 'top');
            }
            this.is_in_progress = false;
        }).catch((err) => {
            this.is_in_progress = false;
            this.authService.toastMessage('Whoops,Something went wrong!', 'danger', 'top');
        });

    }

    ionViewDidLoad() {

    }

}
