var DefaultPageComponent = (function () {
    function DefaultPageComponent(navCtrl, navParams, loginCheck, menuService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loginCheck = loginCheck;
        this.menuService = menuService;
        this.events = events;
        this.current_company_name = '_';
        this.company_prefix = '_';
        this.defaultCompanies = [];
        this.default_company_id = null;
        this.defaultCompanies = this.loginCheck.getCompanies();
        this.onChangeCompanyRefresh();
        this.events.subscribe('company:change', function () {
            _this.onChangeCompanyRefresh();
        });
    }
    //  changeCompany(event){
    //     this.loginCheck.setCompanyId(this.default_company_id);
    //      let temp = this.defaultCompanies;
    //       let c = temp.filter((item) => {
    //         if(item.id == this.default_company_id) return item;
    //       });
    //     window.localStorage.setItem('currentCompany',JSON.stringify(c[0]));
    //     this.events.publish('company:change');
    // }
    DefaultPageComponent.prototype.onChangeCompanyRefresh = function () {
        this.current_company_name = this.loginCheck.getCurrentCompanyName();
        this.default_company_id = this.loginCheck.getCompanyId();
        this.companyPrefix();
    };
    DefaultPageComponent.prototype.companyPrefix = function () {
        var prefix = this.loginCheck.getCurrentCompanyName();
        var strArr = prefix.split(" ");
        console.log(strArr);
        var new_prefix = "";
        strArr.map(function (item) {
            new_prefix += item.charAt(0).toUpperCase();
            return item;
        });
        this.company_prefix = new_prefix;
    };
    DefaultPageComponent.prototype.localProfile = function () {
        return this.loginCheck.getUser();
    };
    DefaultPageComponent.prototype.redirect = function (name, params, isRoot) {
        if (params === void 0) { params = {}; }
        if (isRoot === void 0) { isRoot = false; }
        if (isRoot) {
            this.navCtrl.setRoot(name, params);
        }
        else {
            this.navCtrl.push(name, params);
        }
    };
    return DefaultPageComponent;
}());
export { DefaultPageComponent };
//# sourceMappingURL=base-page.js.map