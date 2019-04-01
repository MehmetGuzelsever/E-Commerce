angular.module('housewifeController', [])

//Register Controller
.controller('regHouseController', function($location, House) {
    var app = this;
    app.il = ["İstanbul", "Ankara", "İzmir"];
    app.infoMessage = false;
    app.errMsg = false;
    app.sucMsg = false;
    app.ilce = function(il) {
        if (il == "İzmir") {
            app.ilceler = ["Bornova", "Buca", "Konak", "Tire"];
        }
        else if (il == "İstanbul") {
            app.ilceler = ["Kadıköy", "Pendik", "Üsküdar", "Kartal"];
        }
        else if (il == "Ankara") {
            app.ilceler = ["Çankaya", "Keçiören", "Yenimahalle", "Mamak"];
        }
    }
    app.regUser = function() {
        app.loading = true;
        console.log(app.regData)
        if (app.regData.email == null || app.regData.adi == null || app.regData.soyadi == null || app.regData.password == null
            || app.regData.il == null || app.regData.ilce == null || app.regData.adres == null ) {
                app.infoMessage = true;
                app.loading = false;
            }
            else {
                House.getRegisterReq('/api/housewife/register', app.regData)
                .then(function(info) {
                    if (info.data.success == false) {
                        app.errMsg = true;
                        app.error = info.data.msg;
                        app.loading = false;
                    }
                    else {
                        app.sucMsg = true;
                        app.success = info.data.msg;
                        app.loading = false;
                        $location.path('/') 
                    }
                })
            }
    }
})

//Login Controller
.controller('logHouseController', function($location, AuthHouse) {
    var app = this;
    app.infoMessage = false;
    app.errMsg = false;
    app.sucMsg = false;
    app.loginUser = function() {
        if (app.loginData.email == null || app.loginData.password == null) {
                app.infoMessage = true;
                app.loading = false;
            }
            else {
                AuthHouse.getLoginReq('/api/housewife/login', app.loginData)
                .then(function(info) {
                    if (info.data.success == false) {
                        app.errMsg = true;
                        app.error = info.data.msg;
                        app.loading = false;
                    }
                    else {
                        app.loading = false;
                        app.sucMsg = true;
                        app.success = info.data.msg;
                        $location.path('/');  
                    }
                })
            }        
    }    
})