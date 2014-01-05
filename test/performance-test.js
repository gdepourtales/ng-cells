angular.module('ngcTableDirectiveTest', ['ngcTableDirective'])
    .controller('TestCtrl', function($scope, $timeout, $location) {
        $scope.data = [];

        $timeout(function() {
            var rows = parseInt($location.search().rows) || 1000;
            var cols = parseInt($location.search().cols) || 1000;

            $scope.data = [];
            for (var row = 0; row < rows; row++) {
               var rowContent = [];
               for (var col = 1; col < cols + 1; col++) {
                    rowContent.push(row * col + col);
               }
                $scope.data.push(rowContent);
            }
        });

        $scope.cellFormatFn1 = function(value, row, col) {
            return "--" + value + "--";
        };

        $scope.cellFormatFn2 = function(value, row, col) {
            return "Data: " + value;
        };

        $scope.cellFormatRH = function(value, row, col) {
            return "R:" + value;
        };

        $scope.styleFn = function(value, row, col) {
            var rgb = 'background-color: rgb(' + row + ", 128, " + col + ")";
            return rgb;
        };

    });

