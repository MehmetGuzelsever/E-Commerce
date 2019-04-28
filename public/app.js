angular.module('app', ['appRoutes', 'mainController', 'userController', 'housewifeController', 'mainService', 'userService', 'housewifeService', 'adminController'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
})