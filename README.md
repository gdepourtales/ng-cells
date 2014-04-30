ng-cells
========

AngularJS Table directive

This directive draws a table of data with different features. It has no dependency other than angularjs. it has been
tested on Google Chrome, Safari, Opera and Firefox and Internet Explorer 10 (8+ in developer mode)

Tu use this directive, just add the ngcTableDirective as dependency. The template is handle as an external HTML file
and integrated during the build process in the `ngc-template` module. The template is registered in the angularjs template cache with the key `ngc.table.tpl.html`

# Features

* Automatic column and row references like in popular spreadsheets
* Any number of fixed left and right columns
* Any number of fixed header and footer rows
* No table redraw : Supports big data sets without impacting display speed
* Scrolls on full rows and columns
* Support scrolling on mobile devices with touch events
* Data ranges with custom CSS class, format and styling functions and event callbacks
* Append custom sanitized or trusted HTML elements in cells (v0.2.0)
* Table elements CSS classes for easy theming
* No dependency except AngularJS

# Usage

## Table

The directive displays a grid of cells organized as the following principles :

    --------------------------------
    | |      COLUMN LETTERS        |
    --------------------------------
    | |      | HEADER ROWS |       |
    |-|------|---------------------|
    |R|      |             |       |
    |O| LEFT |   CENTER    | RIGHT |
    |W| COLS |    COLS     | COLS  |
    |#|      |             |       |
    |-|------|-------------|-------|
    | |      | FOOTER ROWS |       |
    --------------------------------

When the data matrix vertical dimension than the total number of rows, the area between header and footer is scrollable.
The behaviour is identical for the number of columns, the area between the left and right columns becomes scrollable.

ng-cells is also available through bower (bower install ng-cells)



Minimal example to display a table with one million cells (1000 x 1000 data matrix) with default settings and no styling :


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

The data must be given as a two dimensional array (ie `array[][]`). If your data is a complex object, you can define a custom data
function to extract the data value. For example, the following html snippet will use the below javascript function to get the value

```html
<div ngc-table data="data" custom-data-value-fn="customDataFn"></div>
```

```js
$scope.customDataFn = function(data, row, col) {
    return data[1000 - row - 1][1000 - col - 1];
}
```

The table settings like number of columns and rows in each table part can be specified with different attributes which
names should be self-explanatory. Please see the reference below. For example:

```html
<ngc-table
        data="data"
        left-column-number="5" left-column-widths="'30px'"
        center-column-number="10" center-column-widths="['40px', '60px', '40px']"
        right-column-number="5" right-column-widths="['60px', '40px', '60px', '40px', '60px']"
        header-row-number="2" header-row-heights="['30px', '15px']"
        row-number='15' row-heights="['41px', '14px']"
        footer-row-number="3" footer-row-heights="'24px'">
</ngc-table>
```


## Cell Ranges
Ranges

Ranges let specify custom behaviour for data ranges. The range is defined by the area limits and holds custom
CSS classes, format and styling functions and event callbacks. Ranges are specified in the data matrix range, thus they
are not related to cells.

To add custom ranges, use the declarative ranges definitions such as this example :

```html
 <ngc-table data="data">
     <ngc-range top="0" bottom="1000" left="0" right="5" format-fn="cellFormatRange1"></ngc-range>
     <ngc-range top="3" bottom="8" left="3" right="998" format-fn="cellFormatRange2"></ngc-range>
     <ngc-range top="10" bottom="12" left="6" right="15" format-fn="cellFormatRange3"></ngc-range>
     <ngc-range top="13" bottom="30" left="3" right="998" format-fn="cellFormatRange4"></ngc-range>
     <ngc-range top="990" bottom="998" left="3" right="998"></ngc-range>
 </ngc-table>
```

Ranges can overlap but only one class, event function, format function etc is activated on a single cell. The order of
precedence is the same as the order of the range declarations. The callback receives the cell and the cellData.

Here an example of `mousemove` event handling :

```html
<ngc-range top="0" bottom="5" left="0" right="5" click-fn="clickFn"  ></ngc-range>
```

```js
$scope.clickFn = function(event, cellData) {
    console.log(event.target);
    console.log(cellData.row);
    console.log(cellData.col);
    console.log(cellData.data);
    console.log(cellData.value);
}
```


## CSS Classes

In addition to ranges custom classes, the table embeds CSS classes to identify each part of the table. For example, to
set the pen color and the background color of all cells of the right header part, use the following CSS statement in your stylesheet. If you have other elements that clash you can add an additional `ngc` class to make it more specific.

```css
.cell.right.header {
    background-color: #880000;
    color: whitesmoke;
}
```

# Directive Reference

## Table

