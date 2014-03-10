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
        }, 2000);

        $timeout(function() {
            var rows = parseInt($location.search().rows) || 100;
            var cols = parseInt($location.search().cols) || 100;

            $scope.data = [];
            for (var row = 0; row < rows; row++) {
                var rowContent = [];
                for (var col = 1; col < cols + 1; col++) {
                    rowContent.push(row * col + col);
                }
                $scope.data.push(rowContent);
            }
        }, 5000);

    });

