angular.module('ngc-template', ['ngc.table.tpl.html']);

angular.module("ngc.table.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ngc.table.tpl.html",
    "<div class=\"ngc table\">\n" +
    "    <div ng-transclude style=\"display: hidden\"></div>\n" +
    "\n" +
    "    <form>\n" +
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
    "                <!-- Placeholder for vertical scroll -->\n" +
    "                <td></td>\n" +
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
    "                <!-- Placeholder for vertical scroll -->\n" +
    "                <td></td>\n" +
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
    "                <td class=\"ngc scroll-wrapper-cell\" ng-if=\"$first\" rowspan=\"{{$$rows.length}}\">\n" +
    "                    <div class=\"ngc scroll-wrapper vertical\">\n" +
    "                        <div ngc-scrollbar vertical></div>\n" +
    "                    </div>\n" +
    "                </td>\n" +
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
    "                <!-- Placeholder for vertical scroll -->\n" +
    "                <td></td>\n" +
    "            </tr>\n" +
    "\n" +
    "            <!-- Horizontal scroll -->\n" +
    "            <tr class=\"ngc row scrollbar\">\n" +
    "                <!-- Cells for row headers columns -->\n" +
    "                <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                    class=\"ngc hscrollbar cell {{column.clazz}}\"\n" +
    "                    style=\"{{column.style}}\">\n" +
    "                    <!--<div class=\"ngc row-header-content\"></div>-->\n" +
    "                </td>\n" +
    "                <!-- Cells for left fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$leftFixedColumns\" class=\"ngc scrollbar cell {{column.clazz}}\" style=\"{{column.style}}\">\n" +
    "                    <!--<div class=\"ngc cell-content\"></div>-->\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for middle variable columns -->\n" +
    "                <td class=\"ngc scroll-wrapper-cell\" colspan=\"{{$$variableCenterColumns.length}}\">\n" +
    "                    <div class=\"ngc scroll-wrapper horizontal {{column.clazz}}\" >\n" +
    "                        <div ngc-scrollbar horizontal></div>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Cells for right fixed columns -->\n" +
    "                <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                    class=\"ngc scrollbar cell {{$$middleRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                    style=\"{{column.style}}\">\n" +
    "                    <!--<div class=\"ngc cell-content\"></div>-->\n" +
    "                </td>\n" +
    "\n" +
    "                <!-- Placeholder for vertical scroll -->\n" +
    "                <td></td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </form>\n" +
    "</div>");
}]);
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

