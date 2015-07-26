'use strict';

angular.module('mineSweeper.home', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "core/home/templates/home.tpl.html",
            controller: "HomeController"
        });
    });