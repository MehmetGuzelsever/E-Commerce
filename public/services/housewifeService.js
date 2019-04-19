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

.factory('UpdateHousewife', function($http) {
    var Services = {
        update:    update
    };
    
    return Services;

    function update(url, data) {
        return $http.post(url, data)
    }
})