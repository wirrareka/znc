var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { LoadingController } from 'ionic-angular';
var LoaderService = (function () {
    function LoaderService(loading) {
        //  this.loaderSubject.next(<LoaderState>{show: status});
        this.loading = loading;
        this.loaderSubject = new Subject();
        this.loaderState = this.loaderSubject.asObservable();
    }
    LoaderService.prototype.createLoader = function (content) {
        if (content === void 0) { content = 'wait a moment...'; }
        this.loader = this.loading.create({
            content: content,
        });
        this.loader.present();
    };
    LoaderService.prototype.stopLoader = function () {
        var _this = this;
        if (this.loader) {
            this.loader.present().then(function () {
                _this.loader.dismiss();
            });
        }
    };
    LoaderService.prototype.setState = function (status) {
        if (status) {
            this.createLoader();
        }
        else {
            this.stopLoader();
        }
        this.loaderSubject.next({ show: status });
    };
    return LoaderService;
}());
LoaderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoadingController])
], LoaderService);
export { LoaderService };
//# sourceMappingURL=loader-service.js.map