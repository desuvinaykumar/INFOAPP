angular.module('ionicApp', ['ionic'])
.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('index', {
						templateUrl: 'modules/home.html'
					})
					.state('categories', {
						templateUrl: 'modules/categories.html'
					})
					.state('about', {
						templateUrl: 'modules/about.html'
					})
					.state('searchinfo', {
						templateUrl: 'modules/searchInfo.html'
					})
					.state('contactus', {
						templateUrl: 'modules/contact.html'
					});
});