var app = angular.module('reslist', [
  'reslist.home',
  'ui.router'
])

app.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "/app/views/home.html",
      controller: "HomeController"
    })
});