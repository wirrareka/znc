import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events} from 'ionic-angular';

import { LoginCheck } from '../../services/login-check';
import { MenuService } from '../../services/menu-service'; 
import {DefaultPageComponent} from '../base-page';

import {ILogin} from './model/login-interface';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';

export class LoginCredModel{
    public email:string;
    public password:string;
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [LoginCheck,MenuService,AuthServiceProvider]
})
export class Login  extends DefaultPageComponent{

    credential:ILogin=new LoginCredModel('','');

  constructor(navCtrl: NavController,navParams: NavParams,loginCheck:LoginCheck,menuService:MenuService,
    events:Events,
              private authService:AuthServiceProvider) {

    super(navCtrl,navParams,loginCheck,menuService,events);

  }



  postLogin(){
      console.log('this.credential',this.credential);
      this.authService.login(this.credential);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


}
