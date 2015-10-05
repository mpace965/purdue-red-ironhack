var app = angular.module('myApp', ['ngRoute', 'ngMaterial'])

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'home/home.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});
