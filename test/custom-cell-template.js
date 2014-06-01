angular.module('ngcTableDirectiveTest', ['ngcTableDirective', 'ngSanitize'])
    .controller('TestCtrl', function ($scope, $templateCache) {

        $scope.data = [];

        // generate data (2D array of objects)
        var count = 0;
        for (var row = 0; row < 42; row++) {
            var rowContent = [];
            for (var col = 0; col < 42; col++) {
                rowContent.push({
                    id: count,
                    prop: 'prop_' + count
                });
                count++;
            }
            $scope.data.push(rowContent);
        }

        // returns the id from the given object
        $scope.getId = function (obj, row, col) {
            return obj.id;
        };

        // returns the raw object
        $scope.getRawValue = function (obj, row, col) {
            return obj;
        };


        // Add some custom angular templates in $templateCache
        // This is just so that you can run this test locally with the file:/// protocol.
        // You could also just use a web server to test this and create the relevant html files to load those templates
        $templateCache.put('custom-cell-template-button1.html', '<button style="color: red">{{scopeExtension.rawCellData.data.id}}</button>');
        $templateCache.put('custom-cell-template-button2.html', '<button style="color: blue">{{scopeExtension.rawCellData.data.id}}</button>');
        $templateCache.put('custom-cell-template-button3.html', '<button style="color: green">{{scopeExtension.rawCellData.data.id}}</button>');
        $templateCache.put('custom-cell-template-controller.html', '<div ng-controller="CellCtrl as ctrl"><span ng-style="ctrl.getStyle()" title="id={{getCellVal().id}}">{{getCellVal().prop}}</span></div>');
        var templates = [
            'custom-cell-template-button1.html',
            'custom-cell-template-button2.html',
            'custom-cell-template-controller.html'
        ];

        $scope.buttonCellTemplate = function (rawData, row, col, formattedValue, scope) {
            return templates[row % 2];
        };
    })
    .controller('CellCtrl', function ($scope) {
        $scope.getCellVal = function() {
            return $scope.scopeExtension.rawCellData.data;
        };

        this.getStyle = function() {
            return {
                opacity: ($scope.getCellVal().id + 50) % 100 / 100
            };
        };
    });

