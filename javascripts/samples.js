angular.module('ngcTableDirectiveTest', ['ngcTableDirective'])
    .controller('TestCtrl', function($scope) {
        $scope.data = [];
        var row, col, rowContent;

        for (row = 0; row < 1000; row++) {
           rowContent = [];
           for (col = 0; col < 1000; col++) {
                rowContent.push(row * col + col);
           }
            $scope.data.push(rowContent);
        }

        $scope.smalldata = [];

        for (row = 0; row < 42; row++) {
            rowContent = [];
            for (col = 0; col < 42; col++) {
                rowContent.push(row * col + col);
            }
            $scope.smalldata.push(rowContent);
        }

        $scope.cellFormatFn1 = function(value, row, col) {
            return "<<" + value + ">>";
        };

        $scope.cellFormatFn2 = function(value, row, col) {
            return "Data: " + value;
        };

        $scope.cellFormatRH = function(value, row, col) {
            return "R:" + value;
        };

        $scope.colorCellFormat = function(value, row, col) {
            var hex = (65536 * row  * 6 + 255 * 128 + col * 6).toString(16);
            hex = hex.length == 4 ? '00' + hex : hex.length == 5 ? '0' + hex : hex;
            return hex;
        };

        $scope.styleFn = function(value, row, col) {
            var rgb = 'background-color: rgb(' + (row  * 6) + ", 128, " + (col  * 6) + ")";
            return rgb;
        };


        $scope.customDataFn = function(data, row, col) {
            return data[1000 - row - 1][1000 - col - 1];
        }


        /*
        Works for v0.2.0
         */

        $scope.customTrustedHTMLFn = function(value, row, col) {
            return '<input style="width:30px" type="text"  value="' + value + '">';
        };

        $scope.customHTMLFn = function(value, row, col) {
            return '<input style="width:30px" type="text"  value="' + value + '"><span>Sanitized HTML</span>';
        };
    });

