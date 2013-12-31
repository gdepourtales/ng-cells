angular.module('ngcTableDirectiveTest', ['ngcTableDirective'])
    .controller('TestCtrl', function($scope) {
        $scope.data = [];

        for (var row = 1; row < 1001; row++) {
           var rowContent = [];
           for (var col = 1; col < 1001; col++) {
                rowContent.push(row * col);
           }
            $scope.data.push(rowContent);
        }

        $scope.cellFormatFn1 = function(value, row, col) {
            return "<<" + value + ">>";
        };

        $scope.cellFormatFn2 = function(value, row, col) {
            return "Mim: " + value;
        };

        $scope.cellFormatRH = function(value, row, col) {
            return "R:" + value;
        };

        $scope.styleFn = function(value, row, col) {
            var rgb = 'background-color: rgb(' + row + ", 128, " + col + ")";
            return rgb;
        };

    });

