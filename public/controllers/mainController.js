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