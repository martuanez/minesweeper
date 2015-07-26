'use strict';

angular.module('mineSweeper.game')
    .factory('GameFactoryService', function (GameLevelsStateService) {
        var level = GameLevelsStateService.getLevel();

        function getGameGrid() {
            var grid = getGrid();
            setMines(grid);

            return grid;
        }

        function setMines(grid) {
            var mines = level.mines,
                currentTile = {};
            while (mines > 0) {
                var row = getRandomIntInclusive(0, level.rows - 1);
                var column = getRandomIntInclusive(0, level.columns - 1);

                currentTile = grid[row][column];
                if(!currentTile.isLoaded){
                    currentTile.isLoaded = true;
                    console.log('Loaded', row, column)
                    --mines;
                }
            }
        }

        function getRandomIntInclusive(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getGrid() {
            var grid = [], i = 0, j = 0;
            for (i = 0; i < level.rows; i++) {
                grid.push([]);
                for (j = 0; j < level.columns; j++) {
                    grid[i].push(getTile(i, j));
                }
            }
            return grid;
        }

        function getTile(row, column) {
            return {
                isExposed: false,
                isLoaded: false,
                isFlagged: false,
                row: row,
                siblingMines: 0,
                column: column
            }
        }

        return {
            getGameGrid: getGameGrid
        };
    });