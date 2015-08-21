/*
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
 */

(function () {

    var module = angular.module('ngcTableDirective', ['ngc-template', 'ngSanitize', 'ngScrollable']);


    module.directive('ngcTable', ['$templateCache', '$sce', '$timeout', '$parse', function ($templateCache, $sce, $timeout, $parse) {

        /**
         * ngcTable Controller declaration. The format is given to be able to minify the directive. The scope is
         * injected.
         * @type {*[]}
         */
        var controllerDecl = ['$scope', function ($scope) {
            /**
             * Registers a range declaration in the scope
             * @param range The new range declaration
             */
            this.addRange = function (range) {
                $scope.ranges.push(range);
            };


        }];


        function compile(/*tElement, tAttrs*/) {
            return {

                pre: function preLink(scope /*, iElement, iAttrs, controller */) {

                    /**
                     * Utility function to create a style declaration based on the value declaration
                     * @param attrName The name of the CSS attribute
                     * @param valueDecl The value of the style declaration given in the directive attributes
                     * @param index The index of the element if the value declaration is an array
                     * @returns {string} The CSS attribute declaration
                     */
                    function $$getStyleDecl(attrName, valueDecl, index) {
                        return angular.isArray(valueDecl) ? index < valueDecl.length ? attrName + ':' + valueDecl[index] : attrName + ':' + valueDecl[valueDecl.length - 1]
                            : angular.isDefined(valueDecl) ? attrName + ':' + valueDecl : ''
                    }

                    /**
                     * Utility function to create and register new columns
                     * @param n The number of columns to create
                     * @param array The array in which register the newly creted columns
                     * @param widths The widths array to apply to each columns
                     */
                    function $$createColumns(n, array, widths) {
                        if (angular.isNumber(n)) {
                            for (var i = 0; i < n; i++) {
                                array.push({
                                    style: $$getStyleDecl('width', widths, i) + ';' + $$getStyleDecl('max-width', widths, i)
                                });
                            }
                        }
                    }

                    /**
                     * Left row header columns definitions
                     * @type {Array}
                     */
                    scope.$$leftRowHeadersColumns = [];
                    /**
                     * Left fixed columns definitions
                     * @type {Array}
                     */
                    scope.$$leftFixedColumns = [];
                    /* Create the columns based on directive parameters */
                    $$createColumns(angular.isNumber(scope.leftColumnNumber) ? scope.leftColumnNumber : 1, scope.$$leftFixedColumns, scope.leftColumnWidths);
                    /**
                     * Variable center column definitions
                     * @type {Array}
                     */
                    scope.$$variableCenterColumns = [];
                    /* Create the columns based on directive parameters */
                    $$createColumns(angular.isNumber(scope.centerColumnNumber) ? scope.centerColumnNumber : 10, scope.$$variableCenterColumns, scope.centerColumnWidths);
                    /**
                     * Right fixed columns definitions
                     * @type {Array}
                     */
                    scope.$$rightFixedColumns = [];
                    /* Create the columns based on directive parameters */
                    $$createColumns(angular.isNumber(scope.rightColumnNumber) ? scope.rightColumnNumber : 1, scope.$$rightFixedColumns, scope.rightColumnWidths);

                    /* Headers and tools */
                    /**
                     * Top left row headers data
                     * @type {Array}
                     */
                    scope.$$topLeftRowHeadersData = [];
                    /**
                     * Middle left row headers data
                     * @type {Array}
                     */
                    scope.$$middleLeftRowHeadersData = [];
                    /**
                     * Bottom left row headers data
                     * @type {Array}
                     */
                    scope.$$bottomLeftRowHeadersData = [];

                    /**
                     * Left column names
                     * @type {Array}
                     */
                    scope.$$leftColumnNames = [];
                    /**
                     * Center column names
                     * @type {Array}
                     */
                    scope.$$centerColumnNames = [];
                    /**
                     * Right column names
                     * @type {Array}
                     */
                    scope.$$rightColumnNames = [];


                    scope.$$scrollTopPosition = angular.isNumber(scope.$$scrollTopPosition) ? scope.$$scrollTopPosition : 0;
                    scope.$$scrollLeftPosition = angular.isNumber(scope.$$scrollLeftPosition) ? scope.$$scrollLeftPosition : 0;

                    /*
                     Register the data function
                     */
                    if (angular.isFunction(scope['customDataValueFn'])) {
                        scope.$$getDataValue = scope['customDataValueFn'];
                    } else {
                        scope.$$getDataValue = function (data, row, col) {
                            return angular.isArray(data[row]) ? data[row][col] : undefined;
                        };
                    }


                    /* Data regions */
                    /**
                     * Top left data array
                     * @type {Array}
                     */
                    scope.$$topLeftData = [];
                    /**
                     * Top center data array
                     * @type {Array}
                     */
                    scope.$$topCenterData = [];
                    /**
                     * Top right data array
                     * @type {Array}
                     */
                    scope.$$topRightData = [];
                    /**
                     * Middle left data array
                     * @type {Array}
                     */
                    scope.$$middleLeftData = [];
                    /**
                     * Middle center data array
                     * @type {Array}
                     */
                    scope.$$middleCenterData = [];
                    /**
                     * Middle right data array
                     * @type {Array}
                     */
                    scope.$$middleRightData = [];
                    /**
                     * Bottom left data array
                     * @type {Array}
                     */
                    scope.$$bottomLeftData = [];
                    /**
                     * Bottom center data array
                     * @type {Array}
                     */
                    scope.$$bottomCenterData = [];
                    /**
                     * Bottom right data array
                     * @type {Array}
                     */
                    scope.$$bottomRightData = [];

                    /**
                     * Scroll position in the data matrix
                     * @type {{top: number, left: number}}
                     */
                    scope.$$scrollPosition = {
                        top: angular.isDefined(scope.scrollTopPosition) ? scope.scrollTopPosition : 0,
                        left: angular.isDefined(scope.scrollLeftPosition) ? scope.scrollLeftPosition : 0
                    };

                    /**
                     * Ranges for events, styles, etc...
                     * @type {Array}
                     */
                    scope.ranges = [];


                    /**
                     * Flag to show the column names. Default value is true
                     * @type {string|.scope.showColumnNames|showColumnNames}
                     */
                    scope.showColumnNames = angular.isDefined(scope.showColumnNames) ? scope.showColumnNames : true;

                    /**
                     * Flag to show the row number. Default value is true
                     * @type {string|.scope.showColumnNames|showColumnNames}
                     */
                    scope.showRowNumbers = angular.isDefined(scope.showRowNumbers) ? scope.showRowNumbers : true;

                    /*
                     If the show row number flag is on, add the required column
                     */
                    if (scope.showRowNumbers) {
                        scope.$$leftRowHeadersColumns.push({
                            clazz: 'row-number',
                            rowNumberColumn: true
                        });
                    }

                    /**
                     * Creates a row definition object
                     * @param {number|Array} rowHeight Row height as a number, or an array
                     * @param {number} index Index of the rowHeight to use, when it's an array
                     * @returns {{index: *, height: string}}
                     */
                    function createRowDefinitionByIndex(rowHeight, index) {
                        return {
                            index: index,
                            height: $$getStyleDecl('height', rowHeight, index) + ';' + $$getStyleDecl('max-height', rowHeight, index)
                        };
                    }

                    /**
                     * Creates row definitions array based on provided row properties
                     * @param params
                     * @returns {Array}
                     */
                    function createRowsDefinitions(params) {
                        var showRows = params.showRows,
                            rowNumber = params.rowNumber,
                            rowHeights = params.rowHeights,
                            defaultRowNumber = params.defaultRowNumber || 1,
                            rows = [];

                        if (!showRows) {
                            return rows;
                        }

                        rowNumber = angular.isNumber(rowNumber) ? rowNumber : defaultRowNumber;
                        for (var i = 0; i < rowNumber; i++) {
                            rows.push(createRowDefinitionByIndex(rowHeights, i));
                        }
                        return rows;
                    }

                    /**
                     * Flag to show the header rows.
                     * @type {string|.scope.showHeader|showHeader}
                     */
                    scope.showHeader = angular.isDefined(scope.showHeader) ? scope.showHeader : true;

                    /**
                     * Header rows definitions
                     * @type {Array}
                     */
                    scope.$$headerRows = createRowsDefinitions({
                        showRows: scope.showHeader,
                        rowNumber: scope.headerRowNumber,
                        rowHeights: scope.headerRowHeights,
                        defaultRowNumber: 1
                    });

                    /**
                     * Flag to show the filter rows.
                     * @type {string|.scope.showFilter|showFilter}
                     */
                    scope.showFilter = angular.isDefined(scope.showFilter) ? scope.showFilter : false;


                    /**
                     * Row definitions
                     * @type {Array}
                     */
                    scope.$$rows = createRowsDefinitions({
                        showRows: true,
                        rowNumber: scope.rowNumber,
                        rowHeights: scope.rowHeights,
                        defaultRowNumber: 10
                    });

                    /**
                     * Flag to show the footer rows.
                     * @type {string|.scope.showFilter|showFilter}
                     */
                    scope.showFooter = angular.isDefined(scope.showFooter) ? scope.showFooter : true;

                    /**
                     * Footer row definitions
                     */
                    scope.$$footerRows = createRowsDefinitions({
                        showRows: scope.showFooter,
                        rowNumber: scope.footerRowNumber,
                        rowHeights: scope.footerRowHeights,
                        defaultRowNumber: 1
                    });

                },


                post: function postLink(scope, iElement, iAttrs, controller) {


                    /**
                     * Returns a letter combination for an index
                     * @param index
                     * @returns {string}
                     */
                    function getLettersForIndex(index) {
                        var remainder = index % 26;
                        var letter = String.fromCharCode(65 + remainder);

                        if (index > 25) {
                            letter = getLettersForIndex((index - remainder) / 26 - 1) + letter;
                        }

                        return letter;
                    }

                    /**
                     * Default style function for the cells. Returns an empty string
                     * @returns {string}
                     */
                    function defaultStyleFn(/*data, row, col*/) {
                        return '';
                    }

                    /**
                     * Default format function for the cells content. Returns the raw data
                     * @param data
                     * @returns {*}
                     */
                    function defaultFormatFn(data /*, row, col*/) {
                        return angular.isDefined(data) ? data : '&nbsp;';
                    }

                    /**
                     * Default html content function
                     * @param data
                     * @returns {*}
                     */
                    function defaultHtmlFn(data, row, col, formattedValue) {
                        return angular.isDefined(formattedValue) ? String(formattedValue) : '&nbsp;';
                    }


                    /**
                     * Event dispatcher function. Calls the registered event callback
                     * @param eventName the name of the event
                     * @param event the event object as passed by the listener
                     * @param cellData the data registered for the cell
                     */
                    scope.$$dispatchEvent = function (eventName, event, cellData) {
                        /* Only handle callbacks that are actually functions */
                        if (cellData && angular.isFunction(cellData.eventCallbacks[eventName])) {
                            /* apply the callback */
                            cellData.eventCallbacks[eventName](event, cellData);
                        }
                    };


                    /**
                     * Return the cell data object given the row the column and the scope
                     * @param scope The scope
                     * @param row The row in data space
                     * @param col The column in data space
                     * @returns {{row: *, col: *, data: *, value: *, clazz: string, style: *, eventCallbacks: {}, enclosingRanges: Array, customCellTemplate: (string|Function), customHTML: string}}
                     */
                    function $$getCellData(scope, row, col) {
                        /* The additional optional class(es) */
                        var clazz = '';
                        /* The optional style function declaration */
                        var style = '';
                        /* The optional style function declaration */
                        var styleFn = defaultStyleFn;
                        /* The data format function */
                        var formatFn = defaultFormatFn;
                        /* The data value */
                        var data = scope.$$getDataValue(scope.data, row, col);
                        /* The custom append function */
                        var customHtmlFn = defaultHtmlFn;
                        /* The custom append function */
                        var customTrustedHtmlFn = undefined;
                        /**
                         * The custom template resolver
                         * @type {string|Function} A template URL string or a function that returns the template url string.
                         * Function signature: function(rawData, row, col, formattedValue, scope)
                         */
                        var customCellTemplate = undefined;

                        /* The cell event callbacks */
                        var eventCallbacks = {};
                        /* The ranges which contains this cell */
                        var enclosingRanges = [];
                        /* Supported events */
                        var events = [
                            'click', 'dblclick',
                            'keydown', 'keypress', 'keyup',
                            'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup'
                        ];

                        /* Check all ranges and apply the range attributes if the cell is enclosed */
                        angular.forEach(scope.ranges, function (range) {
                            if (row >= range.top && row < range.bottom
                                && col >= range.left && col < range.right) {
                                /* Register the enclosing range */
                                enclosingRanges.push(range);
                                /* Register the format function */
                                if (angular.isFunction(range.formatFn)) formatFn = range['formatFn'];
                                /* Register the CSS class */
                                if (angular.isString(range.clazz)) clazz = range.clazz;
                                /* Register the CSS style declaration */
                                if (angular.isString(range.style)) style = range.style;
                                if (angular.isFunction(range.styleFn)) styleFn = range['styleFn'];
                                if (angular.isFunction(range.customHtmlFn)) customHtmlFn = range['customHtmlFn'];
                                if (angular.isFunction(range.customTrustedHtmlFn)) customTrustedHtmlFn = range['customTrustedHtmlFn'];
                                if (angular.isDefined(range.customCellTemplate)) {
                                    customCellTemplate = range.customCellTemplate;
                                }

                                /* Register available event callbacks */
                                angular.forEach(events, function (event) {
                                    if (angular.isFunction(range[event])) eventCallbacks[event] = range[event];
                                });
                            }
                        });

                        var value = formatFn(data, row, col),
                            customHTML;

                        if (customCellTemplate && angular.isFunction(customCellTemplate)) {
                            customCellTemplate = customCellTemplate(data, row, col, value, scope);
                        }

                        if (customCellTemplate == null || customCellTemplate == '') { // null, undefined or empty string
                            customHTML = (angular.isDefined(customTrustedHtmlFn)) ? $sce.trustAsHtml(customTrustedHtmlFn(data, row, col, value)) : customHtmlFn(data, row, col, value);
                        }

                        return {
                            row: row,
                            col: col,
                            data: data,
                            value: value,
                            clazz: clazz,
                            style: styleFn(data, row, col) + ';' + style,
                            eventCallbacks: eventCallbacks,
                            enclosingRanges: enclosingRanges,
                            customCellTemplate: customCellTemplate,
                            customHTML: customHTML
                        };
                    }

                    /**
                     * Updates the variable center cells
                     * @param nRows Number of rows
                     * @param centerData The center data part. may be top, middle or bottom
                     * @param dataRowStartIndex The row start index, related to the data part
                     */
                    scope.$$setCenterColumnsData = function (nRows, centerData, dataRowStartIndex) {
                        var col;
                        /* Update the column names */
                        for (col = 0; col < this.$$variableCenterColumns.length; col++) {
                            this.$$centerColumnNames[col] = {
                                value: getLettersForIndex(col + this.$$leftFixedColumns.length + this.$$scrollPosition.left)
                            };
                        }

                        /* Update all rows of the center table part */
                        for (var row = 0; row < nRows; row++) {
                            var r = row + dataRowStartIndex;

                            /* Reset the center data array to empty */
                            centerData[row] = [];

                            for (col = 0; col < this.$$variableCenterColumns.length; col++) {
                                /*
                                 the column is the current column index + the number of columns to the left + the left
                                 scroll position
                                 */
                                var c = col + this.$$leftFixedColumns.length + this.$$scrollPosition.left;
                                centerData[row].push($$getCellData(scope, r, c));
                            }
                        }
                    };

                    /**
                     * Updates the left and right fixed cells
                     * @param nRows Number of rows of the table part
                     * @param rowHeadersData The headers row data
                     * @param leftData The data for the left part (top, middle or bottom)
                     * @param rightData The data for the right part (top, middle or bottom)
                     * @param dataRowStartIndex The row start index, related to the data part
                     */
                    scope.$$setLeftAndRightColumnsData = function (nRows, rowHeadersData, leftData, rightData, dataRowStartIndex) {
                        var col;
                        /* Update the column names on the left */
                        for (col = 0; col < this.$$leftFixedColumns.length; col++) {
                            this.$$leftColumnNames[col] = {
                                value: getLettersForIndex(col)
                            };
                        }

                        /* Update the column names on the right */
                        var rowLength = angular.isDefined(this.data[0]) ? this.data[0].length : 0;
                        var startColumnIndex = Math.max(rowLength - this.$$rightFixedColumns.length, this.$$leftFixedColumns.length + this.$$variableCenterColumns.length);

                        for (col = 0; col < this.$$rightFixedColumns.length; col++) {
                            this.$$rightColumnNames[col] = {
                                value: getLettersForIndex(startColumnIndex + col)
                            };
                        }

                        /* Update each row */
                        for (var row = 0; row < nRows; row++) {
                            /* Get the row index */
                            var r = dataRowStartIndex + row;

                            /* Reset the row headers data */
                            rowHeadersData[row] = [];
                            /* add the row number */
                            rowHeadersData[row][this.$$leftRowHeadersColumns.length - 1] = {
                                value: r + 1
                            };

                            /* Reset the left data array */
                            leftData[row] = [];

                            /* Update the left data */
                            for (col = 0; col < this.$$leftFixedColumns.length; col++) {
                                leftData[row].push($$getCellData(scope, r, col));
                            }

                            /* Reset the right data array */
                            rightData[row] = [];
                            /* Update the right data */
                            for (col = 0; col < this.$$rightFixedColumns.length; col++) {

                                rightData[row].push($$getCellData(scope, r, startColumnIndex + col));
                            }
                        }
                    };

                    /**
                     * Updates data in all table parts
                     */
                    scope.$$updateData = function () {
                        /* Initialize the header parts */
                        this.$$setCenterColumnsData(this.$$headerRows.length, this.$$topCenterData, 0);
                        this.$$setLeftAndRightColumnsData(this.$$headerRows.length, this.$$topLeftRowHeadersData, this.$$topLeftData, this.$$topRightData, 0);

                        /* Initiaize the variable middle parts */
                        this.$$setCenterColumnsData(this.$$rows.length, this.$$middleCenterData, this.$$headerRows.length + this.$$scrollPosition.top);
                        this.$$setLeftAndRightColumnsData(this.$$rows.length, this.$$middleLeftRowHeadersData, this.$$middleLeftData, this.$$middleRightData, this.$$headerRows.length + this.$$scrollPosition.top);

                        /* Initialize the fixed footer parts */
                        /* The footer start row should be either the total data rows minus the footer height or the number of header rows + the number of rows */
                        var footerStartRow = Math.max(this.data.length - this.$$footerRows.length, this.$$headerRows.length + this.$$rows.length);
                        this.$$setCenterColumnsData(this.$$footerRows.length, this.$$bottomCenterData, footerStartRow);
                        this.$$setLeftAndRightColumnsData(this.$$footerRows.length, this.$$bottomLeftRowHeadersData, this.$$bottomLeftData, this.$$bottomRightData, footerStartRow);

                    };

                    // Send an initial callback to set the scroll position on correct values if required

                    if (angular.isFunction(scope.scrollFn)) scope.scrollFn(null, {
                        top: scope.$$headerRows.length,
                        left: scope.$$leftFixedColumns.length,
                        direction: 'none'
                    });

                    // Initialize the data
                    scope.$$updateData();


                    scope.dataTotalRows = 0;
                    scope.dataTotalCols = 0;

                    scope.$watch(
                        'data',
                        function (newValue, oldValue) {
                            if (newValue !== oldValue) {

                                if (newValue.length !== scope.dataTotalRows ||
                                    newValue[0].length !== scope.dataTotalCols) {

                                    scope.$emit('content.reload');

                                    if (scope.$$scrollPosition.top > newValue.length - scope.$$headerRows.length - scope.$$middleCenterData.length - scope.$$footerRows.length) {
                                        updateVerticalScroll(scope, null, newValue.length - scope.$$headerRows.length - scope.$$middleCenterData.length - scope.$$footerRows.length);
                                    }

                                    if (scope.$$scrollPosition.left > scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$variableCenterColumns.length - scope.$$rightFixedColumns.length) {
                                        updateHorizontalScroll(scope, null, newValue.length - scope.$$leftFixedColumns.length - scope.$$variableCenterColumns.length - scope.$$rightFixedColumns.length);
                                    }
                                    scope.$$updateData();
                                } else {
                                    // Update the data
                                    $timeout(function() {scope.$$updateData();});
                                }

                            }
                        }
                    );


                    scope.$$containerWidth = undefined;
                    scope.$$containerHeight = undefined;
                    scope.$$onVerticalScrollUpdate = false;
                    scope.$$onHorizontalScrollUpdate = false;

                    /* Externally controlled scroll positions */
                    scope.$watch('scrollTopPosition',
                        function (newValue, oldValue) {
                            if (!scope.$$onVerticalScrollUpdate
                                && angular.isNumber(newValue) && angular.isNumber(oldValue)
                                && newValue !== oldValue && !isNaN(newValue) && newValue >= 0) {
                                updateVerticalScroll(scope, null, newValue);
                                scope.$$updateData();
                            }
                        }
                    );


                    /* Internally controlled scroll positions */
                    scope.$watch('$$scrollTopPosition',
                        function (newValue, oldValue) {
                            if (angular.isNumber(newValue) && angular.isNumber(oldValue)
                                && newValue !== oldValue && !isNaN(newValue) && newValue >= 0) {
                                updateVerticalScroll(scope, newValue, null);
                                scope.$$updateData();
                            }
                        }
                    );


                    function updateVerticalScroll(scope, contentPos, dataPos) {
                        scope.$$onVerticalScrollUpdate = true;
                        var totalRows = scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length;

                        var maxTop = totalRows - scope.$$middleCenterData.length;

                        var percentage = 0;
                        if (angular.isNumber(contentPos)) {
                            percentage = contentPos / scope.$$contentHeight;
                        } else if (angular.isNumber(dataPos)) {
                            percentage = dataPos / totalRows;
                        }

                        var topPos = Math.min(Math.ceil(totalRows * Math.min(percentage, 1)), maxTop);

                        scope.$$scrollPosition.top = topPos;

                        if (angular.isNumber(contentPos)) {
                            $parse('scrollTopPosition').assign(scope, topPos);
                        } else if (angular.isNumber(dataPos)) {
                            scope.$$scrollTopPosition = percentage * scope.$$contentHeight;
                            scope.$emit('content.reload');
                        }


                        $timeout(function () {
                            scope.$$onVerticalScrollUpdate = false;
                        });
                    }


                    scope.$watch('scrollLeftPosition',
                        function (newValue, oldValue) {
                            if (!scope.$$onHorizontalScrollUpdate
                                && angular.isNumber(newValue) && angular.isNumber(oldValue)
                                && newValue !== oldValue && !isNaN(newValue) && newValue >= 0) {
                                updateHorizontalScroll(scope, null, newValue);
                                scope.$$updateData();
                            }

                        }
                    );

                    scope.$watch(
                        '$$scrollLeftPosition',
                        function (newValue, oldValue) {
                            if (angular.isNumber(newValue) && angular.isNumber(oldValue)
                                && newValue !== oldValue && !isNaN(newValue) && newValue >= 0) {
                                updateHorizontalScroll(scope, newValue, null);
                                scope.$$updateData();
                            }
                        }
                    );

                    function updateHorizontalScroll(scope, contentPos, dataPos) {
                        scope.$$onHorizontalScrollUpdate = true;

                        var totalMiddleCols = scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length;

                        var maxLeft = totalMiddleCols - scope.$$variableCenterColumns.length;

                        var percentage = 0;
                        if (angular.isNumber(contentPos)) {
                            percentage = contentPos / scope.$$contentWidth;
                        } else if (angular.isNumber(dataPos)) {
                            percentage = dataPos / totalMiddleCols;
                        }

                        var leftPos = Math.min(Math.ceil(totalMiddleCols * Math.min(percentage, 1)), maxLeft);


                        scope.$$scrollPosition.left = leftPos;

                        if (angular.isNumber(contentPos)) {
                            $parse('scrollLeftPosition').assign(scope, leftPos);
                        } else if (angular.isNumber(dataPos)) {
                            scope.$$scrollLeftPosition = percentage * scope.$$contentWidth;
                            scope.$emit('content.reload');
                        }

                        $timeout(function () {
                            scope.$$onHorizontalScrollUpdate = false;
                        });
                    }


                    scope.$on('scrollable.dimensions', function (event, containerWidth, containerHeight, contentWidth, contentHeight, id) {

                        // If there's no change in the contentWidth and contentHeight
                        if (contentWidth == scope.$$contentWidth
                            && contentHeight == scope.$$contentHeight
                            && containerWidth == scope.$$containerWidth
                            && containerHeight == scope.$$containerHeight) {
                            return;
                        }

                        scope.dataTotalRows = scope.data.length;
                        scope.dataTotalCols = scope.data[0].length;


                        var totalRows = scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length;
                        var totalVisibleRows = scope.$$rows.length;

                        var totalCols = scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length;
                        var totalVisibleCols = scope.$$variableCenterColumns.length;

                        var nVPages = totalRows / totalVisibleRows;
                        var nHPages = totalCols / totalVisibleCols;

                        scope.$$contentHeight = containerHeight * nVPages;
                        scope.$$contentWidth = containerWidth * nHPages;
                        scope.$$containerWidth = containerWidth;
                        scope.$$containerHeight = containerHeight;

                        // Update scrollbars size
                        scope.$emit('content.changed');
                    });


                }
            }
        }

        return {
            scope: {
                /* Custom data function */
                customDataValueFn: '=?',
                /* Data to display */
                data: '=',
                /* Flag to show/hide the column names. By default true */
                showColumnNames: '=?',
                /* Flag to show the row numbers. By default true */
                showRowNumbers: '=?',
                /* Flag to show the header rows. By default true */
                showHeader: '=?',
                /* Unimplemented yet. By default false */
                showFilter: '=?',
                /* Flag to show the footer rows. By default true */
                showFooter: '=?',

                /* Number of left fixed columns. By default 1 */
                leftColumnNumber: '=?',
                /* Widths of the fixed left columns. */
                leftColumnWidths: '=?',
                /* Number of center variable columns. By default 10 */
                centerColumnNumber: '=',
                /* Widths of the center variable columns. */
                centerColumnWidths: '=?',
                /* Number of right fixed columns. By default 1 */
                rightColumnNumber: '=?',
                /* Widths of the fixed right columns. */
                rightColumnWidths: '=?',

                /* Number of rows in the header. By default 1 */
                headerRowNumber: '=?',
                /* Heights of the header rows (array or single value). No default (min-height:10px) */
                headerRowHeights: '=?',
                /* Number of rows in the middle. By default 10 */
                rowNumber: '=?',
                /* Heights of the middle rows (array or single value). No default (min-height:10px) */
                rowHeights: '=?',
                /* Number of rows in the footer. By default 1 */
                footerRowNumber: '=?',
                /* Heights of the footer rows (array or single value). No default (min-height:10px) */
                footerRowHeights: '=?',

                /* Let read or set the vertical data position in the middle center part */
                scrollTopPosition: '=?',
                /* Let read or set the horizontal data position in the middle center part */
                scrollLeftPosition: '=?',

                /* Let read or set the vertical data position in the middle center part */
                $$scrollTopPosition: '=?',
                /* Let read or set the horizontal data position in the middle center part */
                $$scrollLeftPosition: '=?',

                $$contentHeight: '=?',
                $$contentWidth: '=?'

            },
            restrict: 'AE',
            replace: true,
            transclude: true,
            template: $templateCache.get('ngc.table.tpl.html'),
            compile: compile,
            controller: controllerDecl
        };
    }])
        /* Internal directive for range declarations */
        .directive('ngcRange', function () {
            return {
                require: "^ngcTable",
                restrict: 'AE',
                scope: {
                    /* Top position of the range in data space */
                    top: '=',
                    /* Bottom position of the range in data space */
                    bottom: '=',
                    /* Left position of the range in data space */
                    left: '=',
                    /* Right position of the range in data space */
                    right: '=',
                    /* Format function for the cells enclosed in the range */
                    formatFn: '=?',
                    /* Function to insert custom sanitized HTML in the range */
                    customHtmlFn: '=?',
                    /* Function to insert custom trusted HTML in the range */
                    customTrustedHtmlFn: '=?',
                    /* URL string of a custom template to render the cell contents.
                     Can also be a Function instead, with the following signature: function(rawData, row, col, formattedValue, scope) */
                    customCellTemplate: '=?',
                    /* CSS class to be added to the cells */
                    clazz: '=?',
                    /* Direct CSS styling to be injected in the cells */
                    style: '=?',
                    /* CSS style additional declaration to be added to the cell */
                    styleFn: '=?',
                    /* Callback for the 'click' event */
                    clickFn: '=?',
                    /* Callback for the 'dblclick' event */
                    dblclickFn: '=?',
                    /* Callback for the 'keydown' event */
                    keydownFn: '=?',
                    /* Callback for the 'keypress' event */
                    keypressFn: '=?',
                    /* Callback for the 'keyup' event */
                    keyupFn: '=?',
                    /* Callback for the 'mousedown' event */
                    mousedownFn: '=?',
                    /* Callback for the 'mouseenter' event */
                    mouseenterFn: '=?',
                    /* Callback for the 'mouseleave' event */
                    mouseleaveFn: '=?',
                    /* Callback for the 'mousemove' event */
                    mousemoveFn: '=?',
                    /* Callback for the 'mouseover' event */
                    mouseoverFn: '=?',
                    /* Callback for the 'mouseup' event */
                    mouseupFn: '=?'
                },
                link: function (scope, element, attrs, parentCtrl) {
                    /*
                     On the linking (post-compile) step, call the parent (ngc-table) controller to register the
                     current range
                     */
                    parentCtrl.addRange({
                        top: scope.top,
                        bottom: scope.bottom,
                        left: scope.left,
                        right: scope.right,
                        formatFn: scope.formatFn,
                        clazz: scope.clazz,
                        styleFn: scope.styleFn,
                        style: scope.style,
                        customHtmlFn: scope.customHtmlFn,
                        customTrustedHtmlFn: scope.customTrustedHtmlFn,
                        customCellTemplate: scope.customCellTemplate,
                        click: scope.clickFn,
                        dblclick: scope.dblclickFn,
                        keydown: scope.keydownFn,
                        keypress: scope.keypressFn,
                        keyup: scope.keyupFn,
                        mousedown: scope.mousedownFn,
                        mouseenter: scope.mouseenterFn,
                        mouseleave: scope.mouseleaveFn,
                        mousemove: scope.mousemoveFn,
                        mouseover: scope.mouseoverFn,
                        mouseup: scope.mouseupFn,
                        touchstart: scope.touchstartFn,
                        touchmove: scope.touchmoveFn,
                        touchend: scope.touchendFn
                    });
                }
            };
        })

    /**
     * @name extInclude
     * Extended version of ngInclude where we can also specify an additional scope variable as 'scopeExtension'.
     * Can only be used as an Attribute.
     *
     * @param {string} extInclude Angular expression evaluating to a template URL
     * @param {string} scopeExtension Angular expression evaluating to an object. Its value will be available in the
     *                                inner scope of the directive.
     */
        .directive('extInclude', [
            function () {
                // List of attributes to map to the scope
                var attrToMap = ['extInclude', 'scopeExtension'];

                /**
                 * Sets a given attribute onto the scope after evaluating it and watch for future value changes
                 * @param {Object} scope
                 * @param {Object} attr
                 * @param {string} attrName
                 * @return {void}
                 */
                var setupScopeVar = function (scope, attr, attrName) {
                    scope.$watch(attr[attrName], function (newValue, oldValue) {
                        if (newValue === oldValue) {
                            return;
                        }
                        scope[attrName] = newValue;
                    }, true);
                    scope[attrName] = scope.$eval(attr[attrName]);
                };

                return {
                    restrict: 'A',
                    template: '<ng-include src="extInclude"></ng-include>',
                    scope: true,
                    link: function (scope, element, attr) {
                        for (var i = 0, len = attrToMap.length; i < len; i++) {
                            setupScopeVar(scope, attr, attrToMap[i]);
                        }
                    }
                };
            }
        ]);
})();
angular.module('ngc-template', ['ngc.table.tpl.html']);

