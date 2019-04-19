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

.factory('Update', function($http, $q, AuthToken) {
    var Services = {
        update:    update
    };
    
    return Services;

    function update(url, data) {
        return $http.post(url, data)
    }
})
