angular.module('adminController', [])

//Login Controller
.controller('adminLogController', function($location,  Auth) {
    var app = this;
    app.infoMessage = false;
    app.errMsg = false;
    app.sucMsg = false;
    app.loginAdmin = function() {
        app.loading = true;
        if (app.loginData.email == null || app.loginData.password == null) {
                app.infoMessage = true;
                app.loading = false;
            }
            else {
                Auth.getLoginReq('/api/admin/login', app.loginData)
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

.controller('addCategoryController', function($location, Request) {
    var app = this;
    app.errorMsg = false;
    app.successMsg = false;
    app.addCategory = function() {
        app.loading = true;
        Request.request('/api/admin/category/adding',app.categoryData)
        .then(function(data) {
            if (data.data.success == false) {
                app.errorMsg = true;
                app.msg = data.data.msg;
                app.loading = false;
            }
            else{
                app.loading = false;
                app.successMsg = true;
                app.msg = data.data.msg;
                $location.path('/'); 
            }
        })
    }
})

//Category Update Controller
.controller('updateCategoryController', function($location, Request) {
    var app = this;
    app.loading = false;
    app.errMsg = false;
    app.sucMsg = false;
    Request.request('/api/category/get')
    .then(function(data) {
        var asd = data.data.data;
        app.list = asd;
    })
    
    
    app.update = function() {
        app.loading = true;
        app.errMsg = false;
        app.sucMsg = false;
        if (!app.categoryData.adi) {
            app.loading = false;
            app.errMsg = true;
            app.error = "Lütfen Kategori Seçiniz."
        }
        else if (!app.categoryData.newcategory_adi) {
            app.loading = false;
            app.errMsg = true;
            app.error = "Lütfen Yeni Kategori Adını Giriniz."
        }
        else {
            app.categoryData.category_adi = app.categoryData.adi.category_adi;
            Request.request('/api/admin/category/update', app.categoryData)
            .then(function(data) {
                if (data.data.success == false) {
                    app.loading = false;
                    app.errMsg = true;
                    app.error = data.data.msg;
                }
                else {
                    app.loading = false;
                    app.successMsg = true;
                    app.success = data.data.msg;
                    $location.path('/');
                }
            })
        }
    }
})

//Category Delete Controller
.controller('deleteCategoryController', function($location, Request) {
    var app = this;
    app.loading = false;
    app.errMsg = false;
    app.sucMsg = false;
    Request.request('/api/category/get')
    .then(function(data) {
        var asd = data.data.data;
        app.list = asd;
    })
    
    
    app.delete = function() {
        app.loading = true;
        app.errMsg = false;
        app.sucMsg = false;
        if (!app.categoryData.adi) {
            app.loading = false;
            app.errMsg = true;
            app.error = "Lütfen Kategori Seçiniz."
        }
        else {
            app.categoryData.category_adi = app.categoryData.adi.category_adi;
            Request.request('/api/admin/category/delete', app.categoryData)
            .then(function(data) {
                if (data.data.success == false) {
                    app.loading = false;
                    app.errMsg = true;
                    app.error = data.data.msg;
                }
                else {
                    app.loading = false;
                    app.successMsg = true;
                    app.success = data.data.msg;
                    $location.path('/');
                }
            })
        }
    }
})

//Admin Manegement Controller
.controller('manegementController', function($location) {
    var app = this;

    app.add = function() {
        $location.path('/admin/category/add');
    }

    app.update = function() {
        $location.path('/admin/category/update');
    }

    app.delete = function() {
        $location.path('/admin/category/delete');
    }
})

//Admin Complated Orders Controller
.controller('complatedOrdersController', function(Request) {
    var app = this;  
    Request.request('/api/admin/order/complated')
    .then(function(data) {
        app.foods = JSON.stringify(data.data.data)
        app.list = JSON.parse(app.foods)
    })
})