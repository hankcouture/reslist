var home = angular.module('reslist.home', [])

home.controller('HomeController', ['$scope', '$http', '$state', function($scope, $http, $state) {

	$scope.searchValue = '';
	$scope.resList = [];
	$scope.tempResults = [];

	$scope.addRestaurant = function(value) {
		$scope.searchValue = '';
		$scope.getResults(value);
	}

	$scope.selectRestaurant = function(value) {
		$scope.tempResults = [];
		$scope.resList.push(value);
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
			console.log(res)
			$scope.tempResults = res.data.results;
		})
	}

}])