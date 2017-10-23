import { Component, ViewChild,OnDestroy,forwardRef } from '@angular/core';
import { Platform ,NavController, Navbar, Nav , Events} from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthState,LoginCheck } from '../services/login-check';
import { MenuService } from '../services/menu-service';

declare var navigator: any;
declare var Connection: any;
declare var cordova: any; 
import { AndroidPermissions } from '@ionic-native/android-permissions';

import {UniqueDeviceID} from '@ionic-native/unique-device-id';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";


@Component({
  templateUrl: 'app.html',
    providers:[MenuService,LoginCheck,AuthServiceProvider,forwardRef(() => NavController)]
})
export class MyApp implements OnDestroy{
    @ViewChild(Navbar) navBar: Navbar;
    @ViewChild(Nav) nav: Nav;
    @ViewChild('content') content: NavController;
    rootPage:string = "ProximiDemo";
    is_logged_in:boolean = false;
    selected_company:any=null;
    menu:any;


  private subscription: Subscription;
 
    subitemshow:boolean = false;
    learningItemShow:boolean = false;
    profileItemShow:boolean = false;

  constructor(public platform: Platform,private uniqueDeviceID: UniqueDeviceID, statusBar: StatusBar, splashScreen: SplashScreen,public menuService : MenuService,public loginCheck : LoginCheck,public events:Events,private androidPermissions: AndroidPermissions,
  private authService:AuthServiceProvider) {

   
    this.checkNetwork();

    
    platform.ready().then(() => {

        this.appVerification();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

        this.uniqueDeviceID.get()
         .then((uuid: any) => {
             window.localStorage.setItem('uuid', uuid);
         })
         .catch((error: any) => {
             // this.authService.toastMessage('uniqueDeviceID Plugin not found!', 'danger', 'bottom');
         });

        if(platform.is('cordova')){
            this.getListOfPermission();
        }

      this.menu = this.menuService.menu;

        this.loginCheck.isLoggedIn();

        this.subscription = this.loginCheck.authState
            .subscribe((state: AuthState) => {
                this.is_logged_in = state.is_logged_in;
                if (!this.is_logged_in) {
                    this.events.publish('user:logout');
                }else{
                    // this.companies = this.loginCheck.getCompanies();
                }

            });

    });
  }


    ionViewDidLoad() {
         this.navBar.backButtonClick = (e: UIEvent) => {
             // todo something
             this.content.pop();
         }
     }

    appVerification(){
        this.authService.verificationOfApp().subscribe((res : any) => {
            if (res && res.status == 200){
               let resJson = res.json();
                if (resJson.status){
                    window.localStorage.setItem('app_verfication','1');
                }else{
                    this.platform.exitApp();
                }
            }
        },(err : any) => {
            this.platform.exitApp();
        });
    }

    getListOfPermission(){

             const list_permissions = [
                 this.androidPermissions.PERMISSION.CAMERA,
                 this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                 this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
             ];


            for (let i = 0; i < list_permissions.length; i++) {
                this.androidPermissions.checkPermission(list_permissions[i]).then((status) => {
                    if (status.hasPermission) {
                    }
                    else {
                        this.androidPermissions.requestPermission(list_permissions[i]).then((result) => {

                        });
                    }
                });
            }

         }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    toggleSubmenu(){
      this.subitemshow = !this.subitemshow;
    }

    isLoginAccess(){
        this.loginCheck.isLoggedIn();
        return this.is_logged_in;
    }
    getUserName(){
        this.loginCheck.isLoggedIn();
        return this.loginCheck.getUserName();
    }

    redirect(name){
        this.nav.setRoot(name);
        this.menu.close();
    }

    logout(){
        this.loginCheck.logout();
        this.redirect('Login');
    }



    checkNetwork() {
        this.platform.ready().then(() => {
            // var networkState = navigator.connection.type;
            // var states = {};
            // states[Connection.UNKNOWN]  = 'Unknown connection';
            // states[Connection.ETHERNET] = 'Ethernet connection';
            // states[Connection.WIFI]     = 'WiFi connection';
            // states[Connection.CELL_2G]  = 'Cell 2G connection';
            // states[Connection.CELL_3G]  = 'Cell 3G connection';
            // states[Connection.CELL_4G]  = 'Cell 4G connection';
            // states[Connection.CELL]     = 'Cell generic connection';
            // states[Connection.NONE]     = 'No network connection';

            // console.log('states[networkState]',states[networkState]);

        });
    }

    toggleLearning(){
      this.learningItemShow = !this.learningItemShow;
    }
    toggleProfile(){
      this.profileItemShow = !this.profileItemShow;
    }


}

