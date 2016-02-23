var home = angular.module('reslist.home', [])

home.controller('HomeController', ['$scope', '$http', '$state', function($scope, $http, $state) {

	$scope.searchValue = '';
	$scope.resList = []

	$scope.addRestaurant = function(value) {
		$scope.searchValue = '';
		$scope.resList.push({ name: value })
	}


}])