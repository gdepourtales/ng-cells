angular.module('ngcTableDirectiveTest', ['ngcTableDirective'])
    .controller('TestCtrl', function($scope) {
        $scope.data = [];

        for (var row = 0; row < 42; row++) {
           var rowContent = [];
           for (var col = 0; col < 42; col++) {
                rowContent.push(row * col + col);
           }
            $scope.data.push(rowContent);
        }

        $scope.events = [
            'click', 'dblclick',
            'keydown', 'keypress', 'keyup',
            'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup'
        ];

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

        $scope.modifyInternals = function(event, cellData) {
            var elem = angular.element(event.target);
            elem.empty();
            elem.append('<input type="text" value="' + cellData.value + '">');
        }


        $scope.cellFormat = function(value, row, col) {
            var hex = (65536 * row  * 6 + 255 * 128 + col * 6).toString(16);
            hex = hex.length == 4 ? '00' + hex : hex.length == 5 ? '0' + hex : hex;
            return hex;
        };

        $scope.styleFn = function(value, row, col) {
            var rgb = "background-color: rgb(" + (row  * 6)+ ", 128, " + (col * 6) + ")";
            return rgb;
        };

    });

