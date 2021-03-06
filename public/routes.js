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
        authenticated: true,
        permission:    'user'
    })

    .when('/user/update', {
        templateUrl: '/views/pages/users/update.html',
        controller:  'updateController',
        controllerAs: 'update',
        authenticated: true,
        permission:     'user'                
    })

    .when('/user/food/list', {
        templateUrl: '/views/pages/users/listfood.html',
        controller:  'userListFoodController',
        controllerAs: 'food',        
        authenticated: true,
        permission:     'user'                
    })

    .when('/user/orders', {
        templateUrl: '/views/pages/users/orders.html',
        controller:  'orderListController',
        controllerAs: 'order',         
        authenticated: true,
        permission:     'user'                
    })

    .when('/user/cart', {
        templateUrl: '/views/pages/users/cart.html',
        controller:  'cartController',
        controllerAs: 'cart',          
        authenticated: true,
        permission:     'user'                
    }) 
    
    .when('/user/order/detail', {
        templateUrl: '/views/pages/users/orderDetail.html',
        controller:  'orderController',
        controllerAs: 'order',          
        authenticated: true,
        permission:     'user'                
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
        authenticated: true,
        permission:    'housewife'
    })

    
    .when('/housewife/update', {
        templateUrl: '/views/pages/housewifes/update.html',
        controller:  'updateHousewifeController',
        controllerAs: 'update', 
        authenticated: true,
        permission:    'housewife'               
    })

    .when('/housewife/addfood', {
        templateUrl: '/views/pages/housewifes/addfood.html',
        authenticated: true,
        controller:  'addFoodController',
        controllerAs: 'food',        
        permission:    'housewife'
    })

    .when('/housewife/myfoods', {
        templateUrl: '/views/pages/housewifes/myfoods.html',
        controller:  'listFoodController',
        controllerAs: 'food',           
        authenticated: true,     
        permission:    'housewife'
    })

    .when('/housewife/updatefood', {
        templateUrl: '/views/pages/housewifes/updatefood.html',
        controller:  'updateFoodController',
        controllerAs: 'food',                 
        authenticated: true,     
        permission:    'housewife'
    })  

    .when('/housewife/deletefood', {
        templateUrl: '/views/pages/housewifes/delete.html',
        controller:  'deleteFoodController',
        controllerAs: 'food',                 
        authenticated: true,     
        permission:    'housewife'
    }) 
    
    .when('/housewife/order/list', {
        templateUrl: '/views/pages/housewifes/confirmorder.html',
        controller:  'ordersController',
        controllerAs: 'order',                       
        authenticated: true,     
        permission:    'housewife'
    })  

    .when('/admin/login', {
        templateUrl: '/views/pages/admin/login.html',
        controller:  'adminLogController',
        controllerAs: 'login',
        authenticated: false
    })

    .when('/admin/manegement', {
        templateUrl: '/views/pages/admin/manegement.html',
        controller:  'manegementController',
        controllerAs: 'manegement',              
        authenticated: true,
        permission:     'admin'                
    })    


    .when('/admin/category/add', {
        templateUrl: '/views/pages/admin/addCategory.html',
        controller:  'addCategoryController',
        controllerAs: 'category',              
        authenticated: true,
        permission:     'admin'                
    })

    .when('/admin/category/update', {
        templateUrl: '/views/pages/admin/updateCategory.html',
        controller:  'updateCategoryController',
        controllerAs: 'category',              
        authenticated: true,
        permission:     'admin'                
    })
    
    .when('/admin/category/delete', {
        templateUrl: '/views/pages/admin/deleteCategory.html',
        controller:  'deleteCategoryController',
        controllerAs: 'category',              
        authenticated: true,
        permission:     'admin'                
    })
    
    .when('/admin/orders/complated', {
        templateUrl: '/views/pages/admin/complatedOrder.html',        
        controller:  'complatedOrdersController',
        controllerAs: 'order',           
        authenticated: true,
        permission:     'admin'                
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
            else if (next.$$route.permission) {
                Auth.getUser()
                .then(function(data) {
                    if (next.$$route.permission != data.data.permission) {
                        event.preventDefault();
                        $location.path('/');                        
                    }              
                })                
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