* `data` The 2D data matrix. The matrix can be of any dimension. By default, the displayed data is the data raw value
* `custom-data-value-fn` A custom function to extract the data value from the data source. The provided function should
have the form `function(data, row, col)`. Please remember that the initial data matrix IS required in order to define the data dimensions.
* `scroll-fn`A custom function called when horizontal or vertical scroll occurs. The provided function should have the form
`function(event, scrollPosition)` where event is the scroll event and scrollPosition is an object with `top` and `left` attributes. The
`top` and `left` attributes are the row and column of the data value displayed in the top left corner of the middle center area.
This function is called once when the table is firstly drawn to give the opportunity to store initial top left values.
* `show-column-names` A flag to set the visibility of the column letters. By default `true`
* `show-row-numbers` A flag to set the visibility of the row numbers. By default `true`
* `show-header` A flag to set the visibility of the header part. By default `true`. If `false`, the value of `header-row-number` is ignored
* `show-footer` A flag to set the visibility of the footer part. By default `true`. If `false`, the value of `footer-row-number` is ignored
* `left-column-number` The number of fixed columns on the left part of the table. By default `1`
* `left-column-widths` The CSS width of the left fixed columns, expressed with unit (eg `'40px'`).  No default. The value can be a single string value or an array of
string values. If the value is a single string, the same width is applied to all columns. If the value is an array, each column gets the width in arrays order (if the array's length is smaller than the number columns, the last width is used for the remaining columns).
* `center-column-number` The number of columns on the center part of the table. By default `10`
* `center-column-widths` The width of the center columns. See `left-column-widths` for value specification
* `right-column-number` The number of fixed columns on the right part of the table. By default `1`
* `right-column-widths` The width of the right fixed columns. See `left-column-widths` for value specification
* `header-row-number` The number of rows in the header section of the table
* `header-row-heights` The height of the header rows. See `left-column-widths` for value specification (except that the array values obviously relate to rows and not columns)
* `row-number` The number of rows in the middle section of the table
* `row-heights` The height of the middle rows. See `header-row-heights` for value specification
* `footer-row-number` The number of rows in the footer section of the table
* `footer-row-heights` The height of the footer rows. See `header-row-heights` for value specification


## Range

* `top` The top row (inclusive) limit of this range
* `bottom` The bottom (non-inclusive) row limit of this range
* `left` The left (inclusive) column limit of this range
* `right` The right (non-inclusive) column limit of this range
* `format-fn` A custom format function. This can be used to customize the output format of the data value. The function
must be of the form `function(value, row, col)` where `value` is the value of the source data at the position `[row][col]`
* `clazz` Class(es) to add to the cells enclosed by the range
* `custom-html-fn` A custom function to insert custom HTML in the cells. The returned HTML is sanitized by AngularJS before
being injected. Please use the `custom-trusted-html-fn` function if you want to bypass the sanitizer parser. The function
must be of the form `function(value, row, col, formattedValue)` where `value` is the value of the source data at the position `[row][col]`
and `formattedValue` contains the value after being formatted. The function must return a string containing the HTML
* `custom-trusted-html-fn` A custom function to insert custom HTML in the cells. The returned HTML is not processed by the
AngularJS sanitizer. For security reason, it is better to use the `custom-html-fn`. The function has the same form as
`custom-html-fn`
* `style-fn` A custom style format function to be applied to the cells. Use it to apply sophisticated styling to the table.
The function must be of the form `function(value, row, col)` where `value` is the value of the source data at the position `[row][col]`
* `<event>-fn` Custom event callbacks. The event can be any of `click`, `dblclick`, `mousedown`, `mouseenter`, `mouseleave`
`mousemove`, `mouseover`, `mouseup` event types. The callback must be of the form `function(event, cellData)` where
`event` is the initial Javascript event and the `cellData` an object with the following attributes :
** `row` The row of the data value in original data space (not table space)
** `col` The column of the data value in original data space (not table space)
** `data` The original data value located at row and column
** `value` The value of the cell as displayed
** `clazz` The classes of the cell
** `style` The style declaration of the cell
** `eventCallbacks` An object with all registered callbacks identified the event type
** `enclosingRanges` An array of all ranges that enclose the current cell

## CSS Reference

Here's a list of the classes which can be used to select cells according to the table parts they belong to

### Column names 
* Row : `column-names row`
* Row # column : `row-header column-name cell`
* Left columns : `left column-name cell`
* Center columns : `center column-name cell`
* Right columns : `right column-name cell`

### Header section 
* Rows : `header row`
* Row # : `row-header header cell`
* Left columns : `left header cell`
* Center columns : `center header cell`
* Right columns : `right header cell`

### Middle section 
* Rows : `middle row`
* Row # : `row-header middle cell`
* Left columns : `left middle cell`
* Center columns : `center middle cell`
* Right columns : `right middle cell`

### Footer section 
* Rows : `footer row`
* Row # : `row-header footer cell`
* Left columns : `left footer cell`
* Center columns : `center footer cell`
* Right columns : `right footer cell`

For example, in order to select the cells of the last row of the center columns in the middle section, use the following selector

```css
.ngc.middle.row .center.middle.last.cell {
...
}
```


All element class declarations also have the `ngc` class. First and last rows of each section have the resp. `first` and
`last` classes. Same for cells in each row and section.


# Thanks

Many thanks for contributors

* kayhadrin: Many improvements on mouse and scrolls behaviour
* iiome: Update of the web pages


# License

Copyright 2013,2014 Guy de Pourtalès

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.