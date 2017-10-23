import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {NavController, ToastController, LoadingController, Loading} from 'ionic-angular';
import {IBaseService} from './base-interface';
import {API_URL} from '../../config/config';
// import {LoaderService} from  '../services/loader.service';

/*
 Generated class for the BaseServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class BaseServiceProvider implements IBaseService {
  public http;
  public loader: Loading;
  public options;
  public base_url: string = API_URL;
  companies: string = API_URL + '/company';

  constructor(http: Http, public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.http = http;
  }


  startLoader(content: string = 'Wait a moment..') {
    this.loader = this.loadingCtrl.create({
      content: content,
    });
    this.loader.present();
  }

    convertToMinutes(value){
            let slicedValue: any = value.slice(0, -1);
            if (value.endsWith('d') && slicedValue > 0) {
                return parseInt(value.slice(0, -1)) * 8 * 60;
            }
            else if (value.endsWith('h') && slicedValue > 0) {
                let tn: any = slicedValue * 60;
                return parseInt(tn);
            }
            else if (value.endsWith('m') && slicedValue > 0) {
                return slicedValue;
            } else if (value.replace(/[^h]/g, "").length == 1 && value.replace(/[^m]/g, "").length == 1 && (value.endsWith('h') || value.endsWith('m'))) {
                return value.substr(0, value.indexOf('h')) * 60 + parseInt(value.substr(value.indexOf('h') + 1));
            } else {
                let n = Math.floor(Number(value));
                if (String(n) === value && n >= 0) {
                    return n;
                } else {
                    return false;
                }
            }
        }

    millSecondsToTimeString(millseconds) {
                let oneSecond = 1000;
                let oneMinute = oneSecond * 60;
                let oneHour = oneMinute * 60;
                let oneDay = oneHour * 24;

                // let seconds = Math.floor((millseconds % oneMinute) / oneSecond);
                let minutes = Math.floor((millseconds % oneHour) / oneMinute);
                let hours = Math.floor((millseconds % oneDay) / oneHour);
                let days = Math.floor(millseconds / oneDay);

                let timeString = '';
                if (days !== 0) {
                    timeString += (days !== 1) ? (days + 'd') : (days + 'd');
                }
                if (hours !== 0) {
                    timeString += (hours !== 1) ? (hours + 'h') : (hours + 'h');
                }
                if (minutes !== 0) {
                    timeString += (minutes !== 1) ? (minutes + 'm') : (minutes + 'm');
                }

                return timeString;
            }

  stopLoader() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }


  finallyEndRequest(): any {

    this.stopLoader();

    // if(errors && errors.error == 'token_not_provided' ){
    //     this.toastMessage('Token Expired Relogin', 'danger', 'bottom');
    //      return {code:400,status:'Failure',data:[]};
    // }
    return [];
  };

    objectToQueryString(options){

         let params = new URLSearchParams();
         for(let key in options){
             params.set(key, options[key])
         }

         return params.toString();

     }

    getFormOption() {
            let token = this.getToken() || null;
            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + token});
            let options = new RequestOptions({headers: headers});
            return options;
        }

  interceptObservable(observable: Observable<Response>): Observable<Response> {
    return observable.map((res: Response) => {
      let data = res.json();
      // data.code = res.status;
      return data;
    }).catch((err, source) => {
      if (err instanceof Response && err.status != 500 && err.status != 401) {
        let errorData = err.json();

        if (errorData.error == 'token_expired' || errorData.error == 'token_not_provided' || errorData.error == 'token_not_provided' || errorData.error == 'token_invalid') {
          this.removeAuthData();
          this.toastMessage('Token Expired Re login', 'danger', 'bottom');
          return Observable.throw('Token Expired');
        } else if (err.status == 400 && errorData && errorData.validation_errors) {
          this.toastMessage('Enter Proper Data', 'danger', 'top');
          for (var key in errorData.validation_errors) {
            if (errorData.validation_errors.hasOwnProperty(key)) {
              this.toastMessage(errorData.validation_errors[key][0], 'danger', 'bottom');
            }
          }
          return Observable.throw('Validation Fail');
        } else if (err.status == 400 && errorData && errorData.message) {
          this.toastMessage(errorData.message, 'danger', 'bottom');
        } else if (err.status == 422 && errorData) {
          for (var key in errorData) {
            if (errorData.hasOwnProperty(key)) {
              let tempE = errorData[key];
              if (tempE instanceof Array) {
                for (var msg in tempE) {
                  this.toastMessage(tempE[msg], 'danger', 'bottom');
                }
              }
              else {
                this.toastMessage(errorData[key], 'danger', 'bottom');
              }
            }
          }
          return Observable.throw('Validation Fail');
        }
        else {
          this.toastMessage('Exception throw', 'danger', 'bottom');
          return Observable.throw('Token Expired');
        }
        return Observable.throw('backend server error');
      }
      else {
        this.toastMessage('Internal server error or login required', 'danger', 'bottom');
      }
      this.toastMessage('Internal server error', 'danger', 'bottom');
      return Observable.throw('backend server error');
    }).finally(() => {
      this.stopLoader();
    });
  }

  catchRequest(observable) {
    return ([]);
    // let errors:any;
    // try {
    //     errors = error.json();
    // } catch (e) {
    //     console.log('internal server eerrros');
    //     return ([]);
    // }

    // // console.log(errors);

    // if(errors && errors.error == 'token_not_provided' ){
    //     this.toastMessage('Token Expired Relogin', 'danger', 'bottom');
    //       return ([]);
    // }

    // if(error.status== 400 && errors && errors.validation_errors){
    //     for (var key in errors.validation_errors) {
    //         if (errors.validation_errors.hasOwnProperty(key)) {
    //              this.toastMessage(errors.validation_errors[key][0], 'danger', 'bottom');
    //         }
    //     }
    //     return ([]);
    // }


    //  if (error.status == 401 && errors && errors.message) {
    //       this.toastMessage(errors.message, 'danger', 'bottom');
    //     return ([]);
    // }


    // if (error.status == 422) {
    //     for (var key in errors) {
    //         if (errors.hasOwnProperty(key)) {
    //             this.toastMessage(errors[key], 'danger', 'bottom');
    //         }
    //     }
    //      console.log('2');
    //   return ([]);
    // }


    // if (error.status == 404 && errors && errors.message) {
    //     this.toastMessage(errors.message, 'danger', 'bottom');
    //     console.log('3');
    //     return ([]);
    // }

    // if (errors && (errors.error == 'token_expired' || errors.error == 'token_not_provided' ||
    //     errors.error == 'token_not_provided' || errors.error == 'token_invalid')
    // ) {
    //     this.removeAuthData();
    //     this.loginMessage();
    //     console.log('5');
    //     return ([]);
    // }
    // else if ((error.status == 400 && !errors.status && errors.message) || (error.status == 400 && errors.status && errors.message)) {

    //     this.toastMessage(errors.message, 'warning');
    //     console.log('6');
    //     return ([]);
    // } else if (error.status == 401 && errors && errors.error == 'invalid_credentials') {

    //     this.toastMessage('Invalid Credentials', 'warning');
    //     this.removeAuthData();
    //     console.log('7');
    //     return ([]);
    // }
    // else{
    //     console.log('8');
    //      return ([]);
    // }


  };

  mapRes(res: Response): any {
    return (res.json());
  };

  setOption() {
    let token = this.getToken();
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    let options = new RequestOptions({headers: headers});
    this.options = options;
  }

  getOption() {
    let token = this.getToken() || null;
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    let options = new RequestOptions({headers: headers});
    return options;
  }

  isLoggedIn() {
    if (this.getToken()) {
      return true;
    }
    else {
      return false;
    }
  }

  removeAuthData() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  }

  logout() {
    this.removeAuthData();
  }

  httpErrorHandler(error: Response) {
    let errors: any;
    try {
      errors = error.json();
    } catch (e) {
      console.log('internal server eerrros');
    }

    if (error.status == 400 && errors && errors.validation_errors) {
      for (var key in errors.validation_errors) {
        if (errors.validation_errors.hasOwnProperty(key)) {
          console.log('errors.validation_errors[key]', errors.validation_errors[key][0]);
          // this.toastMessage(errors.validation_errors[key], 'danger', 'bottom');
        }
      }
    }

    if (error.status == 422) {
      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          this.toastMessage(errors[key], 'danger', 'bottom');
        }
      }
      return false;
    }
    if (error.status == 404 && errors && errors.message) {
      return false;
    }

    if (errors && (errors.error == 'token_expired' || errors.error == 'token_not_provided' ||
      errors.error == 'token_not_provided' || errors.error == 'token_invalid')
    ) {
      this.removeAuthData();
      this.loginMessage();
      // this.navCtrl.push(HomePage);
    }
    else if ((error.status == 400 && !errors.status && errors.message) || (error.status == 400 && errors.status && errors.message)) {

      this.toastMessage(errors.message, 'warning');
    } else if (error.status == 401 && errors && errors.error == 'invalid_credentials') {

      this.toastMessage('Invalid Credentials', 'warning');
      this.removeAuthData();
    }
  }

  loginMessage() {
    let toast = this.toastCtrl.create({
      message: 'UnAuthorised!',
      duration: 3000,
      cssClass: 'warning',
      position: 'top',
    });
    toast.present();
  }

  toastMessage(message, cls, position = 'top') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: false,
      dismissOnPageChange: false,
      cssClass: cls,
      position: position,
    });
    toast.present();
  }

  getAuthHeader() {
    let token = this.getToken();
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});

    return headers;

  }

  postAuthHeader() {
    let headers = new Headers({'Content-Type': 'application/json', 'Authorization': this.getToken()});
    return headers;
  }

  getToken() {
    return window.localStorage.getItem('token') || null;
  }

  getUser() {
    let u: any = window.localStorage.getItem('user') || [];
    return JSON.parse(u);
  }

  getUserName() {
    let user = this.getUser();
    if (user.name) {
      return user.name;
    }
    return 'Guest';
  }

  getSelectedCompany() {
    let c: any = window.localStorage.getItem('currentCompany') || [];
    return JSON.parse(c);
  }

  setUser(user) {
    return window.localStorage.setItem('user', JSON.stringify(user));
  }

  getCompanies() {
    return this.http.get(this.companies, this.getOption()).map((res) => {
      let response = res.json();
      if (response.code == 200) {
        window.localStorage.setItem('companies', JSON.stringify(response.data));
        //finding Default Company
        response.data.map((res) => {
          if (res.is_default == true) {
            window.localStorage.setItem('currentCompany', JSON.stringify(res));
            window.localStorage.setItem('company_id', res.id);
          }
        });
        return response.data;
      }
    });
  }


  setCompanyId(id) {
    window.localStorage.setItem('company_id', id);
  }

  getCompanyId() {
    let company_id = parseInt(window.localStorage.getItem('company_id'));

    if (company_id) {
      return company_id;
    }
    return 0;

  }

  getUrlWithCompany(url: string) {
    return `${url}?company_id=${this.getCompanyId()}`;
  }

  getCurrentCompanyName() {
    let company = this.getSelectedCompany();
    if (company && company.name) {
      return company.name;
    }
    return '_';
  }

  getCurrentPrefix() {

  }

}
