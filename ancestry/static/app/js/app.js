'use strict';
var babyApp = angular.module('babyApp', ['ngRoute', 'ngCookies', 'ui.bootstrap', 'ngOrderObjectBy']);

//---------------
// Routes
//---------------
babyApp.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'MainCtrl'
    })
}]);




