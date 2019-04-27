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