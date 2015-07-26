'use strict';

angular.module('mineSweeper.game')
    .controller('GameController', function ($scope, GameFactoryService, GameLevelsStateService) {
        $scope.grid = GameFactoryService.getGameGrid();
        $scope.onTileClick = onTileClick;
        $scope.remainingTime = '3:00'
        $scope.minesLeft = GameLevelsStateService.getLevel().mines;

        function onTileClick(tile) {
            tile.isExposed = true;
            if (!tile.isLoaded) {
                tile.siblingMines = getSurroundingTilesMinesCount(tile.row, tile.column);
            } else {
                --$scope.minesLeft;
            }
        }

        function getSurroundingTilesMinesCount(row, column) {
            var count = 0;
            count += getCountPerRow(row - 1, column);
            count += getCountPerRow(row, column);
            count += getCountPerRow(row + 1, column);
            return count;
        }

        function getCountPerRow(row, column) {
            var count = 0,
                gridRow = $scope.grid[row];

            if (gridRow) {
                count += isLoaded(gridRow[column - 1]) ? 1 : 0;
                count += isLoaded(gridRow[column]) ? 1 : 0;
                count += isLoaded(gridRow[column + 1]) ? 1 : 0;
            }

            return count;
        }

        function isLoaded(tile) {
            return !!tile && tile.isLoaded;
        }
    });