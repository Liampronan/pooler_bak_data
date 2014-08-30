'use strict';

var mainApp = angular.module('mainApp', [
    'ui.router',
    'mainAppControllers',
    'mainAppDirectives'
]);

mainApp.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('login', {
            url: "/login",
            templateUrl: "partial/login",
            controller: 'LoginCtrl'
          })
          .state('register', {
            url: "/register",
            templateUrl: "partial/register",
            controller: 'RegistrationCtrl'
          })
          .state('prices', {
            url: "/prices",
            templateUrl: "partial/prices",
            controller: 'PriceCtrl'
          })
      $urlRouterProvider.otherwise('/prices');
    }
]);

//function onGoogleReady() {
//  console.log("GMaps api initialized.");
//  var body = document.getElementsByTagName('body')[0];
//  angular.bootstrap(body, ['mainApp'])
//}

//var webApp = angular.module('webApp', [
//    'ui.router',
//    'webAppControllers'
//]);
//
//webApp.config(['$routeProvider',
//    function($routeProvider) {
//        $routeProvider.
//            when('/main', {
//                templateUrl: 'partial/auth/home',
//                controller: 'HomeCtrl'
//            }).
//            otherwise({
//                redirectTo: '/main'
//            });
//    }
//]);