var ps2App = angular.module('ps2App', ['ngRoute', 'ps2Controllers']);

// configure our routes
ps2App.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    })
    .when('/outfit/:id', {
        templateUrl : 'pages/outfit.html',
        controller  : 'outfitController'
    })
    .when('/character/:id', {
        templateUrl : 'pages/character.html',
        controller  : 'characterController'
    })
    .when('/friends/:id', {
        templateUrl : 'pages/friends.html',
        controller  : 'friendsController'
    })
    ;
});
