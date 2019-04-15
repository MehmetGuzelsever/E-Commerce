angular.module('app', ['appRoutes', 'mainController', 'userController', 'housewifeController', 'userService', 'housewifeService'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})