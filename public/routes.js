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

    .when('/user/profile', {
        templateUrl: '/views/pages/users/profile.html',
    })

    .when('/user/update', {
        templateUrl: '/views/pages/users/update.html',
        controller:  'updateController',
        controllerAs: 'update'                
    })

    .when('/housewife/register', {
        templateUrl: '/views/pages/housewifes/register.html',
        controller:  'regHouseController',
        controllerAs: 'register'
    })

    .when('/housewife/login', {
        templateUrl: '/views/pages/housewifes/login.html',
        controller:  'logHouseController',
        controllerAs: 'login'
    })

    .when('/logout', {
        templateUrl: '/views/pages/users/logout.html'
    })
    
    .otherwise({ redirectTo: '/' });

    $locationProvider

    .html5Mode({
        enabled: true,
        requireBase: false
    })

    .hashPrefix("");   
});