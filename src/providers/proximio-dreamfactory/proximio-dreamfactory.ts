import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

class ServerResponse {
    constructor(public resource: any) {
    }
}
;

import * as constants from '../../config/config';

/*
 Generated class for the ProximioDreamfactoryProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ProximioDreamfactoryProvider {

    constructor(public http: Http) {

    }

    setVisitor(visitor){
       window.localStorage.setItem('visitor',JSON.stringify(visitor));
    }

    getVisitor(){
          let strVisitor = window.localStorage.getItem('visitor') || JSON.stringify('false');
          let actual = JSON.parse(strVisitor);
          if (actual){
              return actual;
          }
          return null;
      }

    postRequest(url: string, formData: any) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'X-Dreamfactory-API-Key': constants.DREAMFACTORY_API_KEY
        });
        let token = null;
        if (token) {
            headers.set('X-Dreamfactory-Session-Token', token);
        }
        let options = new RequestOptions({headers: headers});
        return this.http.post(`${constants.DREAMFACTORY_INSTANCE_URL}/api/v2${url}`, formData, options);
    }

    getRequest(url: string, params: URLSearchParams = null) {
        let queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/json');
        let token = window.localStorage.getItem('session_token') || null;
        if (token) {
           queryHeaders.set('X-Dreamfactory-Session-Token', token);
        }

        queryHeaders.append('X-DreamFactory-Api-Key', constants.DREAMFACTORY_API_KEY);

        params.set('api_key', constants.DREAMFACTORY_API_KEY);
        return this.http.get(`${constants.DREAMFACTORY_INSTANCE_URL}/api/v2${url}`, {
            search: params,
            headers: queryHeaders
        }).map((response) => {
            let result: ServerResponse = response.json();
            return result;
        });
    }

    getVisitorById(id) {
        let params = new URLSearchParams();
        params.set('filter', 'id=' + id);
        return this.getRequest('/app/_table/visitor', params);
    }

    saveVisitor(formData) {
        return this.postRequest('/app/_table/visitor', formData);
    }

    saveRawEventProximiData(formData) {
        return this.postRequest('/app/_table/raw_event_proximi_wot', formData);
    }

    getVisitorByUuid(id) {
        let params = new URLSearchParams();
        params.set('filter', 'uuid=' + id);
        return this.getRequest('/app/_table/visitor', params);
    }

    sendEmail(data){
        return this.postRequest('/email?api_key='+constants.DREAMFACTORY_API_KEY, data);
    }

    getDreamFactorySessionToken(){
        return this.postRequest('/user/session', { "email" : "dev001.weboccult@gmail.com", "password" : "123456" });
    }

}
