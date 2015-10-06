var app = angular.module('myApp', ['ngRoute', 'ngMaterial'])

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'HomeController',
      templateUrl: 'home/home.html'
    })
    .when('/trip/:year/:month/:day', {
      controller: 'TripController',
      templateUrl: 'trip/trip.html'
    })
    .otherwise({
      redirectTo: '/'
    })
});
