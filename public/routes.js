angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
        templateUrl: '/views/pages/home.html'
    })

    .when('/housewife', {
        templateUrl: '/views/pages/housewife.html'
    })
    
    .otherwise({ redirectTo: '/' });

    $locationProvider

    .html5Mode({
        enabled: true,
        requireBase: false
    })

    .hashPrefix("");   
});