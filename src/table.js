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