angular.module("ngc.table.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ngc.table.tpl.html",
    "<div class=\"ngc table\">\n" +
    "    <div ng-transclude style=\"display: hidden\"></div>\n" +
    "\n" +
    "    <div class=\"ngc scroll-wrapper\" ng-scrollable=\"{updateContentPosition:false, enableKinetic:false, wheelSpeed:1}\"\n" +
    "         spy-x=\"$$scrollLeftPosition\"\n" +
    "         spy-y=\"$$scrollTopPosition\"\n" +
    "         spy-custom-content-width=\"$$contentWidth\"\n" +
    "         spy-custom-content-height=\"$$contentHeight\"\n" +
    "            >\n" +
    "        <table class=\"ngc\">\n" +
    "            <!-- Column Names -->\n" +
    "            <tr class=\"ngc row column-names\" ng-show=\"{{showColumnNames}}\"  ng-class=\"{first: $first, last: $last}\">\n" +
    "                <!-- Cells for row headers columns -->\n" +
    "                <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc row-header column-name cell {{column.clazz}}\"\n" +
    "                    style=\"{{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content\" style=\"{{column.style}}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for left fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc left column-name cell {{$$leftColumnNames[$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$leftColumnNames[$index].style}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content\" style=\"{{column.style}}\">{{$$leftColumnNames[$index].value}}</div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for middle variable columns -->\n" +
    "                <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc center column-name cell {{$$centerColumnNames[$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$centerColumnNames[$index].style}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content\" style=\"{{column.style}}\">{{$$centerColumnNames[$index].value}}</div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for right fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc right column-name cell {{$$rightColumnNames[$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$rightColumnNames[$index].style}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content\" style=\"{{column.style}}\">{{$$rightColumnNames[$index].value}}</div>\n" +
    "                </td>\n" +
    "\n" +
    "            </tr>\n" +
    "\n" +
    "            <!-- Headers -->\n" +
    "            <tr class=\"ngc row header\"  ng-show=\"{{showHeader}}\" ng-repeat=\"row in $$headerRows\" ng-class=\"{first: $first, last: $last}\">\n" +
    "                <!-- Cells for row headers columns -->\n" +
    "                <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                     class=\"ngc row-header header cell {{$$topLeftRowHeadersData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                     style=\"{{$$topLeftRowHeadersData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\" >{{$$topLeftRowHeadersData[$parent.$index][$index].value}}</div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for left fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc left header cell {{$$topLeftData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$topLeftData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$topLeftData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$topLeftData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$topLeftData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$topLeftData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$topLeftData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for middle variable columns -->\n" +
    "                <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc center header cell {{$$topCenterData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$topCenterData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$topCenterData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$topCenterData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$topCenterData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$topCenterData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$topCenterData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for right fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc right header cell {{$$topRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$topRightData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$topRightData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$topRightData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$topRightData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$topRightData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$topRightData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "\n" +
    "            </tr>\n" +
    "\n" +
    "            <!-- Middle -->\n" +
    "            <tr class=\"ngc row middle\" ng-repeat=\"row in $$rows\" ng-class=\"{first: $first, last: $last}\">\n" +
    "                <!-- Cells for row headers columns -->\n" +
    "                <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc row-header middle cell {{$$middleLeftRowHeadersData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$middleLeftRowHeadersData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$middleLeftRowHeadersData[$parent.$index][$index].value}}</div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for left fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc left middle cell {{$$middleLeftData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$middleLeftData[$parent.$index][$index].style}} ; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$middleLeftData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$middleLeftData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$middleLeftData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$middleLeftData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$middleLeftData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for middle variable columns -->\n" +
    "                <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc center cell middle {{$$middleCenterData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$middleCenterData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$middleCenterData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$middleCenterData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$middleCenterData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$middleCenterData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$middleCenterData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for right fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc right cell middle {{$$middleRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$middleRightData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$middleRightData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$middleRightData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$middleRightData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$middleRightData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$middleRightData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "            </tr>\n" +
    "\n" +
    "            <!-- Bottom -->\n" +
    "            <tr class=\"ngc row footer\" ng-repeat=\"row in $$footerRows\" ng-class=\"{first: $first, last: $last}\">\n" +
    "                <!-- Cells for row headers columns -->\n" +
    "                <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc row-header footer cell {{$$bottomLeftRowHeadersData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$bottomLeftRowHeadersData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$bottomLeftRowHeadersData[$parent.$index][$index].value}}</div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for left fixed columns -->\n" +
    "                <td  ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                     ng-click=\"$$dispatchEvent('click', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-keydown=\"$$dispatchEvent('keydown', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-keypress=\"$$dispatchEvent('keypress', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-keyup=\"$$dispatchEvent('keyup', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                     ng-class=\"{first: $first, last: $last}\"\n" +
    "                     class=\"ngc left footer cell {{$$bottomLeftData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                     style=\"{{$$bottomLeftData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$bottomLeftData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$bottomLeftData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$bottomLeftData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$bottomLeftData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$bottomLeftData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for middle variable columns -->\n" +
    "                <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc center footer cell {{$$bottomCenterData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$bottomCenterData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$bottomCenterData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$bottomCenterData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$bottomCenterData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$bottomCenterData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$bottomCenterData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for right fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                    ng-click=\"$$dispatchEvent('click', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-keydown=\"$$dispatchEvent('keydown', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-keypress=\"$$dispatchEvent('keypress', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-keyup=\"$$dispatchEvent('keyup', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                    ng-class=\"{first: $first, last: $last}\"\n" +
    "                    class=\"ngc right footer cell {{$$bottomRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{$$bottomRightData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                    <div class=\"ngc cell-content ngc-custom-html\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"!$$bottomRightData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ng-bind-html=\"$$bottomRightData[$parent.$parent.$index][$index].customHTML\"></div>\n" +
    "                    <div class=\"ngc cell-content ngc-custom-cell-template\" style=\"{{row.height}}; {{column.style}}\"\n" +
    "                         ng-if=\"$$bottomRightData[$parent.$index][$index].customCellTemplate\"\n" +
    "                         ext-include=\"$$bottomRightData[row.index][$index].customCellTemplate\"\n" +
    "                         scope-extension=\"{'rawCellData': $$bottomRightData[row.index][$index]}\"></div>\n" +
    "                </td>\n" +
    "\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>");
}]);
/* =========================================================
 * ng-scrollable.js v0.2.0
 * http://github.com/echa/ng-scrollable
 * =========================================================
 * Copyright 2014-2015 Alexander Eichhorn
 *
 * The MIT License (MIT) Copyright (c) 2014-2015 Alexander Eichhorn.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * ========================================================= */

