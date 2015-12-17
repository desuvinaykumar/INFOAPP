angular.module('ionicApp', ['ionic'])
.config(function($stateProvider,$urlRouterProvider) {
	$stateProvider.state('index', {
						cache: false,
						templateUrl: 'modules/home.html'
					})
					.state('categories', {
						cache: false,
						templateUrl: 'modules/categories.html'
					})
					.state('about', {
						cache: false,
						templateUrl: 'modules/about.html'
					})
					.state('searchinfo', {
						cache: false,
						templateUrl: 'modules/searchInfo.html'
					})
					.state('contactus', {
						cache: false,
						templateUrl: 'modules/contact.html'
					});
});