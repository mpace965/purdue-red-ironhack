var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMdIcons'])

app.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      controller: 'HomeController',
      templateUrl: 'views/home/home.html'
    })
    .when('/trip/:year/:month/:day', {
      controller: 'TripController',
      templateUrl: 'views/trip/trip.html'
    })
    .otherwise({
      redirectTo: '/home'
    })
});
