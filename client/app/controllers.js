var home = angular.module('reslist.home', [])

home.controller('HomeController', ['$scope', '$http', '$state', function($scope, $http, $state) {

	$scope.searchValue = '';
	$scope.resList = []

	$scope.addRestaurant = function(value) {
		$scope.searchValue = '';
		$scope.getResults(value);
	}

	$scope.getResults = function(searchValue) {
		return $http({
		  method: 'POST',
		  url: '/',
		  data: {
		  	term: searchValue
		  }
		})
		.then(function (res) {
			$scope.resList = res.data.results;
		})
	}

}])