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

//add Food Controller
.controller('addFoodController', function($location, Request, Auth) {
    var app = this;
    app.errMsg = false;
    app.successMsg = false;
    Auth.getUser()
    .then(function(data) {
        app.email = data.data.email;
        app.name = data.data.name;
        app.surname = data.data.surname;
        app.il = data.data.il;
        app.ilce = data.data.ilce;   
        app.adres = data.data.adres;         
    })    
    Request.request('/api/category/get')
    .then(function(data) {
        var asd = data.data.data;
        app.list = asd;
    })
    app.addFood = function() {
        app.loading = true;
        app.foodData.email = app.email;
        app.foodData.il = app.il;
        app.foodData.ilce = app.ilce;
        app.foodData.cesit = app.foodData.cesit.category_adi;
        Request.request('/api/housewife/food/adding',app.foodData)
        .then(function(data) {
            if (data.data.success == false) {
                app.loading = false;
                app.errMsg = true;
                app.msg = data.data.msg;
            }
            else {
                app.loading = false;
                app.successMsg = true;
                app.msg = data.data.msg;
                $location.path('/');
            }
        })                                                        
    }
})

//Listing Food Controller
.controller('listFoodController', function($location, Request, Auth) {
    var app = this;
    app.info = {};
    Auth.getUser()
    .then(function(house) {
        app.email = house.data.email;
        app.info.email = app.email;
        Request.request('/api/housewife/food/listing',app.info)
        .then(function(data) {
            app.foods = JSON.stringify(data.data.data)
            app.asd = JSON.parse(app.foods);
        })                     
    })
})

//Updating Food Controller
.controller('updateFoodController', function($location, Request, Auth) {
    var app = this;
    app.errMsg = false;
    app.successMsg = false;      
    app.info = {};
    Auth.getUser()
    .then(function(house) {
        app.email = house.data.email;
        app.info.email = app.email;
        Request.request('/api/housewife/food/listing',app.info)
        .then(function(data) {
            app.foods = JSON.stringify(data.data.data)
            app.asd = JSON.parse(app.foods);
        })                     
    })
    
    app.one = function() {
        var one = {};
        one.email = app.email;
        one.adi = app.foodData.adi;
        Request.request('/api/housewife/food/one',one)
        .then(function(data) {
            var info = data.data.data;
            app.id = info[0]._id;
            app.fiyat = info[0].y_fiyat;
            app.acikalama = info[0].y_aciklama;
        })        
    }

    app.update = function() {
        app.foodData.id = app.id;
        if (!app.foodData.fiyat) {
            app.foodData.fiyat = app.fiyat;
        }
        else if (!app.foodData.aciklama) {
            app.foodData.aciklama = app.acikalama;
        }
        else {
            Request.request('/api/housewife/food/update', app.foodData)
            .then(function(data) {
                if (data.data.success == false) {
                    app.errMsg = true;
                    app.error = data.data.msg;
                }
                else {
                    app.sucMsg = true;
                    app.success = data.data.msg;
                    $location.path('/housewife/myfoods');
                }                
            })
        }
    }
})

//Deleting Food Controller
.controller('deleteFoodController', function($location, Request, Auth) {
    var app = this;
    app.errMsg = false;
    app.successMsg = false;    
    app.info = {};
    app.deleted = {};
    Auth.getUser()
    .then(function(house) {
        app.email = house.data.email;
        app.info.email = app.email;
        Request.request('/api/housewife/food/listing',app.info)
        .then(function(data) {
            app.foods = JSON.stringify(data.data.data)
            app.asd = JSON.parse(app.foods);
        })                     
    })
    
    app.one = function() {
        var one = {};
        one.email = app.email;
        one.adi = app.foodData.adi;
        Request.request('/api/housewife/food/one',one)
        .then(function(data) {
            var info = data.data.data;
            app.id = info[0]._id;
            app.acikalama = info[0].y_aciklama;
        })        
    }

    app.delete = function() {
        app.deleted.email = app.email;
        app.deleted.id = app.id;
        Request.request('/api/housewife/food/delete', app.deleted)
        .then(function(data) {
            if (data.data.success == false) {
                app.errMsg = true;
                app.error = data.data.msg;
            }
            else {
                app.sucMsg = true;
                app.success = data.data.msg;
                $location.path('/');
            }
        })
    }

})