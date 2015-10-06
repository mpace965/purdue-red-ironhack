app.controller('TripController', ['$scope', '$routeParams', function($scope, $routeParams){
  $scope.leaveDate = new Date($routeParams.year, $routeParams.month, $routeParams.day);
}]);
