import {BaseRequestOptions} from '@angular/http';
import * as constants from './config';


export class DfRequestOptions extends BaseRequestOptions {

    constructor() {
        super();
        this.headers.set('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);
        let token = localStorage.getItem('session_token');
        if (token) {
            this.headers.set('X-Dreamfactory-Session-Token', token);
        }
    }
}