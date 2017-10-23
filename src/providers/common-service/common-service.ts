import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, ToastController,LoadingController} from 'ionic-angular';
import {BaseServiceProvider} from  '../base-service/base-service';
import { API_URL } from '../../config/config';

@Injectable()
export class CommonService extends BaseServiceProvider{

    url:string=`${API_URL}/company`;

  constructor(public http: Http, navCtrl: NavController, toastCtrl: ToastController,LoadingCtrl:LoadingController) {
      super(http, navCtrl, toastCtrl,LoadingCtrl);
  }

}
