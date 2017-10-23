import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams , Events} from 'ionic-angular';
import { LoginCheck } from '../../services/login-check';
import { MenuService } from '../../services/menu-service';

import * as constants from '../../config/config';
import {UniqueDeviceID} from '@ionic-native/unique-device-id';

import {ProximioDreamfactoryProvider} from '../../providers/proximio-dreamfactory/proximio-dreamfactory';
import {ProximiIoProvider} from '../../providers/proximi-io/proximi-io';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';


import {DefaultPageComponent} from '../base-page';
import {Platform} from 'ionic-angular';

declare var proximiio: any;

@IonicPage()
@Component({
    selector: 'page-proximi-demo',
    templateUrl: 'proximi-demo.html',
    providers : [ProximioDreamfactoryProvider,AuthServiceProvider,ProximiIoProvider,LoginCheck]
})
export class ProximiDemo extends DefaultPageComponent{
    public uuid;
    private proximiioStatus: any;
    private lastInput: any;
    private lastOutput: any;
    private lastPosition: any;
    private lastBeaconFound: any;
    private lastBeaconLost: any;
    private lastFloor: any;
    lastGeofenceTrigger:string = '';

    proximi_io_visitor_id:any=null;

    isShow : boolean = false;

    beacon_data : any = {
        major:0,
        minor:0,
        type:'ibeacon',
    };

    constructor(navCtrl: NavController, navParams: NavParams,
                loginCheck: LoginCheck, menuService: MenuService,
                events: Events,
                private uniqueDeviceID: UniqueDeviceID,
                public authServiceProvider: AuthServiceProvider,
                public proximiIoProvider: ProximiIoProvider,
                public platform: Platform,
                public proximioDreamfactory: ProximioDreamfactoryProvider) {

        super(navCtrl, navParams, loginCheck, menuService, events);

        if (window.localStorage.getItem('uuid')){
            this.uuid = window.localStorage.getItem('uuid');
        }

        if (this.loginCheck.isLoggedIn()){
            this.getDeviceId();
        }else{
            this.redirect('Signup',{},true);
        }
    }

    getDeviceId() {
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                this.uniqueDeviceID.get()
                    .then((uuid: any) => {
                        this.toast('uuid found');
                        this.uuid = uuid;
                        window.localStorage.setItem('uuid', this.uuid);
                        try {
                            this.isShow = true;
                            this.initProximiio();
                        } catch (e) {
                        }
                    })
                    .catch((error: any) => {
                    });
            }
        });
    }

    public format = (obj) => {
        if (typeof obj == "object") {
            const jsonString = JSON.stringify(obj, null, 4);
            return jsonString;
        }
        return obj + '';
    }
    public initProximiio = () => {
        if (!proximiio) {
            this.toast('init fail');
            return;
        } else {
            // alert('proximiio found!');

        }


        this.toast('initProximiio started');

        proximiio.setProximiioReadyCallback((visitor_id) => {
            this.proximi_io_visitor_id = visitor_id;
            this.toast('Ready _ for ajax - ' + visitor_id);
            this.proximiioStatus = 'Ready _ for ajax - ' + visitor_id;
        });

        proximiio.setDebugOutput(true, null, null);

        proximiio.setInputTriggerCallback((enter, geofence) => {
            this.authServiceProvider.toastMessage('setInputTriggerCallback','danger','top');
            this.lastInput = this.format(geofence);

            this.toast('setInputTriggerCallback');
        });
        proximiio.setOutputTriggerCallback((output) => {
            this.toast('setOutputTriggerCallback');
            this.lastOutput = this.format(output);
        });
        proximiio.setPositionChangeCallback((position) => {
            this.toast('setPositionChangeCallback');
            this.lastPosition = this.format(position);
        });
        proximiio.setBeaconFoundCallback((beacon) => {
            beacon.major;
            beacon.minor;
            beacon.name;
            this.lastBeaconFound = this.format(beacon);

            this.toast('beacon found');
        });
        proximiio.setBeaconLostCallback((beacon:any) => {
            this.beacon_data.minor = beacon['major'];
            this.beacon_data.major = beacon['minor'];
            this.beacon_data.type = beacon['name'];
            this.lastBeaconLost = this.format(beacon);

            this.toast('beacon lost');
        });
        proximiio.setFloorChangedCallback((floor) => {
            this.lastFloor = this.format(floor);

            this.toast('floor changed');
        });

        proximiio.setGeofenceTriggerCallback((enter:any, geofence:any) => {

            this.toast('set geofence triggered');

            let data = {
              visitor_id: this.proximi_io_visitor_id,
              enter:enter,
              address: geofence.address,
              lat: geofence.area.lat,
              lng: geofence.area.lng,
              createdAt: geofence.createdAt,
              department_id: geofence.department_id,
              id: geofence.id,
              name: geofence.name,
              organization_id: geofence.organization_id,
              place_id: geofence.place_id,
              radius: geofence.radius,
              updatedAt: geofence.updatedAt
          };
            this.lastGeofenceTrigger = 'setGeofenceTriggerCallback : ' + JSON.stringify(data);
            let status = '';
            if (enter == 1){
                status = 'enter';
            }else{
                status = 'exit';
            }

            this.toast('set geofence triggered : ' + status);

            this.proximiIoProvider.proximiLogin().subscribe((res:any) => {
                if (res && res.token){
                    // this.authServiceProvider.toastMessage('getDataByGeofenceInOut: started','danger','top');
                    window.localStorage.setItem('proximi_io_token',JSON.stringify(res.token));
                    this.proximiIoProvider.getDataByGeofenceInOut(res.token ,{
                        geofence_id : geofence.id
                    }).subscribe((results:any) => {
                        this.toast('proximio api called  ');
                        // this.authServiceProvider.toastMessage('getDataByGeofenceInOut: loaded','danger','top');
                        let geofenceData = results[0];
                        let geofence_name = geofenceData.name;
                        let department_name = geofenceData.department_name;
                        let place_name = geofenceData.place_name;
                        let formData = {
                             'resource': [
                                 {
                                     event : status,
                                     major : this.beacon_data.major,
                                     minor: this.beacon_data.minor,
                                     type: this.beacon_data.type,
                                     uuid: this.proximi_io_visitor_id,
                                     department: department_name,
                                     geofence: geofence_name,
                                     place: place_name,
                                     visitor_name: this.loginCheck.getUserName(),
                                     visitorUUID: this.uuid
                                 }
                             ]
                         };
                         this.saveRawEventProximiIoWot(formData);
                    });
                }
            });

        });
        proximiio.setToken(constants.LIVE_PROXIMIO_KEY, function success() {
            this.toast('proximiio setToken success');
        }, function failure(error) {
            this.toast('proximiio setToken failure' + error);
        });

        proximiio.handlePush(true);
    }

    saveRawEventProximiIoWot(formData){
       this.proximioDreamfactory.saveRawEventProximiData(formData).subscribe((res:any)=>{
           this.toast('event saved to dreamfactory');
           this.lastGeofenceTrigger = 'setGeofenceTriggerCallback : ' + JSON.stringify(formData) +', |  End Response : '+ JSON.stringify(res);
           this.toast('saveRawEventProximiData:'+JSON.stringify(res));
       });
    }

    toast(message){
        this.authServiceProvider.toastMessage(message,'danger','top');
    }
}
