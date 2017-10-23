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


export class DocumenttModel {
    public attchments;

    constructor(_attchments: string[]) {
        this.attchments = _attchments;
    }
}


@IonicPage()
@Component({
    selector: 'page-upload-document-id',
    templateUrl: 'upload-document-id.html',
    providers: [LoginCheck, MenuService, ProximioDreamfactoryProvider,AuthServiceProvider]
})
export class UploadDocumentId extends DefaultPageComponent {
    is_document:any=null;
    documents: DocumenttModel = new DocumenttModel([]);
    myForm: FormGroup;


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
                        this.authService.toastMessage('takingstart', 'danger', 'top');
                        this.camera.getPicture(options).then((imageData) => {
                            let base64Image = 'data:image/jpeg;base64,' + imageData;
                            this.authService.toastMessage('base64image found', 'danger', 'top');
                            this.documents = new DocumenttModel([base64Image]);
                        }).catch((err) => {
                            this.authService.toastMessage('cordova error', 'danger', 'top');
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

    reportTemplate = (data:DocumenttModel) : String =>  {
        let images = '';
            if (data.attchments.length > 0){
                for (let i=0;i<data.attchments.length; i++){
                    images+='<img src="'+data.attchments[i]+'"/><code>'+data.attchments[i]+'</code><br />';
                }
            }

            images = '<h1>Attachment</h1><br>'+images;

            return `<div>
              <h1>${this.loginCheck.getUserName()}</h1><br>
              <h4>Documents:</h4>
                ${images}
            </div>`;
    };

    refresh(){
        if (window.localStorage.getItem('is_document')){
            this.is_document = 1;
        }

        if (window.localStorage.getItem('document')){
           this.documents.attchments = [window.localStorage.getItem('document')];
           this.is_document = 1;
        }

        this.myForm = this.formBuilder.group({
            document: new FormControl(this.is_document, Validators.required)
      });
    }

    submitReportForm(event) {
        if (this.myForm.valid) {

           let template =  this.reportTemplate(this.documents);
           console.log('template',template);

            let data = {
                "to": [
                    {
                        "name": "Zence Technology",
                        "email": "dev002.weboccult@gmail.com"
                    }
                ],
                "subject": 'Document Id Attached',
                "body_text": template,
                "body_html": template,
                "from_name": this.loginCheck.getUserName(),
                "from_email": 'dev001.weboccult@gmail.com',
                "reply_to_name": 'dev001',
                "reply_to_email": 'dev001.weboccult@gmail.com'
            };
            this.proximioDreamfactory.sendEmail(data).toPromise().then((res) => {
                let responseJson = res.json();
                if (responseJson && responseJson.count == 1) {
                     window.localStorage.setItem('is_document','1');
                     window.localStorage.setItem('document',this.documents.attchments[0]);
                    this.authService.toastMessage('document submitted', 'success', 'top');
                }
            }).catch((err) => {
                this.authService.toastMessage('Whoops,Something went wrong!', 'danger', 'top');
            });
        }else{
            this.authService.toastMessage('all fields are mandatory!', 'success', 'top');
        }
    }

    ionViewDidLoad() {

    }

}
