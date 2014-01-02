angular.module('ngcTableDirectiveTest', ['ngcTableDirective', 'ngSanitize'])
    .controller('TestCtrl', function($scope) {
        $scope.data = [];

        for (var row = 0; row < 42; row++) {
           var rowContent = [];
           for (var col = 0; col < 42; col++) {
                rowContent.push(row * col + col);
           }
            $scope.data.push(rowContent);
        }


        $scope.cellFormat = function(value, row, col) {
            var hex = (65536 * row  * 6 + 255 * 128 + col * 6).toString(16);
            hex = hex.length == 4 ? '00' + hex : hex.length == 5 ? '0' + hex : hex;
            return hex;
        };

        $scope.customTrustedHTMLFn = function(value, row, col) {
            return '<input ng-model="test" style="width:30px" type="text"  value="' + value + '">';
        };

        $scope.customHTMLFn = function(value, row, col) {
            return '<span>Sanitized HTML</span><input ng-model="test" style="width:30px" type="text"  value="' + value + '">';
        };

    });

