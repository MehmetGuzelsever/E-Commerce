angular.module('housewifeService', [])

.factory('House', function($http) {
    var Services = {
        getRegisterReq  : getRegisterReq
    };

    return Services;

    function getRegisterReq(url, regData) {
        return $http.post(url, regData);
    }
})

.factory('AuthHouse', function($http) {
    var Services = {
        getLoginReq  : getLoginReq
    };

    return Services;

    function getLoginReq(url, loginData) {
        return $http.post(url, loginData);
    }
})