'use strict';

angular.module('mineSweeper.game', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when("/game", {
            templateUrl: "core/game/templates/game.tpl.html",
            controller: "GameController"
        });
    });