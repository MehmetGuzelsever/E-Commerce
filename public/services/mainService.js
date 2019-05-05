angular.module('mainService', [])

.factory('Auth', function($http, $q, AuthToken) {
    var Services = {
        getLoginReq  : getLoginReq,
        isLoggedIn   : isLoggedIn,
        logout       : logout,
        getUser      : getUser
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

    //getUser()
    function getUser() {
        if(AuthToken.getToken()) {
            return $http.post('/api/me');
        }
        else {
            $q.reject({ message: "Token Bulunamadı." });
        }
    }

    //Logout()
    function logout() {
        AuthToken.setToken();
    }
})

.factory('Request', function($http, $q, AuthToken) {
    var Services = {
        request  : request,
    };

    return Services;

    function request(url, data) {
        return $http.post(url, data)
        .then(function(data) {
            return data;
        })
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

.factory('AuthInterceptors', function(AuthToken) {
    var Services = {
        request:    request
    };
    
    return Services;

    function request(config) {
        var token = AuthToken.getToken();

        if (token) config.headers['x-access-token'] = token;

        return config;
    }
})

.factory('activeUserType', function(Auth) {
    var Services = {
        active:    active
    };
    
    return Services; 
    
    function active() {
        Auth.getUser()
        .then(function(data) {
            if (data.data.adres) {
                return "housewife";
            }
            else if (!data.data.adres) {
                return "user";
            }
        })
    }
})

.factory('Cart', function($window) {
    var Services = {
        addCart   : addCart,
        getCart   : getCart,
        deleteCart: deleteCart
    };

    return Services;

    //setToken
    function addCart(name,food) {
        var oldFoods = JSON.parse(localStorage.getItem(name)) || [];
        if(food) {
            oldFoods.push(food);
            $window.localStorage.setItem(name, JSON.stringify(oldFoods));
        }
        else {
            $window.localStorage.removeItem(name);
        }
    }

    function deleteCart(food) {
        var oldFoods = JSON.parse(localStorage.getItem(name)) || [];
        oldFoods.splice(food,1);
        $window.localStorage.setItem(name, JSON.stringify(oldFoods));
    }

    //getToken
    function getCart(name) {
        return $window.localStorage.getItem(name);
    }
})