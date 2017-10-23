import {Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {LoadingController,Loading} from 'ionic-angular';

export interface LoaderState {
    show: boolean;
}


@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<LoaderState>();
    loaderState = this.loaderSubject.asObservable();


    loader:Loading;

    constructor(public loading : LoadingController) {
        
    //  this.loaderSubject.next(<LoaderState>{show: status});
    
    }

    createLoader(content:string='wait a moment...'){
        this.loader = this.loading.create({
            content: content,
        });
        this.loader.present();
    }

    stopLoader(){
        if(this.loader){
            this.loader.present().then(() => {
                this.loader.dismiss();
            });
        }
    }

    setState(status:boolean){

        if(status){
            this.createLoader();
        }else{
            this.stopLoader();

        }

        this.loaderSubject.next(<LoaderState>{show: status});
    }

}