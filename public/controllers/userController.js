angular.module('userController', [])

//User Register Controller
.controller('regController', function($location, User) {
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
            || app.regData.il == null || app.regData.ilce == null ) {
                app.infoMessage = true;
                app.loading = false;
            }
            else {
                User.getRegisterReq('/api/user/register', app.regData)
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
.controller('logController', function($location,  Auth) {
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
                Auth.getLoginReq('/api/user/login', app.loginData)
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
.controller('updateController', function($location,  Auth, Update) {
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
        app.updateData.email = app.email;
        Update.update('/api/user/update', app.updateData)
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

//User Food Listing Controller
.controller('userListFoodController', function(Request, Auth, Cart) {
    var app = this;
    app.cart = {};
    app.errMsg = false;
    app.sucMsg = false;
    app.il = ["İstanbul", "Ankara", "İzmir"];    
    app.info = {};

    
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

    Auth.getUser()
    .then(function(house) {
        app.info.il = house.data.il;
        app.info.ilce = house.data.ilce;
        app.email = house.data.email;
        Request.request('/api/user/food/listing',app.info)
        .then(function(data) {
            app.foods = JSON.stringify(data.data.data)
            app.asd = JSON.parse(app.foods);
        })            
    })
    
    Request.request('/api/category/get')
    .then(function(data) {
        var kategori = data.data.data;
        app.categoryList = kategori;
    })

    app.clean = function() {
        app.categoryFilter = null;
    }
    
    app.filtre = function() {
        app.loading = true;
        app.errMsg = false;
        app.sucMsg = false;
        if (!app.foodData.il) {
            app.errMsg = true;
            app.error = "Lütfen İl seçiniz."
            app.loading = false;
        }
        else if (!app.foodData.ilce) {
            app.errMsg = true;
            app.error = "Lütfen İlçe seçiniz."
            app.loading = false;
        }
        else {
            Request.request('/api/user/food/listing',app.foodData)
            .then(function(data) {
                app.foods = JSON.stringify(data.data.data)
                app.asd = JSON.parse(app.foods);
            })                
            app.sucMsg = true;
            app.success = "Filtre Uygulandı."
            app.loading = false;
        }
    }

    app.addCart = function(food) {
        app.cart.id = food._id;
        app.cart.adi = food.y_adi;
        app.cart.cesit = food.y_cesit;
        app.cart.fiyat = food.y_fiyat;        
        Cart.addCart(app.email, app.cart);
    }

})

//User Cart Controller
.controller('cartController', function($window, Cart, Auth) {
    var app = this;
    Auth.getUser()
    .then(function(house) {
        app.email = house.data.email;        
        app.cart = Cart.getCart(app.email);
        app.data = JSON.parse(app.cart);        
    })    
    app.list = [];
    app.index = -1;
    app.newfood = {};
    
    app.add = function(food) {
        app.newfood.id = food.id;
        app.newfood.adi = food.adi;
        app.newfood.cesit = food.cesit;
        app.newfood.fiyat = food.fiyat;
        Cart.addCart(app.email, app.newfood);
        $window.location.reload();
    }

    app.out = function(a) {
        Cart.deleteCart(a);
        $window.location.reload();
    }
    
})