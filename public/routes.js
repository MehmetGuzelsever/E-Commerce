var app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    $routeProvider

    .when('/', {
        templateUrl: '/views/pages/home.html'
    })

    .when('/housewife', {
        templateUrl: '/views/pages/housewife.html',
        authenticated: false
    })

    .when('/user/register', {
        templateUrl: '/views/pages/users/register.html',
        controller: 'regController',
        controllerAs: 'register',
        authenticated: false
    })

    .when('/user/login', {
        templateUrl: '/views/pages/users/login.html',
        controller:  'logController',
        controllerAs: 'login',
        authenticated: false
    })

    .when('/user/profile', {
        templateUrl: '/views/pages/users/profile.html',
        authenticated: true
    })

    .when('/user/update', {
        templateUrl: '/views/pages/users/update.html',
        controller:  'updateController',
        controllerAs: 'update',
        authenticated: true                
    })

    .when('/housewife/register', {
        templateUrl: '/views/pages/housewifes/register.html',
        controller:  'regHouseController',
        controllerAs: 'register',
        authenticated: false
    })

    .when('/housewife/login', {
        templateUrl: '/views/pages/housewifes/login.html',
        controller:  'logHouseController',
        controllerAs: 'login',
        authenticated: false
    })

    .when('/housewife/profile', {
        templateUrl: '/views/pages/housewifes/profile.html',
        authenticated: true
    })

    
    .when('/housewife/update', {
        templateUrl: '/views/pages/housewifes/update.html',
        controller:  'updateHousewifeController',
        controllerAs: 'update', 
        authenticated: true               
    })

    .when('/logout', {
        templateUrl: '/views/pages/users/logout.html',
        authenticated: true
    })
    
    .otherwise({ redirectTo: '/' });

    $locationProvider

    .html5Mode({
        enabled: true,
        requireBase: false
    })

    .hashPrefix("");   
});

app.run(['$rootScope', 'Auth', 'activeUserType', '$location', function($rootScope, Auth, activeUserType, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.$$route.authenticated == true) {
            if (!Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path('/');
            }
        }
        else if (next.$$route.authenticated == false) {
            if (Auth.isLoggedIn()) {
                event.preventDefault();
                $location.path('/');
            }
        }
    })
}])