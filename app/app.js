'use strict';

// Declare app level module which depends on views, and components
angular.module('mineSweeper', [
    'ngRoute',
    'mineSweeper.home',
    'mineSweeper.howToPlay',
    'mineSweeper.game'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise('/');
    }]);
