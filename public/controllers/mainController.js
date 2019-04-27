angular.module('mainController', [])
//Main Controller
.controller('mainCntr', function($location, $timeout, $rootScope, Auth) {
    var app = this;
    app.showregpage = true;
    app.permission = null;
    $rootScope.$on('$routeChangeStart', function() {
        if(Auth.isLoggedIn()) {
            console.log("Success:Kullanıci Giriş Yapmış.");
            Auth.getUser()
            .then(function(data) {
                console.log(data)
                app.username = data.data.email;
            })
        }
        else {
            console.log("Failure:Kullanıcı Giriş Yapmadı.");
            app.username = "";
        }
    })

    app.updateUser = function(){
        $location.path("/user/update")
    }

    app.updateHousewife = function(){
        $location.path("/housewife/update")
    }

    app.activeUserType = function() {
        Auth.getUser()
        .then(function(data) {
            app.adres = data.data.adres;          
        })
        if (app.adres != null) {
            $location.path('/user/profile');
        }        
        else {
            $location.path('/housewife/profile');
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
            app.permission = data.data.permission;         
        })
    }
    else {
        app.showregpage = true;
    }    
    app.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        },2000);
    }

    app.isLogin = function() {
        if (Auth.isLoggedIn()) {
            return true;
        }
        else {
            return false;
        }
    } 
    app.isPermission = function() {
        if (Auth.isLoggedIn()) {
            return app.permission;
        }
        else {
            return false;
        }
    }     
})