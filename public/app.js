angular.module('app', ['appRoutes', 'mainController', 'userController', 'housewifeController', 'mainService', 'userService', 'housewifeService'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})