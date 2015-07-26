'use strict';

angular.module('mineSweeper.game')
    .factory('GameLevelsStateService', function () {
        var levels = {
            beginner: {rows: 9, columns: 9, mines: 10},
            intermediate: {rows: 16, columns: 16, mines: 40},
            hard: {rows: 16, columns: 30, mines: 99},
        }

        var currentLevel = levels.beginner;

        function getLevel() {
            return currentLevel;
        }

        function setLevel(level) {
            currentLevel = levels[level];
        }

        return {
            getLevel: getLevel,
            setLevel: setLevel
        };
    });