angular.module('ngScrollable', [])

.directive('ngScrollable', ['$injector', function ($injector) {
    'use strict';

    // dependencies
    var $document        = $injector.get('$document');
    var $interval        = $injector.get('$interval');
    var $timeout         = $injector.get('$timeout');
    var $window          = $injector.get('$window');
    var $parse           = $injector.get('$parse');
    var extend           = angular.extend;
    var element          = angular.element;
    var isDefined        = angular.isDefined;
    var isTouchDevice    = typeof $window.ontouchstart !== 'undefined';
    var xform            = 'transform';

    // use requestAnimationFrame for kinetic scrolling
    var $$rAF = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame;

    // Angular used to contain an internal service that is using a task queue
    // in 1.4.x which makes it incompatible with smooth scrolling
    //
    // var $$rAF            = $injector.get('$$rAF');

    // find the correct CSS transform feature class name
    ['webkit', 'moz', 'o', 'ms'].every(function (prefix) {
      var e = prefix + 'Transform';
      var body = $document.find('body').eq(0);
      if (typeof body[0].style[e] !== 'undefined') {
        xform = e;
        return false;
      }
      return true;
    });

    var defaultOpts = {
      id: 0,
      scrollX: 'bottom',
      scrollY: 'right',
      scrollXSlackSpace: 0,
      scrollYSlackSpace: 0,
      scrollXAlways: false,
      scrollYAlways: false,
      usePadding: false,
      wheelSpeed: 1,
      minSliderLength: 10,
      useBothWheelAxes: false,
      useKeyboard: true,
      updateOnResize: true,
      kineticTau: 325,
      enableKinetic:true,
      updateContentPosition:true
    };

    return {
      restrict: 'A',
      transclude: true,
      template: "<div class=\"scrollable\"><div class=\"scrollable-content\" ng-transclude></div><div class='scrollable-bar scrollable-bar-x'><div class='scrollable-slider'></div></div><div class='scrollable-bar scrollable-bar-y'><div class='scrollable-slider'></div></div></div>",
      link: function ($scope, elem, attrs) {
        var
        config = extend({}, defaultOpts, $scope.$eval(attrs.ngScrollable)),
        el = element(elem.children()[0]),
        dom = {
          window: element($window),
          el: el,
          content: element(el.children()[0]),
          barX: element(el.children()[1]),
          barY: element(el.children()[2]),
          sliderX: element(element(el.children()[1]).children()[0]),
          sliderY: element(element(el.children()[2]).children()[0])
        },
        isXActive = false,
        isYActive = false,
        containerWidth = 0,
        containerHeight = 0,
        contentWidth = 0,
        contentHeight = 0,
        customContentWidth = 0,
        customContentHeight = 0,
        contentTop = 0,
        contentLeft = 0,
        xSliderWidth = 0,
        xSliderLeft = 0,
        ySliderHeight = 0,
        ySliderTop = 0,
        dragStartLeft = null,
        dragStartPageX = null,
        dragStartTop = null,
        dragStartPageY = null,
        isXScrolling = false,
        isYScrolling = false,
        hovered = false,
        activeTimeout,
        spySetter = {},
        // kinetic scrolling
        velocityX = 0,
        amplitudeX = 0,
        frameX = 0,
        targetX = 0,
        velocityY = 0,
        amplitudeY = 0,
        frameY = 0,
        targetY = 0,
        trackTime,
        trackerTimeout,

        toPix = function (v) { return v.toFixed(3) + 'px'; },
        clamp = function (val, min, max) {
          return Math.max(min, Math.min(val, max));
        },
        updateSliderX = function () {
          // adjust container width by the amount of border pixels so that the
          // slider does not extend outside the bar region
          var cw = containerWidth - 3;
          if (isXActive) {
            xSliderWidth = Math.max(config.minSliderLength, parseInt(cw * cw / contentWidth, 10));
            xSliderLeft = parseInt(contentLeft * (cw - xSliderWidth) / (contentWidth - cw), 10);

            if (xSliderLeft >= cw - xSliderWidth) {
              xSliderLeft = cw - xSliderWidth;
            } else if (xSliderLeft < 0) {
              xSliderLeft = 0;
            }
            dom.sliderX[0].style[xform] = 'translate3d(' + toPix(xSliderLeft) + ',0,0)';
            dom.sliderX[0].style.width = toPix(xSliderWidth);
          } else {
            xSliderWidth = xSliderLeft = 0;
            dom.sliderX[0].style[xform] = 'translate3d(0,0,0)';
            dom.sliderX[0].style.width = '0';
          }
        },
        updateSliderY = function () {
          // adjust container height by the amount of border pixels so that the
          // slider does not extend outside the bar region
          var ch = containerHeight - 3;
          if (isYActive) {
            ySliderHeight = Math.max(config.minSliderLength, parseInt(ch * ch / contentHeight, 10));
            ySliderTop = parseInt(contentTop * (ch - ySliderHeight) / (contentHeight - ch), 10);

              if (ySliderTop >= ch - ySliderHeight) {
                ySliderTop = ch - ySliderHeight;
              } else if (ySliderTop < 0) {
                ySliderTop = 0;
              }
              dom.sliderY[0].style[xform] = 'translate3d(0,' + toPix(ySliderTop) + ',0)';
              dom.sliderY[0].style.height = toPix(ySliderHeight);
            } else {
              ySliderTop = ySliderHeight = 0;
              dom.sliderY[0].style[xform] = 'translate3d(0,0,0)';
              dom.sliderY[0].style.height = '0';
            }
          },
          updateBarX = function () {
            var showAlways = config.scrollXAlways,
                scrollbarXStyles = {left: 0, width: toPix(containerWidth), display: isXActive || showAlways ? "inherit" : "none"};
            switch (config.scrollX) {
              case 'bottom':
                scrollbarXStyles.bottom = 0;
                dom.content[isXActive || showAlways ? 'addClass' : 'removeClass']('scrollable-bottom');
                dom.barX[isXActive || showAlways ? 'addClass' : 'removeClass']('scrollable-bottom');
                break;
              case 'top':
                scrollbarXStyles.top = 0;
                dom.content[isXActive || showAlways ? 'addClass' : 'removeClass']('scrollable-top');
                dom.barX[isXActive || showAlways ? 'addClass' : 'removeClass']('scrollable-top');
                break;
            }
            dom.barX.css(scrollbarXStyles);
            dom.sliderX[0].style.display = isXActive ? 'inherit' : 'none';
          },
          updateBarY = function () {
            var showAlways = config.scrollYAlways,
                scrollbarYStyles = {top: 0, height: toPix(containerHeight), display: isYActive || showAlways ? "inherit" : "none"};
            switch (config.scrollY) {
              case 'right':
                scrollbarYStyles.right = 0;
                dom.content[isYActive || showAlways ? 'addClass' : 'removeClass']('scrollable-right');
                dom.barY[isYActive || showAlways ? 'addClass' : 'removeClass']('scrollable-right');
                break;
              case 'left':
                scrollbarYStyles.left = 0;
                dom.content[isYActive || showAlways ? 'addClass' : 'removeClass']('scrollable-left');
                dom.barY[isYActive || showAlways ? 'addClass' : 'removeClass']('scrollable-left');
                break;
            }
            dom.barY.css(scrollbarYStyles);
            dom.sliderY[0].style.display = isYActive ? 'inherit' : 'none';
          },
          scrollTo = function (left, top) {
            // clamp to 0 .. content{Height|Width} - container{Height|Width}
            contentTop = clamp(top, 0, contentHeight - containerHeight);
            contentLeft = clamp(left, 0, contentWidth - containerWidth);

            if (config.updateContentPosition) {
              dom.content[0].style[xform] = 'translate3d(' + toPix(-contentLeft) + ',' + toPix(-contentTop) + ',0)';
            }


            // update external scroll spies
            if (spySetter.spyX) {
              spySetter.spyX($scope, parseInt(contentLeft, 10));
            }
            if (spySetter.spyY) {
              spySetter.spyY($scope, parseInt(contentTop, 10));
            }
            if (spySetter.spyCustomContentHeight) {
              spySetter.spyCustomContentHeight($scope, parseInt(customContentHeight));
            }
            if (spySetter.spyCustomContentWidth) {
              spySetter.spyCustomContentWidth($scope, parseInt(customContentWidth));
            }
          },
          scrollX = function (pos) {
            if (!isXActive) { return; }
            scrollTo(pos, contentTop);
            updateSliderX();
          },
          scrollY = function (pos) {
            if (!isYActive) { return; }
            scrollTo(contentLeft, pos);
            updateSliderY();
          },
          refresh = function (event, noNotify) {
            // read DOM
            containerWidth = config.usePadding ? dom.el[0].clientWidth : dom.el[0].offsetWidth; // innerWidth() : elm[0].width();
            containerHeight = config.usePadding ? dom.el[0].clientHeight : dom.el[0].offsetHeight; // elm[0].innerHeight() : elm[0].height();
            contentWidth = angular.isDefined(customContentWidth) ? customContentWidth : dom.content[0].scrollWidth;
            contentHeight = angular.isDefined(customContentHeight) ? customContentHeight : dom.content[0].scrollHeight;

            // activate scrollbars
            if (config.scrollX !== 'none' && containerWidth + config.scrollXSlackSpace < contentWidth) {
              isXActive = true;
            }
            else {
              isXActive = false;
              scrollX(0);
            }

            if (config.scrollY !== 'none' && containerHeight + config.scrollYSlackSpace < contentHeight) {
              isYActive = true;
            }
            else {
              isYActive = false;
              scrollY(0);
            }

            // update UI
            updateBarX();
            updateBarY();
            updateSliderX();
            updateSliderY();

            // broadcast the new dimensions down the scope stack so inner content
            // controllers can react appropriatly
            if (!noNotify) {
              $scope.$broadcast('scrollable.dimensions', containerWidth, containerHeight, contentWidth, contentHeight, config.id);
            }
          },
          stop = function (e, prevent) {
            e.stopPropagation();
            if (prevent) { e.preventDefault(); }
            return false;
          },
          ypos = function (e) {
            e = e.originalEvent || e;
            // touch event
            if (e.targetTouches && (e.targetTouches.length >= 1)) {
              return e.targetTouches[0].pageY;
            }
            // mouse event
            return e.pageY;
          },
          xpos = function (e) {
            e = e.originalEvent || e;
            // touch event
            if (e.targetTouches && (e.targetTouches.length >= 1)) {
              return e.targetTouches[0].pageX;
            }
            // mouse event
            return e.pageX;
          },
          track = function () {
            var now, elapsed, delta, v;

            now = Date.now();
            elapsed = now - trackTime;
            trackTime = now;

            // X
            delta = contentLeft - frameX;
            frameX = contentLeft;
            v = 1000 * delta / (1 + elapsed);
            velocityX = 0.8 * v + 0.2 * velocityX;
            // Y
            delta = contentTop - frameY;
            frameY = contentTop;
            v = 1000 * delta / (1 + elapsed);
            velocityY = 0.8 * v + 0.2 * velocityY;

          },
          autoScrollX = function () {
            var elapsed, delta;
            if (amplitudeX) {
              elapsed = Date.now() - trackTime;
              delta = -amplitudeX * Math.exp(-elapsed / config.kineticTau);
              if (delta > 0.5 || delta < -0.5) {
                scrollX(targetX + delta);
                $$rAF(autoScrollX);
              } else {
                scrollX(targetX);
              }
            }
          },
          autoScrollY = function () {
            var elapsed, delta;
            if (amplitudeY) {
              elapsed = Date.now() - trackTime;
              delta = -amplitudeY * Math.exp(-elapsed / config.kineticTau);
              if (delta > 0.5 || delta < -0.5) {
                scrollY(targetY + delta);
                $$rAF(autoScrollY);
              } else {
                scrollY(targetY);
              }
            }
          },
          onMouseDownX = function (e) {
            dragStartPageX = xpos(e);
            dragStartLeft = contentLeft;
            isXScrolling = true;
            velocityX = amplitudeX = 0;
            frameX = contentLeft;
            if (!trackerTimeout) { trackerTimeout = $interval(track, 100); }
            dom.el.addClass('active');
            return isTouchDevice || stop(e, !isTouchDevice);
          },
          onMouseMoveX = function (e) {
            if (isXScrolling) {
              // scale slider move to content width
              var deltaSlider = xpos(e) - dragStartPageX,
                  deltaContent = isTouchDevice ? -deltaSlider : parseInt(deltaSlider * (contentWidth - containerWidth) / (containerWidth - xSliderWidth), 10);
              scrollX(dragStartLeft + deltaContent);
              return isTouchDevice || stop(e, true);
            }
          },
          onMouseUpX = function (e) {
            if (isXScrolling) {
              isXScrolling = false;
              dom.el.removeClass('active');
              dragStartLeft = dragStartPageX = null;
            }
            // kinetic scroll
            if (config.enableKinetic) {
              if (trackerTimeout) {
                $interval.cancel(trackerTimeout);
                trackerTimeout = null;
              }
              if (velocityX > 10 || velocityX < -10) {
                amplitudeX = 0.8 * velocityX;
                targetX = Math.round(contentLeft + amplitudeX);
                trackTime = Date.now();
                $$rAF(autoScrollX);
              }
          }
            return isTouchDevice || stop(e, !isTouchDevice);
          },
          onMouseDownY = function (e) {
            dragStartPageY = ypos(e);
            dragStartTop = contentTop;
            isYScrolling = true;
            velocityY = amplitudeY = 0;
            frameY = contentTop;
            if (!trackerTimeout) { trackerTimeout = $interval(track, 100); }
            dom.el.addClass('active');
            return isTouchDevice || stop(e, !isTouchDevice);
          },
          onMouseMoveY =  function (e) {
            if (isYScrolling) {
              var deltaSlider = ypos(e) - dragStartPageY,
                  deltaContent = isTouchDevice ? -deltaSlider : parseInt(deltaSlider * (contentHeight - containerHeight) / (containerHeight - ySliderHeight), 10);
              scrollY(dragStartTop + deltaContent);
              return isTouchDevice || stop(e, true);
            }
          },
          onMouseUpY =  function (e) {
            if (isYScrolling) {
              isYScrolling = false;
              dom.el.removeClass('active');
              dragStartTop = dragStartPageY = null;
            }
            // kinetic scroll
            if (config.enableKinetic) {
              if (trackerTimeout) {
                $interval.cancel(trackerTimeout);
                trackerTimeout = null;
              }
              if (velocityY > 10 || velocityY < -10) {
                amplitudeY = 0.8 * velocityY;
                targetY = Math.round(contentTop + amplitudeY);
                trackTime = Date.now();
                $$rAF(autoScrollY);
              }
            }
            return isTouchDevice || stop(e, true);
          },
      // Get Offset without jquery
      // element.prop('offsetTop')
      // element[0].getBoundingClientRect().top
          clickBarX = function (e) {
            var halfOfScrollbarLength = parseInt(xSliderWidth / 2, 10),
                positionLeft = e.clientX - dom.barX[0].getBoundingClientRect().left - halfOfScrollbarLength,
                maxPositionLeft = containerWidth - xSliderWidth,
                positionRatio = clamp(positionLeft / maxPositionLeft, 0, 1);
            scrollX((contentWidth - containerWidth) * positionRatio);
            $scope.$digest();
          },
          clickBarY = function (e) {
            var halfOfScrollbarLength = parseInt(ySliderHeight / 2, 10),
                positionTop = e.clientY - dom.barY[0].getBoundingClientRect().top - halfOfScrollbarLength,
                maxPositionTop = containerHeight - ySliderHeight,
                positionRatio = clamp(positionTop / maxPositionTop, 0, 1);
            scrollY((contentHeight - containerHeight) * positionRatio);
            $scope.$digest();
          },
          hoverOn = function () { hovered = true; },
          hoverOff = function () { hovered = false; },
          handleKey = function (e) {
            var deltaX = 0, deltaY = 0, s = 30;
            if (!hovered || $document[0].activeElement.isContentEditable ||
                e.altKey || e.ctrlKey || e.metaKey) {
              return;
            }

            switch (e.which) {
              case 37: // left
                deltaX = -s;
                break;
              case 38: // up
                deltaY = s;
                break;
              case 39: // right
                deltaX = s;
                break;
              case 40: // down
                deltaY = -s;
                break;
              case 33: // page up
                deltaY = containerHeight;
                break;
              case 32: // space bar
              case 34: // page down
                deltaY = -containerHeight;
                break;
              case 35: // end
                if (isYActive && !isXActive) {
                  deltaY = -contentHeight;
                } else {
                  deltaX = containerHeight;
                }
                break;
              case 36: // home
                if (isYActive && !isXActive) {
                  deltaY = contentHeight;
                } else {
                  deltaX = -containerHeight;
                }
                break;
              default:
                return;
            }

            scrollY(contentTop - deltaY);
            scrollX(contentLeft + deltaX);

            // prevent default scrolling
            e.preventDefault();
            $scope.$digest();
          },
          handleWheel = function (e) {
            // with jquery use e.originalEvent.deltaX!!!
            e = e.originalEvent || e;
            var deltaX = e.deltaX * config.wheelSpeed,
                deltaY = e.deltaY * config.wheelSpeed;

            // avoid flickering in Chrome: disabled animated translate
            dom.el.addClass('active');
            $timeout.cancel(activeTimeout);
            activeTimeout = $timeout(function () {dom.el.removeClass('active'); }, 500);

            if (!config.useBothWheelAxes) {
              // deltaX will only be used for horizontal scrolling and deltaY will
              // only be used for vertical scrolling - this is the default
              scrollY(contentTop + deltaY);
              scrollX(contentLeft + deltaX);
            } else if (isYActive && !isXActive) {
              // only vertical scrollbar is active and useBothWheelAxes option is
              // active, so let's scroll vertical bar using both mouse wheel axes
              if (deltaY) {
                scrollY(contentTop + deltaY);
              } else {
                scrollY(contentTop + deltaX);
              }
            } else if (isXActive && !isYActive) {
              // useBothWheelAxes and only horizontal bar is active, so use both
              // wheel axes for horizontal bar
              if (deltaX) {
                scrollX(contentLeft + deltaX);
              } else {
                scrollX(contentLeft + deltaY);
              }
            }

            // prevent default scrolling
            stop(e, true);
            $scope.$digest();
          },

          registerHandlers = function () {
            // bind DOM element handlers
            if (config.updateOnResize) { dom.window.on('resize', refresh); }

            if (config.scrollX !== 'none') {

              // scrollbar clicks
              dom.sliderX.on('click', stop);
              dom.barX.on('click',    clickBarX);

              if (isTouchDevice) {

                // content touch/drag
                dom.el.on('touchstart', onMouseDownX);
                dom.el.on('touchmove',  onMouseMoveX);
                dom.el.on('touchend',   onMouseUpX);

              } else {

                // slider drag
                dom.sliderX.on('mousedown', onMouseDownX);
                $document.on('mousemove', onMouseMoveX);
                $document.on('mouseup',   onMouseUpX);

              }
            }

            if (config.scrollY !== 'none') {

              // scrollbar clicks
              dom.sliderY.on('click', stop);
              dom.barY.on('click',    clickBarY);


              if (isTouchDevice) {

                // content touch/drag
                dom.el.on('touchstart', onMouseDownY);
                dom.el.on('touchmove',  onMouseMoveY);
                dom.el.on('touchend',   onMouseUpY);

              } else {

                // slider drag
                dom.sliderY.on('mousedown', onMouseDownY);
                $document.on('mousemove',   onMouseMoveY);
                $document.on('mouseup',     onMouseUpY);

              }
            }

            // mouse wheel
            if (!isTouchDevice) {
              dom.el.on('wheel',      handleWheel);
            }

            // keyboard
            if (config.useKeyboard && !isTouchDevice) {
              dom.el.on('mouseenter', hoverOn);
              dom.el.on('mouseleave', hoverOff);
              $document.on('keydown', handleKey);
            }

          },

          unregisterHandlers = function () {
            if (config.updateOnResize) { dom.window.off('resize', refresh); }

            dom.sliderX.off('click', stop);
            dom.barX.off('click',    clickBarX);
            dom.sliderY.off('click', stop);
            dom.barY.off('click',    clickBarY);

            // touch
            if (isTouchDevice) {
              dom.el.off('touchstart', onMouseDownX);
              dom.el.off('touchmove',  onMouseMoveX);
              dom.el.off('touchend',   onMouseUpX);
              dom.el.off('touchstart', onMouseDownY);
              dom.el.off('touchmove',  onMouseMoveY);
              dom.el.off('touchend',   onMouseUpY);
            } else {

              // slider drag
              dom.sliderX.off('mousedown', onMouseDownX);
              $document.off('mousemove',   onMouseMoveX);
              $document.off('mouseup',     onMouseUpX);

              dom.sliderY.off('mousedown', onMouseDownY);
              $document.off('mousemove',   onMouseMoveY);
              $document.off('mouseup',     onMouseUpY);

              // keyboard
              if (config.useKeyboard) {
                // mouse hovering activates keyboard capture
                dom.el.off('mouseenter', hoverOn);
                dom.el.off('mouseleave', hoverOff);
                $document.off('keydown', handleKey);
              }

              // mouse wheel
              dom.el.off('wheel',      handleWheel);
            }

          };


      $scope.$on('content.reload', function (e, noNotify) {

        // try unregistering event handlers
        unregisterHandlers();

        // defer to next digest
        $timeout(function () {

          // update DOM node reference (because ui-view replaces nodes)
          dom.el = element(elem.children()[0]);
          dom.content = element(dom.el.children()[0]);

          // register handlers
          registerHandlers();

          // refresh scrollbars
          refresh(e, noNotify);

        });

      });

      // sent by controllers of transcluded content on change
      $scope.$on('content.changed', function (e, wait, noNotify) {

        // ms to wait before refresh
        wait = wait || 100;

        // defer to next digest
        $timeout(function () {

          // refresh scrollbars
          refresh(e, noNotify);

        }, wait);

        e.preventDefault();
      });


      // may be broadcast from outside to scroll to content edges
      $scope.$on('scrollable.scroll.left', function () {
        // defer to next digest
        $scope.$applyAsync(function () { scrollX(0); });
      });

      $scope.$on('scrollable.scroll.right', function () {
        // defer to next digest
        $scope.$applyAsync(function () { scrollX(contentWidth); });
      });

      $scope.$on('scrollable.scroll.top', function () {
        // defer to next digest
        $scope.$applyAsync(function () { scrollY(0); });
      });

      $scope.$on('scrollable.scroll.bottom', function () {
        // defer to next digest
        $scope.$applyAsync(function () { scrollY(contentHeight); });
      });

      // (un)register event handlers on scope destroy
      $scope.$on('$destroy', function () {
        $timeout.cancel(activeTimeout);
        unregisterHandlers();
      });

      // init
      registerHandlers();
      refresh();

      // watch and set spy attribute value expressions
      angular.forEach(['spyX', 'spyY', 'spyCustomContentHeight', 'spyCustomContentWidth'], function (attr) {
        if (attrs[attr]) {
          // keep a setter to the spy expression (if settable)
          spySetter[attr] = $parse(attrs[attr]).assign;
          // watch the spy expression
          $scope.$watch(attrs[attr], function (val) {
            switch (attr) {
              case 'spyX' :
                scrollX(val);
                break;
              case 'spyY' :
                scrollY(val);
                break;
              case 'spyCustomContentHeight' :
                customContentHeight = val;
                refresh(null, null);
                break;
              case 'spyCustomContentWidth' :
                customContentWidth = val;
                refresh(null, null);
                break;

            }
          });
        }
      });
    }
  };
}
]);
