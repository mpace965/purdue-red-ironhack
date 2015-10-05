app.controller('HomeController', ['$scope', function($scope){
  $scope.yesterday = getYesterday();
  $scope.oneYear = getOneYear();
  $scope.pickedDate = new Date();
}]);

function getYesterday() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

function getOneYear() {
  var date = new Date();
  date.setDate(date.getDate() + 365);
  return date;
}
