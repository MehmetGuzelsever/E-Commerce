angular.module('mainController', [])
//Main Controller
.controller('mainCntr', function($location, $timeout, $rootScope, Auth) {
    var app = this;
    app.showregpage = true;
    $rootScope.$on('$routeChangeStart', function() {
        if(Auth.isLoggedIn()) {
            console.log("Success:Kullanıci Giriş Yapmış.");
            Auth.getUser()
            .then(function(data) {
                app.username = data.data;
            })
        }
        else {
            console.log("Failure:Kullanıcı Giriş Yapmadı.");
            app.username = "";
        }
    })
    if(Auth.isLoggedIn()) {
        Auth.getUser()
        .then(function(data) {
            app.showregpage = false;            
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
})