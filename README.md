ng-cells
========

AngularJS Table directive

This directive draws a table of data with different features. It has no dependency other than angularjs. it has been
tested on Google Chrome, Safari, Opera and Firefox and Internet Explorer 10 (8+ in developer mode)

Tu use this directive, just add the ngcTableDirective as dependency. The template is handle as an external HTML file
and integrated during the build process in the `ngc-template` module. The template is registered in the angularjs template cache
with the key `ngc.table.tpl.html`

#Features

* Automatic column and row references like in popular spreadsheets
* Any number of fixed left and right columns
* Any number of fixed header and footer rows
* No table redraw : Supports big data sets without impacting display speed
* Scrolls on full rows and columns
* Data ranges with custom CSS class, format and styling functions and event callbacks
* Table elements CSS classes for easy theming

#Usage

Minimal example to show the table with the default values and no styling :

```html
<!DOCTYPE html>
<html ng-app="ngcTableDirectiveTest">
<head>
    <title>Test Template</title>
    <link href="../dist/ng-cells-0.1.1.css" rel="stylesheet" type="text/css">
    <script src="../lib/angular-1.2.6.js"></script>
    <script src="../dist/ng-cells-0.1.1.js"></script>
    <script>
        angular.module('ngcTableDirectiveTest', ['ngcTableDirective'])
                .controller('TestCtrl', function($scope) {
                    $scope.data = [];

                    for (var row = 0; row < 1000; row++) {
                        var rowContent = [];
                        for (var col = 0; col < 1000; col++) {
                            rowContent.push(row * col + col);
                        }
                        $scope.data.push(rowContent);
                    }

                });

    </script>

</head>
<body>
<div ng-controller="TestCtrl">
    <div ngc-table data="data"></div>
</div>
</body>
</html>
```

#Reference

##Table

##Range
