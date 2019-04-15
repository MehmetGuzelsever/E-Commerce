angular.module('userService', [])

.factory('User', function($http) {
    var Services = {
        getRegisterReq  : getRegisterReq
    };

    return Services;

    function getRegisterReq(url, regData) {
        return $http.post(url, regData);
    }
})

.factory('Auth', function($http, AuthToken) {
    var Services = {
        getLoginReq  : getLoginReq,
        isLoggedIn   : isLoggedIn,
        logout       : logout
    };

    return Services;

    function getLoginReq(url, loginData) {
        return $http.post(url, loginData)
        .then(function(data) {
            AuthToken.setToken(data.data.token);
            return data;
        })
    }


    //isLoggedIn()
    function isLoggedIn() {
        if(AuthToken.getToken()) {
            return true;
        }
        else {
            return false;
        }
    }

    //Logout()
    function logout() {
        AuthToken.setToken();
    }
})

.factory('AuthToken', function($window) {
    var Services = {
        setToken  : setToken,
        getToken  : getToken
    };

    return Services;

    //setToken
    function setToken(token) {
        if(token) {
            $window.localStorage.setItem('token', token);
        }
        else {
            $window.localStorage.removeItem('token');
        }
    }

    //getToken
    function getToken() {
        return $window.localStorage.getItem('token');
    }
})
