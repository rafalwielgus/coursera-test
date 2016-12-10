(function () {
'use strict'

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.meal= "";
  $scope.information = "";

  $scope.checkMeal = function () {

    if ($scope.meal.length == 0){
        $scope.information = "Please enter data first";
    } else {
      var arrayOfItems = $scope.meal.split(',');
      if (arrayOfItems.length <= 3) {
        $scope.information = "Enjoy!";
      } else {
        $scope.information = "Too much!"
      }
    }
  };
}

})();
