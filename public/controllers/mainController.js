angular.module('mainController', [])
//Main Controller
.controller('mainCntr', function($location, $timeout, Auth) {
    var app = this;
    if(Auth.isLoggedIn()) {
        console.log("Success:Kullanıci Giriş Yapmış.");
    }
    else {
        console.log("Failure:Kullanıcı Giriş Yapmadı.");
    }
    app.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function() {
            $location.path('/');
        },2000);
    }
})