'use strict';

angular.module('mineSweeper.game')
    .controller('GameController', function ($scope, $timeout, GameFactoryService, GameLevelsStateService) {
        $scope.grid = GameFactoryService.getGameGrid();

        $scope.onTileClick = onTileClick;
        $scope.onTileRightClick = onTileRightClick;
        $scope.onNewGameClick = createNewGame;

        $scope.onTimeout = onTimeout;
        $scope.stop = stop;

        $scope.counter = 0;
        $scope.isGameOver = false;
        $scope.isGameLost = false;
        $scope.level = null;
        $scope.minesLeft = 0;
        $scope.normalTilesLeft = 0;

        var mytimeout;

        function createNewGame(){
            $scope.grid = GameFactoryService.getGameGrid();
            $scope.level = GameLevelsStateService.getLevel();
            $scope.minesLeft = $scope.level.mines;
            $scope.normalTilesLeft = ($scope.level.rows * $scope.level.columns) - $scope.minesLeft;

            $scope.isGameOver = false;
            $scope.isGameLost = false;

            $scope.onTileClick = onTileClick;
            $scope.onTileRightClick = onTileRightClick;

            $scope.counter = 0;
            mytimeout = $timeout($scope.onTimeout,1000);
        }

        function onTileClick(tile) {
            var count = 0;
            if (!tile.isExposed) {
                tile.isExposed = true;

                if (!tile.isLoaded) {
                    count = countSiblingLoadedTiles(tile);
                    tile.siblingMines = count || '';
                    --$scope.normalTilesLeft;
                    if ($scope.normalTilesLeft === 0) {
                        $scope.isGameOver = true;
                        $scope.stop();
                    } else if (count === 0) {
                        exposeSiblingTiles(tile);
                    }
                } else {
                    $scope.isGameLost = true;
                    $scope.isGameOver = true;

                    $scope.stop();

                    $scope.onTileClick = angular.noop;
                    $scope.onTileRightClick = angular.noop;
                }
            }
        }

        function onTileRightClick(tile) {
            if (!tile.isExposed) {
                tile.isFlagged = !tile.isFlagged;
                $scope.minesLeft +=  tile.isFlagged ? -1 : 1;
            }
        }

        function onTimeout(){
            $scope.counter++;
            mytimeout = $timeout($scope.onTimeout,1000);
        }

        function stop(){
            $timeout.cancel(mytimeout);
        }

        function exposeSiblingTiles(tile) {
            var tiles = getSiblingTiles(tile);
            tiles.forEach(function(item){
                onTileClick(item);
            });
        }

        function countSiblingLoadedTiles(tile){
            var count = 0,
                tiles = getSiblingTiles(tile);
            tiles.forEach(function(item){
                if(item.isLoaded){
                    ++count;
                }
            });

            return count;
        }

        function getSiblingTiles(tile) {
            var tiles = [],
                row, currentTile;
            for (var i = -1; i < 2; i++) {
                var row = $scope.grid[tile.row + i];
                if (row) {
                    for (var j = -1; j < 2; j++) {
                        currentTile = row[tile.column + j];
                        if (currentTile) {
                            tiles.push(currentTile);
                        }
                    }
                }
            }

            return tiles;
        }

        createNewGame();
    });