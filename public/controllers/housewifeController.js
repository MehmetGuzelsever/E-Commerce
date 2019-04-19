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
.controller('logHouseController', function($location, Auth) {
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
                Auth.getLoginReq('/api/housewife/login', app.loginData)
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

//Update Controller
.controller('updateHousewifeController', function($location,  Auth, UpdateHousewife) {
    var app = this;
    app.err = false;
    app.suc = false;
    app.ils = ["İstanbul", "Ankara", "İzmir"];
    app.ilcen = function(il) {
        if (il == "İzmir") {
            app.ilces = ["Bornova", "Buca", "Konak", "Tire"];
        }
        else if (il == "İstanbul") {
            app.ilces = ["Kadıköy", "Pendik", "Üsküdar", "Kartal"];
        }
        else if (il == "Ankara") {
            app.ilces = ["Çankaya", "Keçiören", "Yenimahalle", "Mamak"];
        }
    }
    if(Auth.isLoggedIn()) {
        Auth.getUser()
        .then(function(data) {
            app.showregpage = false;
            app.email = data.data.email;
            app.name = data.data.name;
            app.surname = data.data.surname;
            app.il = data.data.il;
            app.ilce = data.data.ilce;   
            app.adres = data.data.adres;         
        })
    }

    app.update = function() {
        if (app.updateData.name == null) {
            app.updateData.name = app.name;
        }
        if (app.updateData.surname  == null) {
            app.updateData.surname = app.surname;
        }
        if (app.updateData.il == null) {
            app.updateData.il = app.il;
        }
        if (app.updateData.ilce == null) {
            app.updateData.ilce = app.ilce;
        }
        if (app.updateData.adres == null) {
            app.updateData.adres = app.adres;
        }        
        app.updateData.email = app.email;
        UpdateHousewife.update('/api/housewife/update', app.updateData)
        .then(function(info) {
            if(info.data.success == false) {
                app.err = true;
                app.errorMsg = info.data.msg;
            }
            else {
                app.suc = true;
                app.SuccessMsg = info.data.msg;
            }
        })                 
    }

})