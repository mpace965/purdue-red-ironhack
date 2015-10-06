app.controller('HomeController', ['$scope', function($scope){
  $scope.yesterday = getYesterday();
  $scope.oneYear = getOneYear();
  $scope.pickedDate = new Date();

  $scope.navigate = function() {
    window.location.href = "#/trip/" + $scope.pickedDate.getFullYear() + "/" + $scope.pickedDate.getMonth() + "/" + $scope.pickedDate.getDate();
  }

  $scope.inMonth = function(months) {
    $scope.pickedDate.setMonth($scope.pickedDate.getMonth() + months);
    $scope.navigate();
  }
}]);

function getYesterday() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

function getOneYear() {
  var date = getYesterday();
  date.setFullYear(date.getFullYear() + 1);
  return date;
}
