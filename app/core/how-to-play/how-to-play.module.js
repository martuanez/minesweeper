'use strict';

angular.module('mineSweeper.howToPlay', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when("/how-to-play", {
            templateUrl: "core/how-to-play/templates/how-to-play.tpl.html",
            controller: "HowToPLayController"
        })
    });