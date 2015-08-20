angular.module('ngcTableDirectiveTest', ['ngcTableDirective'])
    .controller('TestCtrl', function($scope) {
        $scope.data = [];

        for (var row = 0; row < 40; row++) {
            var rowContent = [];
            for (var col = 0; col < 40; col++) {
                rowContent.push(row * col + col);
            }
            $scope.data.push(rowContent);
        }

        $scope.events = [
            'click', 'dblclick',
            'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup'
        ];

        angular.forEach($scope.events, function(eventName) {
            $scope[eventName + 'Format'] = function(cellData, row, col) {
                return eventName;
            };
        });


        $scope.eventsTarget = {};
        $scope.eventsData = {};
        $scope.eventsValue = {};

        angular.forEach($scope.events, function(eventName) {
            $scope.eventsData[eventName] = 'N/A';
            $scope.eventsValue[eventName] = 'N/A';
            $scope[eventName + "Fn"] = function(event, cellData) {
                $scope.eventsTarget[eventName] = event.target.toString();
                $scope.eventsData[eventName] = cellData.data;
                $scope.eventsValue[eventName] = cellData.value;
            }
        });


        $scope.cellFormat = function(value, row, col) {
            var hex = (65536 * row  * 6 + 255 * 128 + col * 6).toString(16);
            hex = hex.length == 4 ? '00' + hex : hex.length == 5 ? '0' + hex : hex;
            return hex;
        };



    });

