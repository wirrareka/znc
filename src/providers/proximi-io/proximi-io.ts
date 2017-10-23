import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs';


import * as constants from '../../config/config';

class ServerResponse {
    constructor(public resource: any) {
    }
};

@Injectable()
export class ProximiIoProvider {


  constructor(public http: Http) {
    console.log('Hello ProximiIoProvider Provider');
  }

   proximiLogin(){
     let formData = constants.PROXIMIO_CREDENTIAL;
     let headers = new Headers({
            'Content-Type': 'application/json'
     });
     let options = new RequestOptions({headers: headers});
     return this.http.post(`${constants.PROXIMIIO_API_URL}/core_auth/login`, formData, options).map((response) => {
             let result: ServerResponse = response.json();
             return result;
          });
   }

   getGeofence(token,id){
     let headers = new Headers({
         'Content-Type': 'application/json',
         'Authorization' : 'Bearer ' + token
     });
     let options = new RequestOptions({headers: headers});
     return this.http.get(`${constants.PROXIMIIO_API_URL}/core/geofences/${id}`, options).map((response) => {
         let result: ServerResponse = response.json();
         return result;
     });
   }

   getPlace(token,id){
     let headers = new Headers({
         'Content-Type': 'application/json',
         'Authorization' : 'Bearer ' + token
     });
     let options = new RequestOptions({headers: headers});
     return this.http.get(`${constants.PROXIMIIO_API_URL}/core/places/${id}`, options).map((response) => {
          let result: ServerResponse = response.json();
          return result;
      });
   }

   getDepartment(token,id){
     let headers = new Headers({
         'Content-Type': 'application/json',
         'Authorization' : 'Bearer ' + token
     });
     let options = new RequestOptions({headers: headers});
     return this.http.get(`${constants.PROXIMIIO_API_URL}/core/inputs/${id}`, options).map((response) => {
        let result: ServerResponse = response.json();
        return result;
     });
   }

   getDataByGeofenceInOut(token , ids:any){
       let requests = [
           this.getGeofence(token, ids.geofence_id)
       ];
       // let requests = [
       //     this.getGeofence(token, ids.geofence_id),
       //     this.getDepartment(token, ids.department_id),
       //     this.getPlace(token, ids.place_id)
       // ];
      return Observable.forkJoin(requests);
   }

}