(function() {

    var module = angular.module('ngcTableDirective', ['ngc-template', 'ngSanitize']);

    // trigger this when the table's content are udpated
    module.constant('contentUpdatedEvent', 'contentUpdatedEvent');

    module.directive('ngcTable', ['$templateCache', '$sce', '$timeout', 'contentUpdatedEvent', function($templateCache, $sce, $timeout, contentUpdatedEvent) {

        // Wait delay before refreshing the scrollbar
        var scrollbarRefreshDelay = 10;

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
            };


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


                    /*
                    Register the data function
                     */
                    if (angular.isFunction(scope['customDataValueFn'])) {
                        scope.$$getDataValue = scope['customDataValueFn'];
                    } else {
                        scope.$$getDataValue = function(data, row, col) {
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
                        left: angular.isDefined(scope.scrollLeftPosition) ? scope.scrollLeftPosition : 0};

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


                post: function postLink(scope , iElement /*, iAttrs, controller*/) {

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
                    function defaultFormatFn(data /*, row, col*/) {return angular.isDefined(data) ? data : '&nbsp;';}

                    /**
                     * Default html content function
                     * @param data
                     * @returns {*}
                     */
                    function defaultHtmlFn(data, row, col, formattedValue) {return angular.isDefined(formattedValue) ? String(formattedValue) : '&nbsp;';}


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
                     * @returns {{row: *, col: *, data: *, value: *, clazz: string, style: *, eventCallbacks: {}, enclosingRanges: Array, customCellTemplate: (string|Function), customHTML: string}}
                     */
                    function $$getCellData(scope, row, col) {
                        /* The additional optional class(es) */
                        var clazz = '';
                        /* The optional style declaration */
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
                                if (angular.isFunction(range.styleFn)) styleFn = range['styleFn'];
                                if (angular.isFunction(range.customHtmlFn)) customHtmlFn = range['customHtmlFn'];
                                if (angular.isFunction(range.customTrustedHtmlFn)) customTrustedHtmlFn = range['customTrustedHtmlFn'];
                                if (angular.isDefined(range.customCellTemplate)) {
                                    customCellTemplate = range.customCellTemplate;
                                }

                                /* Register available event callbacks */
                                angular.forEach(events, function(event) {
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
                            style: styleFn(data, row, col),
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
                        var rowLength =  angular.isDefined(this.data[0]) ? this.data[0].length : 0;
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

                    /**
                     * Updates data in all table parts
                     */
                    scope.$$updateData = function() {
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

                        this.$broadcast(contentUpdatedEvent);
                    };

                    // Send an initial callback to set the scroll position on correct values if required

                    if (angular.isFunction(scope.scrollFn)) scope.scrollFn(null, {
                        top: scope.$$headerRows.length,
                        left:scope.$$leftFixedColumns.length,
                        direction:'none'
                    });

                    // Initialize the data
                    scope.$$updateData();

                    // Update the scroll positions (top and left) for the new data object
                    // It'll translate the old positions to the new ones proportionally
                    scope.$$updateScrollPositions = function (oldData) {
                        var scope = this,
                            data = scope.data,
                            scrollPosition = scope.$$scrollPosition,
                            rowNumber = scope.rowNumber,
                            centerColumnNumber = scope.centerColumnNumber,
                            newRowCount = data && data.length || 0,
                            newColumnCount = data && data[0] && data[0].length || 0,
                            oldRowCount = oldData && oldData.length || 0,
                            oldColumnCount = oldData && oldData[0] && oldData[0].length || 0;

                        if (scrollPosition.top){
                            if (newRowCount) {
                                newRowCount -= scope.$$headerRows.length - scope.$$footerRows.length;
                                if (newRowCount < 0) {
                                    newRowCount = 0;
                                }
                            }

                            if (rowNumber >= newRowCount) {
                                scrollPosition.top = 0;
                            } else {
                                if (oldRowCount) {
                                    oldRowCount -= scope.$$headerRows.length - scope.$$footerRows.length;
                                    if (oldRowCount < rowNumber) {
                                        oldRowCount = 0;
                                    }
                                }

                                scrollPosition.top = oldRowCount &&
                                    (Math.round((scrollPosition.top + 1) * (newRowCount - rowNumber) / (oldRowCount - rowNumber)) - 1);
                            }
                        }

                        if (scrollPosition.left) {
                            if (newColumnCount) {
                                newColumnCount -= -scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length;
                                if (newColumnCount < 0) {
                                    newColumnCount = 0;
                                }
                            }

                            if (centerColumnNumber >= newColumnCount) {
                                scrollPosition.left = 0;
                            } else {
                                if (oldColumnCount) {
                                    oldColumnCount -= -scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length;
                                    if (oldColumnCount < centerColumnNumber) {
                                        oldColumnCount = 0;
                                    }
                                }

                                scrollPosition.left = oldColumnCount &&
                                    (Math.round((scrollPosition.left + 1) * (newColumnCount - newColumnCount) / (oldColumnCount - newColumnCount)) - 1);
                            }
                        }
                    };

                    /**
                     * Refresh the scrollbar height based on the table body height
                     * @note Does not handle the horizontal scenario yet
                     */
                    scope.$$refreshScrollbars = function() {
                        // Refresh the scrollbars
                        var ratio;
                        // This should be factorized with the scrollbar directive
                        if (angular.isDefined(scope.data)) {
                            ratio = (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length) / scope.$$rows.length * 100;
                            scope.$$verticalScrollbarElement.css('height', ratio + '%');
                            scope.$$verticalScrollbarElement.parent().css('display', (ratio <= 100)? 'none' : 'block');

                            var elem = angular.element(scope.$$verticalScrollbarWrapperElement);
                            // we need to clear the scrollbar wrapper fixed height,
                            // otherwise it might cause the table size not to shrink to the minimum height properly
                            elem.css('height', 'auto');
                            var height = elem.parent()[0].offsetHeight;
                            elem.css('height', height + 'px');

                        }

                        if (angular.isDefined(scope.data[0])) {
                            ratio = (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length) / scope.$$variableCenterColumns.length * 100;
                            scope.$$horizontalScrollbarElement.css('width', Math.ceil(ratio) + '%');
                            scope.$$horizontalScrollbarElement.parent().css('display', (ratio <= 100)? 'none' : 'block');

                            // @note Does not handle the 'horizontal' resize of the scrollbar case yet
                            // because we haven't got a use case for it yet
                        }
                    };

                    /**
                     * Schedule a scrollbar refresh in `scrollbarRefreshDelay` milliseconds.
                     * We need this delay to give enough time for the browser to stabilise its styles.
                     * When used, it will check if we already a scheduled scrollbar refresh.
                     * If so, it will cancel it and schedule a new one instead.
                     */
                    var $$scheduledScrollbarRefresh = function() {
                        var previous = $$scheduledScrollbarRefresh.previous;
                        if (previous) {
                            $timeout.cancel(previous);
                        }

                        $$scheduledScrollbarRefresh.previous = $timeout(function () { // schedule refresh
                            $$scheduledScrollbarRefresh.previous = null;
                            scope.$$refreshScrollbars();
                        }, scrollbarRefreshDelay);
                    };
                    scope.$$scheduledScrollbarRefresh = $$scheduledScrollbarRefresh;

                    scope.$watch(
                        'data',
                        function(newValue, oldValue) {
                            if (newValue !== oldValue ) {
                                scope.$$updateScrollPositions(oldValue);

                                // Update the data
                                scope.$$updateData();

                                // Refresh scrollbars
                                scope.$$refreshScrollbars();

                            }
                        }
                    );

                    scope.$$scrollDirty = false;

                    scope.$watch(
                        'scrollTopPosition',
                        function(newValue, oldValue) {
                            if (angular.isDefined(newValue) && newValue !== oldValue) {
                                scope.$$scrollDirty = true;

                                if (scope.scrollTopPosition > (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length)) {
                                    scope.scrollTopPosition = (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length);
                                }

                                scope.$$scrollPosition.top = scope.scrollTopPosition;
                                scope.$$updateData();

                                scope.$$verticalScrollbarWrapperElement.scrollTop =
                                    scope.$$verticalScrollbarElement[0].offsetHeight * scope.scrollTopPosition / (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length);
                            }
                        }
                    );
                    scope.$watch(
                        'scrollLeftPosition',
                        function(newValue, oldValue) {
                            if (angular.isDefined(newValue) &&  newValue !== oldValue) {
                                scope.$$scrollDirty = true;

                                if (scope.scrollLeftPosition > (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length)) {
                                    scope.scrollLeftPosition = (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length);
                                }

                                scope.$$scrollPosition.left = scope.scrollLeftPosition;
                                scope.$$updateData();

                                scope.$$horizontalScrollbarWrapperElement.scrollLeft =
                                    scope.$$horizontalScrollbarElement[0].offsetWidth * scope.scrollLeftPosition / (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length);
                            }
                        }
                    );


                    /**
                     * Handle touch scrolling
                     * Start event
                     */
                    iElement.find('table').on("touchstart", function(e) {
                        scope.$$touchClientX = e.touches[0].clientX;
                        scope.$$touchClientY = e.touches[0].clientY;
                        e.preventDefault();
                    });

                    /**
                     * Handle movement
                     */
                    iElement.find('table').on("touchmove", function(e) {
                        var deltaX = e.touches[0].clientX - scope.$$touchClientX;
                        var deltaY = e.touches[0].clientY - scope.$$touchClientY;

                        scope.$$verticalScrollbarWrapperElement.scrollTop -= deltaY;
                        scope.$$horizontalScrollbarWrapperElement.scrollLeft -= deltaX;

                        scope.$$updateData();

                        scope.$$touchClientX = e.touches[0].clientX;
                        scope.$$touchClientY = e.touches[0].clientY;
                        e.preventDefault();

                    });
                }
            }
        }

        return {
            scope: {
                /* Custom data function */
                customDataValueFn:'=?',
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

                /* Scroll function to be called when a scroll event occurs */
                scrollFn: '=?',

                /* Let read or set the vertical data position in the middle center part */
                scrollTopPosition: '=?',
                /* Let read or set the horizontal data position in the middle center part */
                scrollLeftPosition: '=?',

                /* The scroll delay for controlling the refresh behaviour when scrolling, a value of 0 means immediate scrolling */
                scrollDelay: '=?',

                /* The scroll wheel delay for controlling the refresh behaviour when scrolling with the wheel, a value of 0 means immediate scrolling */
                wheelScrollDelay: '=?'

            },
            restrict:'AE',
            replace:true,
            transclude:true,
            template: $templateCache.get('ngc.table.tpl.html'),
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
    .directive('ngcScrollbar', ['$timeout', 'contentUpdatedEvent', function($timeout, contentUpdatedEvent) {
        /**
         * Handle the resizing of the table to refresh the scrollbars.
         * When the height or width of the table body changes, then we'll try to refresh the scrollbars (width/height)
         * The refresh is done asynchronously (after a 10ms delay) because multiple table contents layout changes may
         * occur in a short time and we don't want to refresh the scrollbars each time.
         * e.g. image, styles or inner templates are loaded
         * @param {string} orientation Orientation to check. e.g. 'horizontal' or 'vertical'
         * @param {object} scope Angular scope
         * @param {DOMElement} domEl DOM element where we check its dimensions
         * @returns {Function} Returns a unsubscribe function to cancel the scope.$watch()
         */
        var tableResizeHandler = function (orientation, scope, domEl) {
            var watchGetter;

            // generate the watch function in advance to make the watchGetter function run as fast as possible
            if (orientation === 'vertical') {
                watchGetter = function () { // watch for table height changes
                    return domEl.offsetHeight;
                };
            } else {
                watchGetter = function () { // watch for table width changes
                    return domEl.offsetWidth;
                };
            }

            return scope.$watch(watchGetter, function (newValue, oldValue) {
                if (newValue !== oldValue) { // when it changes
                    scope.$$scheduledScrollbarRefresh();
                }
            });
        };

        /**
         * Get closest parent tag of a given tag name.
         * @param {jqLite} el Element where to start looking for the tag
         * @param {string} tagName Tag name. e.g. TBODY
         * @returns {jqLite} Returns the found parent tag or null if not found in the whole DOM tree.
         */
        var getClosestParentTag = function(el, tagName) {
            if (el.closest) { // if jQuery is available with Angular
                return el.closest(tagName);
            }

            el = el.parent();
            while (el.length) {
                if (el[0].nodeName === tagName) {
                    return el;
                }
                el = el.parent();
            }
            return null;
        };

        /* Internal directive for virtual horizontal and vertical scrollbars management */
        return {
            require:"^ngcTable",
            restrict:'A',
            replace:true,
            template:'<div class="ngc"></div>',

            compile: function(tElement, tAttrs) {


                return {
                   pre: function postLink(scope, iElement /*, iAttrs */) {
                       var ratio = 100;

                       if (angular.isDefined(tAttrs['horizontal'])) {
                           // The horizontal ratio is the total data column length minus the left columns minus the right
                           // columns divided by the number of visible center columns
                           // The presence of the row numbers at the far right must be considered
                           if (angular.isDefined(scope.data[0])) {
                                ratio = (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length) / scope.$$variableCenterColumns.length * 100;
                           }
                           iElement.addClass('hscrollbar');
                           iElement.css('width', Math.ceil(ratio) + '%');
                           if (ratio <= 100) iElement.parent().css('display', 'none');
                           // Save the reference to the element in order to manage scroll position
                           // after $apply force the redraw of DIVs
                           scope.$$horizontalScrollbarElement = iElement;
                           scope.$$horizontalScrollbarWrapperElement = iElement.parent()[0];
                       } else
                       if (angular.isDefined(tAttrs['vertical'])) {
                           // The vertical ratio is the number of data rows minus headers and footers divided by the the number
                           // of visible middle rows
                           if (angular.isDefined(scope.data)) {
                                ratio = (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length) / scope.$$rows.length * 100;
                           }
                           iElement.addClass('vscrollbar');
                           iElement.css('height', ratio + '%');
                           if (ratio <= 100) iElement.parent().css('display', 'none');
                           // Save the reference to the element in order to manage scroll position
                           // after $apply force the redraw of DIVs
                           var rootDirectiveScope = scope.$parent.$parent;
                           rootDirectiveScope.$$verticalScrollbarElement = iElement;
                           rootDirectiveScope.$$verticalScrollbarWrapperElement = iElement.parent()[0];
                       }
                   },
                    post: function postLink(scope, iElement /*, iAttrs*/) {

                        var scheduledScrollProcess, // timeout id of the scheduled scroll event callback
                            scheduledWheelProcess, // timeout id of the scheduled wheel event callback
                            defaultScrollDelay = 120, // default scroll delay (ms)
                            scrollDelay = angular.isDefined(scope.scrollDelay) ? scope.scrollDelay : defaultScrollDelay, // current scroll delay (ms)
                            defaultWheelDelay = angular.isDefined(scope.wheelScrollDelay) ? scope.wheelScrollDelay : 500, // default wheel delay (ms)
                            parentEl = iElement.parent(); // parent DOM element of this directive's DOM root



                        /**
                         * Handles the scroll event of the vertical scroll bar
                         * @param {jQuery.Event} e
                         */
                        var processScrollEvent = function (e) {

                            var scrollRatio;
                                // Save scroll positions to set them after the call to $apply which
                                // resets the DIVs scroll position
                                // verticalScrollPos = scope.$$verticalScrollbarWrapperElement.scrollTop,
                                // horizontalScrollPos = scope.$$horizontalScrollbarWrapperElement.scrollLeft;


                            if (scope.$$scrollDirty) {
                                scope.$$scrollDirty = false;
                                return;
                            }

                            if (angular.isDefined(scope.$parent.$parent) && scope.$parent.$parent.$$scrollDirty) {
                                scope.$parent.$parent.$$scrollDirty = false;
                                return;
                            }


                            // Detect if horizontal according to the class
                            if (angular.element(e.target).hasClass("horizontal")) {
                                // add `0` value check to ensure that the ratio is not NaN.
                                // If that happens, scope.$$setCenterColumnsData will not behave properly
                                scrollRatio = e.target.scrollWidth && e.target.scrollLeft / e.target.scrollWidth;
                                scope.$$scrollPosition.left = Math.round(scrollRatio * (scope.data[0].length - scope.$$leftFixedColumns.length - scope.$$rightFixedColumns.length));

                            } else
                            // Detect if vertical according to the class
                            if (angular.element(e.target).hasClass("vertical")) {
                                // add `0` value check to ensure that the ratio is not NaN.
                                // If that happens, scope.$$setCenterColumnsData will not behave properly
                                scrollRatio = e.target.scrollHeight && e.target.scrollTop / e.target.scrollHeight;
                                scope.$$scrollPosition.top = Math.round(scrollRatio * (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length));
                            } else {
                                // If other scroll event do not process data redraw
                                return;
                            }

                            if (angular.isFunction(scope.scrollFn)) scope.scrollFn(e, {
                                top: scope.$$scrollPosition.top +  scope.$$headerRows.length,
                                left: scope.$$scrollPosition.left + scope.$$leftFixedColumns.length,
                                direction: angular.element(e.target).hasClass('vertical') ? 'vertical' : angular.element(e.target).hasClass('horizontal') ? 'horizontal' : 'none'
                            });

                            scope.$$updateData();

                            // $apply redraws the divs so they reset their position
                            // WARNING: This is quite slow once the number of cells exceeds 300!
                            scope.$apply();

                            // verticalScrollPos = scope.$$verticalScrollbarWrapperElement.scrollTop;
                            // horizontalScrollPos = scope.$$horizontalScrollbarWrapperElement.scrollLeft;

                            // Therefore we must
                            // reposition the elements with the saved position
                            // scope.$$verticalScrollbarWrapperElement.scrollTop = verticalScrollPos;
                            // scope.$$horizontalScrollbarWrapperElement.scrollLeft = horizontalScrollPos;

                            updateVScrollBarHeight();
                            // rootDirectiveScope.$$scrolling = false;
                        };

                        parentEl.on('wheel', function(){
                            //DEBUG
                            //console.warn('wheel: ', e);
                            if (scheduledWheelProcess) {
                                clearTimeout(scheduledWheelProcess);
                            }
                            scrollDelay = defaultWheelDelay; // if the user wheel action triggers a scroll, it'll use this different delay value
                            scheduledWheelProcess = setTimeout(function(){ // restore the default scroll delay later
                                scrollDelay = defaultScrollDelay;
                            }, defaultWheelDelay);
                        });

                        // Handle the scroll event on parent elements
                        parentEl.on("scroll", function(e) {
                            if (scheduledScrollProcess) {
                                clearTimeout(scheduledScrollProcess);
                            }
                            scheduledScrollProcess = setTimeout(angular.bind(this, processScrollEvent, e), scrollDelay);
                            // rootDirectiveScope.$$scrolling = true;
                        });



                        /*
                         Firefox does not handle correctly divs with 100% height in a div of 100% height
                         The timeout calculates the min-height after the actual rendering
                         */
                        var updateVScrollBarHeight = function() {
                            $timeout(function() {
                                if (iElement.hasClass("vscrollbar")) {
                                    var ratio = (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length) / scope.$$rows.length,
                                        elem = angular.element(scope.$$verticalScrollbarWrapperElement),
                                        vscrollBarHeight = elem.parent()[0].offsetHeight;
                                    elem.css('height', vscrollBarHeight + 'px');
                                    iElement.css('height', (vscrollBarHeight * ratio) + 'px')
                                }
                            });
                        };

                        updateVScrollBarHeight();


                        var tbodyEl = getClosestParentTag(parentEl, 'TBODY');
                        if (!tbodyEl.length) {
                            throw new Error("Unable to find TBODY tag from the scrollbar wrapper");
                        }

                        // vertical scrolling perks
                        if (parentEl.hasClass('vertical')) {
                            // Handle vertical scroll triggered by mouse wheel over the whole table area
                            parentEl.parent().parent().parent().on('wheel', function(evt){
                                var target = evt.target,
                                    parentElDom = parentEl[0];
                                if (target !== parentElDom) {
                                    var scrollHeight = parentElDom.scrollHeight;
                                    if (!scrollHeight) { // if scrolling vertically is not possible
                                        return;
                                    }

                                    var initScrollTop = parentElDom.scrollTop,
                                        originalEvent = evt.originalEvent || evt, // need this to make this code work with/without jQuery
                                        lineScrollOffset = originalEvent.deltaY > 0 ? 3 : -3;

                                    // if we can't scroll further in that direction
                                    if ((initScrollTop === 0 && lineScrollOffset < 0) ||
                                        ((initScrollTop + parentElDom.offsetHeight) === scrollHeight && lineScrollOffset > 0)) {
                                        return;
                                    }

                                    // if we can scroll more
                                    if (parentElDom.scrollByLines) {
                                        parentElDom.scrollByLines(lineScrollOffset);
                                    } else if (parentElDom.doScroll) { // if scrollByLines is not available, try to use the IE similar function
                                        parentElDom.doScroll(lineScrollOffset > 0 ? 'scrollbarDown' : 'scrollbarUp');
                                    } else if (parentElDom.scrollBy) { // if scrollBy is available (an old DOM-0 method)
                                        parentElDom.scrollBy(lineScrollOffset * 10);
                                    } else { // last solution, try to do it manually
                                        parentElDom.scrollTop += lineScrollOffset * 10;
                                    }
                                    evt.preventDefault();
                                }
                            });

                            // target element is the scrollbar wrapper parent element
                            tableResizeHandler('vertical', scope, tbodyEl[0]);

                        // Does not handle the 'horizontal' case yet because we haven't got a use case for it yet
                        // } else {
                        //    // target element is the scrollbar wrapper parent element
                        //    tableResizeHandler('horizontal', scope, tbodyEl[0]);
                        }
                    }
                };
            }

        };
    }])
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
        function() {
            // List of attributes to map to the scope
            var attrToMap = ['extInclude', 'scopeExtension'];

            /**
             * Sets a given attribute onto the scope after evaluating it and watch for future value changes
             * @param {Object} scope
             * @param {Object} attr
             * @param {string} attrName
             * @return {void}
             */
            var setupScopeVar = function(scope, attr, attrName) {
                scope.$watch(attr[attrName], function(newValue, oldValue) {
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
                link: function(scope, element, attr) {
                    for(var i= 0, len=attrToMap.length; i < len; i++) {
                        setupScopeVar(scope, attr, attrToMap[i]);
                    }
                }
            };
        }
    ]);
})();
