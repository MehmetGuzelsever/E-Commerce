angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
        templateUrl: '/views/pages/home.html'
    })

    .when('/housewife', {
        templateUrl: '/views/pages/housewife.html'
    })

    .when('/user/register', {
        templateUrl: '/views/pages/users/register.html',
        controller: 'regController',
        controllerAs: 'register'
    })

    .when('/user/login', {
        templateUrl: '/views/pages/users/login.html',
        controller:  'logController',
        controllerAs: 'login'
    })

    .when('/housewife/register', {
        templateUrl: '/views/pages/housewifes/register.html',
        controller:  'regHouseController',
        controllerAs: 'register'
    })
    
    .otherwise({ redirectTo: '/' });

    $locationProvider

    .html5Mode({
        enabled: true,
        requireBase: false
    })

    .hashPrefix("");   
});