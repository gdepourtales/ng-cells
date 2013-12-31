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

angular.module('ngcTableDirective', ['ngc-template'])
    .directive('ngcTable', ['$templateCache', '$timeout', function($templateCache, $timeout) {


        /**
         * ngcTable Controller declaration. The format is given to be able to minify the directive. The scope is
         * injected.
         * @type {*[]}
         */
        var controllerDecl = ['$scope', function($scope) {
            /**
             * Registers a range declaration in the scope
             * @param range The new range declaration
             */
            this.addRange = function(range) {
                $scope.ranges.push(range);
            }
        }];


        function compile(/*tElement, tAttrs*/) {
            return {

                pre: function preLink(scope /*, iElement, iAttrs, controller */) {
                    var i;

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
                                    style: $$getStyleDecl('width', widths, i)
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
                    $$createColumns(scope.leftColumnNumber, scope.$$leftFixedColumns, scope.leftColumnWidths);
                    /**
                     * Variable center column definitions
                     * @type {Array}
                     */
                    scope.$$variableCenterColumns = [];
                    /* Create the columns based on directive parameters */
                    $$createColumns(scope.centerColumnNumber, scope.$$variableCenterColumns, scope.centerColumnWidths);
                    /**
                     * Right fixed columns definitions
                     * @type {Array}
                     */
                    scope.$$rightFixedColumns = [];
                    /* Create the columns based on directive parameters */
                    $$createColumns(scope.rightColumnNumber, scope.$$rightFixedColumns, scope.rightColumnWidths);

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


                    /*
                    Register the data function
                     */
                    if (angular.isFunction(scope['dataFn'])) {
                        scope.$$getDataValue = scope['dataFn'];
                    } else {
                        scope.$$getDataValue = function(row, col) {
                            return angular.isArray(this.data[row]) ? this.data[row][col] : undefined;
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
                    scope.$$scrollPosition = {top: 0,left: 0};

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
                     * Flag to show the header rows.
                     * @type {string|.scope.showHeader|showHeader}
                     */
                    scope.showHeader = angular.isDefined(scope.showHeader) ? scope.showHeader : true;

                    /**
                     * Header rows definitions
                     * @type {Array}
                     */
                    scope.$$headerRows = [];

                    /*
                    Initialize the headers rows. By default one is added if no parameter is given
                     */
                    var nHeaderRows = angular.isNumber(scope.headerRowNumber) ? scope.headerRowNumber : 1;
                    for (i = 0; i < nHeaderRows; i++) {
                        var headerRowDef = {
                            index: i,
                            height: $$getStyleDecl('height', scope.headerRowHeights, i)
                        };
                        scope.$$headerRows.push(headerRowDef);
                    }

                    /**
                     * Flag to show the filter rows.
                     * @type {string|.scope.showFilter|showFilter}
                     */
                    scope.showFilter = angular.isDefined(scope.showFilter) ? scope.showFilter : false;


                    /**
                     * Row definitions
                     * @type {Array}
                     */
                    scope.$$rows = [];

                    /*
                     Initialize the rows. By default 10 are added if no parameter is given
                     */
                    var nRows = angular.isDefined(scope.rowNumber) ? scope.rowNumber : 10;
                    for (i = 0; i < nRows; i++) {
                        var rowDef = {
                            index: i,
                            height: $$getStyleDecl('height', scope.rowHeights, i)
                        };
                        scope.$$rows.push(rowDef);
                    }

                    /**
                     * Flag to show the footer rows.
                     * @type {string|.scope.showFilter|showFilter}
                     */
                    scope.showFooter = angular.isDefined(scope.showFooter) ? scope.showFooter : true;

                    /**
                     * Footer row definitions
                     */
                    scope.$$footerRows = [];

                    /*
                     Initialize the footer rows. By default 1 is added if no parameter is given
                     */
                    var nFooterRows = angular.isDefined(scope.footerRowNumber) ? scope.footerRowNumber : 1;
                    for (i = 0; i < nFooterRows; i++) {
                        var footerRowDef = {
                            index: i,
                            height: $$getStyleDecl('height', scope.footerRowHeights, i)
                        };
                        scope.$$footerRows.push(footerRowDef);
                    }
                },


                post: function postLink(scope, iElement /*, iAttrs, controller*/) {

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
                    function defaultStyleFn(/*data, row, col*/) {return '';}

                    /**
                     * Default format function for the cells content. Returns the raw data
                     * @param data
                     * @returns {*}
                     */
                    function defaultFormatFn(data /*, row, col*/) {return angular.isDefined(data) ? data : '';}


                    /**
                     * Event dispatcher function. Calls the registered event callback
                     * @param eventName the name of the event
                     * @param event the event object as passed by the listener
                     * @param cellData the data registered for the cell
                     */
                    scope.$$dispatchEvent = function(eventName, event, cellData) {
                        /* Only handle callbacks that are actually functions */
                        if (angular.isFunction(cellData.eventCallbacks[eventName])) {
                            /* Save the scroll positions */
                            var verticalScrollPos = this.$$verticalScrollbarWrapperElement.scrollTop;
                            var horizontalScrollPos = this.$$horizontalScrollbarWrapperElement.scrollLeft;

                            /* apply the callback */
                            cellData.eventCallbacks[eventName](event, cellData);

                            /* Restore the scroll positions */
                            this.$$verticalScrollbarWrapperElement.scrollTop = verticalScrollPos;
                            this.$$horizontalScrollbarWrapperElement.scrollLeft = horizontalScrollPos;
                        }
                    };


                    /**
                     * Return the cell data object given the row the column and the scope
                     * @param scope The scope
                     * @param row The row in data space
                     * @param col The column in data space
                     * @returns {{data: *, value: *, class: string, style: string, eventCallbacks: {}, enclosingRanges: Array}}
                     */
                    function $$getCellData(scope, row, col) {
                        /* The additional optional class(es) */
                        var clazz = '';
                        /* The optional style declaration */
                        var styleFn = defaultStyleFn;
                        /* The data format function */
                        var formatFn = defaultFormatFn;
                        /* The data value */
                        var data = scope.$$getDataValue(row, col);
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
                        angular.forEach(scope.ranges, function(range){
                            if (row >= range.top && row < range.bottom
                                && col >= range.left && col < range.right) {
                                /* Register the enclosing range */
                                enclosingRanges.push(range);
                                /* Register the format function */
                                if (angular.isFunction(range.formatFn)) formatFn = range['formatFn'];
                                /* Register the CSS class */
                                if (angular.isString(range.clazz)) clazz = range.clazz;
                                /* Register the CSS style declaration */
                                if (angular.isString(range.styleFn)) styleFn = range['styleFn'];

                                /* Register available event callbacks */
                                angular.forEach(events, function(event) {
                                    if (angular.isFunction(range[event])) eventCallbacks[event] = range[event];
                                });
                            }
                        });

                        return {
                            data: data,
                            value: formatFn(data, row, col),
                            clazz: clazz,
                            style: styleFn(data, row, col),
                            eventCallbacks: eventCallbacks,
                            enclosingRanges: enclosingRanges
                        }
                    }

                    /**
                     * Updates the variable center cells
                     * @param nRows Number of rows
                     * @param centerData The center data part. may be top, middle or bottom
                     * @param dataRowStartIndex The row start index, related to the data part
                     */
                    scope.$$setCenterColumnsData = function(nRows, centerData, dataRowStartIndex) {
                        var col;
                        /* Update the column names */
                        for (col = 0; col < this.$$variableCenterColumns.length; col++) {
                            this.$$centerColumnNames[col] = {
                                value:getLettersForIndex(col + this.$$leftFixedColumns.length + this.$$scrollPosition.left)
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
                    scope.$$setLeftAndRightColumnsData = function(nRows, rowHeadersData, leftData, rightData, dataRowStartIndex) {
                        var col;
                        /* Update the column names on the left */
                        for (col = 0; col < this.$$leftFixedColumns.length; col++) {
                            this.$$leftColumnNames[col] = {
                                value: getLettersForIndex(col)
                            };
                        }

                        /* Update the column names on the right */

                        var startColumnIndex = Math.max(this.data[0].length - this.$$rightFixedColumns.length, this.$$leftFixedColumns.length + this.$$variableCenterColumns.length);

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
                                value:r + 1
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

                    /* Initialize the header parts */
                    scope.$$setCenterColumnsData(scope.headerRowNumber, scope.$$topCenterData, 0);
                    scope.$$setLeftAndRightColumnsData(scope.headerRowNumber, scope.$$topLeftRowHeadersData, scope.$$topLeftData, scope.$$topRightData, 0);

                    /* Initiaize the variable middle parts */
                    scope.$$setCenterColumnsData(scope.rowNumber, scope.$$middleCenterData, scope.headerRowNumber);
                    scope.$$setLeftAndRightColumnsData(scope.rowNumber, scope.$$middleLeftRowHeadersData, scope.$$middleLeftData, scope.$$middleRightData, scope.headerRowNumber);

                    /* Initialize the fixed footer parts */
                    /* The footer start row should be either the total data rows minus the footer height or the number of header rows + the number of rows */
                    var footerStartRow = Math.max(scope.data.length - scope.footerRowNumber, scope.headerRowNumber + scope.rowNumber);
                    scope.$$setCenterColumnsData(scope.footerRowNumber, scope.$$bottomCenterData, footerStartRow);
                    scope.$$setLeftAndRightColumnsData(scope.footerRowNumber, scope.$$bottomLeftRowHeadersData, scope.$$bottomLeftData, scope.$$bottomRightData, footerStartRow);

                    $timeout(function() {
                        iElement.css('min-width', iElement[0].offsetWidth);
                    });
                }
            }
        }

        return {
            scope: {
                /* Data to display */
                data:'=',
                /* Flag to show/hide the column names. By default true */
                showColumnNames:'=?',
                /* Flag to show the row numbers. By default true */
                showRowNumbers:'=?',
                /* Flag to show the header rows. By default true */
                showHeader:'=?',
                /* Unimplemented yet. By default false */
                showFilter:'=?',
                /* Flag to show the footer rows. By default true */
                showFooter:'=?',

                /* Number of left fixed columns. By default 1 */
                leftColumnNumber: '=?',
                /* Widths of the fixed left columns. No default (min-width:10px) */
                leftColumnWidths: '=?',
                /* Number of center variable columns. By default 10 */
                centerColumnNumber: '=',
                /* Widths of the center variable columns. No default (min-width:10px) */
                centerColumnWidths: '=?',
                /* Number of right fixed columns. By default 1 */
                rightColumnNumber: '=?',
                /* Widths of the fixed right columns. No default (min-width:10px) */
                rightColumnWidths: '=?',

                /* Number of rows in the header. By default 1 */
                headerRowNumber:"=?",
                /* Heights of the header rows (array or single value). No default (min-height:10px) */
                headerRowHeights:"=?",
                /* Number of rows in the middle. By default 10 */
                rowNumber:"=",
                /* Heights of the middle rows (array or single value). No default (min-height:10px) */
                rowHeights:"=?",
                /* Number of rows in the footer. By default 1 */
                footerRowNumber:"=?",
                /* Heights of the footer rows (array or single value). No default (min-height:10px) */
                footerRowHeights:"=?"

            },
            restrict:'AE',
            replace:true,
            transclude:true,
            template: $templateCache.get('table.tpl.html'),
            /*template: $templateCache.get('table.tpl.html') ,*/
            compile: compile,
            controller:controllerDecl
        };
    }])
    /* Internal directive for range declarations */
    .directive('ngcRange', function() {
        return {
            require:"^ngcTable",
            restrict:'AE',
            scope:{
                /* Top position of the range in data space */
                top: '=?',
                /* Bottom position of the range in data space */
                bottom: '=?',
                /* Left position of the range in data space */
                left: '=?',
                /* Right position of the range in data space */
                right: '=?',
                /* Format function for the cells enclosed in the range */
                formatFn: '=?',
                /* CSS class to be added to the cells */
                clazz: '=?',
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
                    mouseup: scope.mouseupFn
                });
            }
        };
    })
    .directive('ngcScrollbar', ['$timeout', function($timeout) {
        /* Internal directive for virtual horizontal and vertical scrollbars management */
        return {
            require:"^ngcTable",
            restrict:'A',
            replace:true,
            template:'<div class="ngc"></div>',
            compile: function(tElement, tAttrs) {
                return {
                   pre: function postLink(scope, iElement /*, iAttrs */) {
                       var ratio = 1.0;
                       if (angular.isDefined(tAttrs['horizontal'])) {
                           // The horizontal ratio is the total data column length minus the left columns minus the right
                           // columns divided by the number of visible center columns
                           // The presence of the row numbers at the far right must be considered
                           ratio = (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length) / scope.$$variableCenterColumns.length * 100;
                           iElement.addClass('hscrollbar');
                           iElement.css('width', Math.ceil(ratio) + '%');
                           if (ratio <= 100) iElement.parent().parent().css('display', 'none');
                           // Save the reference to the element in order to manage scroll position
                           // after $apply force the redraw of DIVs
                           scope.$$horizontalScrollbarWrapperElement = iElement.parent()[0];
                       } else
                       if (angular.isDefined(tAttrs['vertical'])) {
                           // The vertical ratio is the number of data rows minus headers and footers divided by the the number
                           // of visible middle rows
                           ratio = (scope.data.length - scope.headerRowNumber - scope.footerRowNumber) / scope.rowNumber * 100;
                           iElement.addClass('vscrollbar');
                           iElement.css('height', ratio + '%');
                           if (ratio <= 100) iElement.parent().css('display', 'none');
                           // Save the reference to the element in order to manage scroll position
                           // after $apply force the redraw of DIVs
                           scope.$parent.$parent.$$verticalScrollbarWrapperElement = iElement.parent()[0];
                       }
                   },
                    post: function postLink(scope, iElement /*, iAttrs*/) {

                        // Handle the scroll event on parent elements
                        iElement.parent().on("scroll", function(e) {

                            var scrollRatio,
                                // Save scroll positions to set them after the call to $apply which
                                // resets the DIVs scroll position
                                verticalScrollPos = scope.$$verticalScrollbarWrapperElement.scrollTop,
                                horizontalScrollPos = scope.$$horizontalScrollbarWrapperElement.scrollLeft;

                            // Detect if horizontal according to the class
                            if (angular.element(e.target).hasClass("horizontal")) {
                                scrollRatio = e.target.scrollLeft / (e.target.scrollWidth);
                                scope.$$scrollPosition.left = Math.round(scrollRatio * (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length));

                                var footerStartRow = Math.max(scope.data.length - scope.footerRowNumber, scope.headerRowNumber + scope.rowNumber);
                                scope.$$setCenterColumnsData(scope.headerRowNumber, scope.$$topCenterData, 0);
                                scope.$$setCenterColumnsData(scope.rowNumber, scope.$$middleCenterData, scope.headerRowNumber + scope.$$scrollPosition.top);
                                scope.$$setCenterColumnsData(scope.footerRowNumber, scope.$$bottomCenterData, footerStartRow);

                            } else
                            // Detect if vertical according to the class
                            if (e.currentTarget !== null && angular.element(e.target).hasClass("vertical")) {
                                scrollRatio = e.target.scrollTop / (e.target.scrollHeight);

                                scope.$$scrollPosition.top = Math.round(scrollRatio * (scope.data.length - scope.headerRowNumber - scope.footerRowNumber));
                                scope.$$setCenterColumnsData(scope.rowNumber, scope.$$middleCenterData, scope.headerRowNumber + scope.$$scrollPosition.top);
                                scope.$$setLeftAndRightColumnsData(scope.rowNumber, scope.$$middleLeftRowHeadersData, scope.$$middleLeftData, scope.$$middleRightData, scope.headerRowNumber + scope.$$scrollPosition.top);
                            }

                            scope.$apply();
                            // $apply redraws the divs so they reset their position
                            // Therefore we msu
                            // Reposition the elements with the saved position
                            scope.$$verticalScrollbarWrapperElement.scrollTop = verticalScrollPos;
                            scope.$$horizontalScrollbarWrapperElement.scrollLeft = horizontalScrollPos;
                        });

                        /*
                         Firefox does not handle correctly divs with 100% height in a div of 100% height
                         The timeout calculates the min-height after the actual rendering
                         */
                        $timeout(function() {
                            if (iElement.hasClass("vscrollbar")) {
                                var ratio = (scope.data.length - scope.headerRowNumber - scope.footerRowNumber) / scope.rowNumber;
                                var elem = angular.element(scope.$$verticalScrollbarWrapperElement);
                                var height = elem.parent()[0].offsetHeight;
                                elem.css('height', height + 'px');
                                iElement.css('height', (height * ratio) + 'px')
                            }
                        });

                    }
                };
            }

        };
    }])
;

