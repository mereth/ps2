
const angular = require('angular');
require('angular-route');

require('bootstrap/dist/css/bootstrap.min.css');
require('ag-grid-community/dist/styles/ag-grid.css');
require('ag-grid-community/dist/styles/ag-theme-alpine.css');
require('../styles.css');

var ps2App = angular.module('ps2App', ['ngRoute', 'ps2Controllers']);

// configure our routes
ps2App.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
        template: require('../pages/home.html'),
        controller: 'mainController'
    })
    .when('/outfit/:id', {
        template: require('../pages/outfit.html'),
        controller: 'outfitController'
    })
    .when('/outfit/:id/online', {
        template: require('../pages/outfit-online.html'),
        controller: 'outfitOnlineController'
    })
    .when('/character/:id', {
        template : require('../pages/character.html'),
        controller: 'characterController'
    })
    .when('/friends/:id', {
        template: require('../pages/friends.html'),
        controller: 'friendsController'
    });
}]);

ps2App.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

require('./controllers');
require('./ps2-character');
require('./ps2-outfit');
require('./ps2-search');
require('./ps2-util');
