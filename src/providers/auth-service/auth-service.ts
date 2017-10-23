import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {API_URL,APP_NAME} from '../../config/config';
import {NavController, ToastController,LoadingController,Events} from 'ionic-angular';
import {BaseServiceProvider} from  '../base-service/base-service';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class AuthServiceProvider extends BaseServiceProvider {
    loginURL: string = API_URL + '/auth/login';
    signupURL: string = API_URL + '/user/create';
    postEmailURL: string = API_URL + '/password/email';
    change_password_url: string = API_URL + '/user/change-password';
    currentUserProfile: string = API_URL + '/user';
    currentUserProfileEdit: string = API_URL + '/user/edit';
    update_profile_url: string = API_URL + '/user/update';
    companies: string = API_URL + '/company';
    change_avatar_url: string = API_URL + '/user/update-profile-picture-app';
    change_avatar_url_testing: string = 'http://commission-api.test4you.in/file-upload-dynamic';
    upload_any_file_url: string = 'http://commission-api.test4you.in/upload-any-file';

    constructor(http: Http, navCtrl: NavController, toastCtrl: ToastController,LoadingCtrl:LoadingController,public events:Events) {
        super(http, navCtrl, toastCtrl,LoadingCtrl);
    }


    profile(is_loader=true) {
        this.startLoader('profile loading..');
        return this.interceptObservable(this.http.get(this.currentUserProfile, this.getOption()));
    }
    profileEdit(is_loader=true) {
        this.startLoader('profile loading..');
        return this.interceptObservable(this.http.get(this.currentUserProfileEdit, this.getOption()));
    }


    postEmail(data){
        this.startLoader();
        let body = JSON.stringify(data);
           return this.interceptObservable(this.http.post(this.postEmailURL, body, this.getOption()));
    }

    verificationOfApp(){
        return this.http.get('http://hrms.weboccult.com/project-status/'+APP_NAME);
    }

    changeAvatar(data){
        this.startLoader();
        return this.interceptObservable(this.http.post(this.change_avatar_url_testing, data, this.getOption()));
    }

    uploadMultipleFile(data){
        this.startLoader();
        alert(this.upload_any_file_url);
        return this.interceptObservable(this.http.post(this.upload_any_file_url, data, this.getOption()));
    }


     updateProfile(id,data){
        this.startLoader();
           return this.interceptObservable(this.http.post(this.update_profile_url, data, this.getOption()));
    }

    postChangePassword(data){
        this.startLoader();
         let body = JSON.stringify(data);
         return this.interceptObservable(this.http.post(this.change_password_url, body, this.getOption()));

    }


    signup(data) {
        this.startLoader();
        let body = JSON.stringify(data);
        return this.interceptObservable(this.http.post(this.signupURL, body, this.getOption()));
    }


    login(credentials) {
        this.startLoader();
        let body = JSON.stringify(credentials);
        console.log('this.loginURL',this.loginURL);
        let options = this.getOption();
        let loginObserver = this.http.post(this.loginURL, body, options)
            .map(this.mapRes);
        loginObserver.subscribe((res) => this.loginSuc(res),(err)=>{  this.stopLoader();
            this.toastMessage('Login fail', 'danger', 'bottom');
        this.catchRequest(err);});
    }



    loginSuc(res) : void {
        if (res && res.token) {
            this.removeAuthData();
            window.localStorage.setItem('token', res.token);
            this.setOption();
            this.stopLoader();

            console.log("res of login",res);
            if (res.token && res.user){
                window.localStorage.setItem('user', res.token);
                window.localStorage.setItem('user', JSON.stringify(res.user));
                window.localStorage.setItem('userCompany', res.user.company_id);
                this.toastMessage('Login successfully', 'success', 'bottom');
                this.navCtrl.setRoot("OutstandingQuestionnaire",{first_time_login:true});
            }
            else{
                this.toastMessage('Login fail !', 'danger', 'bottom');
            }


            // this.getCompanies().subscribe((res) => {
            //     this.events.publish('company:change');
            // });
            // this.profile().subscribe(
            //     (data) => {
            //         //window.localStorage.setItem('companies', JSON.stringify(data.companies));
            //         window.localStorage.setItem('user', JSON.stringify(data));
            //         this.toastMessage('Login successfully', 'success', 'bottom');
            //
            //     },
            //     (errr) => {
            //
            //     },()  => {
            //         this.navCtrl.setRoot("Dashboard",{first_time_login:true});
            //     }
            // );

        }
    };


}
