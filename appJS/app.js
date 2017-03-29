'use strict';
var medVision = angular.module('musicLib', ['ui.router', 'angular-loading-bar']);

medVision
.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/search');
    
    $stateProvider
		.state('search', {
				url: '/search',
				templateUrl: 'templates/search.html',
				controller: 'searchCtrl'
		})
		;
});
