angular.module('ngc-template', ['ngc.table.tpl.html']);

angular.module("ngc.table.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ngc.table.tpl.html",
    "<div class=\"ngc table\">\n" +
    "    <div ng-transclude style=\"display: hidden\"></div>\n" +
    "\n" +
    "    <table class=\"ngc\">\n" +
    "        <!-- Column Names -->\n" +
    "        <tr class=\"ngc row column-names\" ng-show=\"{{showColumnNames}}\"  ng-class=\"{first: $first, last: $last}\">\n" +
    "            <!-- Cells for row headers columns -->\n" +
    "            <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc row-header column-name cell {{column.clazz}}\"\n" +
    "                style=\"{{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{column.style}}\"></div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for left fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc left column-name cell {{$$leftColumnNames[$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$leftColumnNames[$index].style}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{column.style}}\">{{$$leftColumnNames[$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for middle variable columns -->\n" +
    "            <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc center column-name cell {{$$centerColumnNames[$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$centerColumnNames[$index].style}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{column.style}}\">{{$$centerColumnNames[$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for right fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc right column-name cell {{$$rightColumnNames[$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$rightColumnNames[$index].style}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{column.style}}\">{{$$rightColumnNames[$index].value}}</div>\n" +
    "            </td>\n" +
    "            <!-- Placeholder for vertical scroll -->\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- Headers -->\n" +
    "        <tr class=\"ngc row header\"  ng-show=\"{{showHeader}}\" ng-repeat=\"row in $$headerRows\" ng-class=\"{first: $first, last: $last}\">\n" +
    "            <!-- Cells for row headers columns -->\n" +
    "            <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                 class=\"ngc row-header header cell {{$$topLeftRowHeadersData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                 style=\"{{$$topLeftRowHeadersData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$topLeftRowHeadersData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for left fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$topLeftData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc left header cell {{$$topLeftData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$topLeftData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$topLeftData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for middle variable columns -->\n" +
    "            <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$topCenterData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc center header cell {{$$topCenterData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$topCenterData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$topCenterData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for right fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$topRightData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc right header cell {{$$topRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$topRightData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$topRightData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Placeholder for vertical scroll -->\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- Middle -->\n" +
    "        <tr class=\"ngc row middle\" ng-repeat=\"row in $$rows\" ng-class=\"{first: $first, last: $last}\">\n" +
    "            <!-- Cells for row headers columns -->\n" +
    "            <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc row-header middle cell {{$$middleLeftRowHeadersData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$middleLeftRowHeadersData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$middleLeftRowHeadersData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for left fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$middleLeftData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc left middle cell {{$$middleLeftData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$middleLeftData[$parent.$index][$index].style}} ; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$middleLeftData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for middle variable columns -->\n" +
    "            <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$middleCenterData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc center cell middle {{$$middleCenterData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$middleCenterData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$middleCenterData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for right fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$middleRightData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc right cell middle {{$$middleRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$middleRightData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$middleRightData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "            <td class=\"ngc scroll-wrapper-cell\" ng-if=\"$first\" rowspan=\"{{$$rows.length}}\">\n" +
    "                <div class=\"ngc scroll-wrapper vertical\">\n" +
    "                    <div ngc-scrollbar vertical></div>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- Bottom -->\n" +
    "        <tr class=\"ngc row footer\" ng-repeat=\"row in $$footerRows\" ng-class=\"{first: $first, last: $last}\">\n" +
    "            <!-- Cells for row headers columns -->\n" +
    "            <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc row-header footer cell {{$$bottomLeftRowHeadersData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$bottomLeftRowHeadersData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$bottomLeftRowHeadersData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for left fixed columns -->\n" +
    "            <td  ng-repeat=\"column in $$leftFixedColumns\"\n" +
    "                 ng-click=\"$$dispatchEvent('click', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-keydown=\"$$dispatchEvent('keydown', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-keypress=\"$$dispatchEvent('keypress', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-keyup=\"$$dispatchEvent('keyup', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$bottomLeftData[$parent.$index][$index])\"\n" +
    "                 ng-class=\"{first: $first, last: $last}\"\n" +
    "                 class=\"ngc left footer cell {{$$bottomLeftData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                 style=\"{{$$bottomLeftData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$bottomLeftData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for middle variable columns -->\n" +
    "            <td ng-repeat=\"column in $$variableCenterColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$bottomCenterData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc center footer cell {{$$bottomCenterData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$bottomCenterData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$bottomCenterData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for right fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                ng-click=\"$$dispatchEvent('click', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-dblclick=\"$$dispatchEvent('dblclick', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-keydown=\"$$dispatchEvent('keydown', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-keypress=\"$$dispatchEvent('keypress', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-keyup=\"$$dispatchEvent('keyup', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-mousedown=\"$$dispatchEvent('mousedown', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseleave=\"$$dispatchEvent('mouseleave', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseenter=\"$$dispatchEvent('mouseenter', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-mousemove=\"$$dispatchEvent('mousemove', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseover=\"$$dispatchEvent('mouseover', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-mouseup=\"$$dispatchEvent('mouseup', $event, $$bottomRightData[$parent.$index][$index])\"\n" +
    "                ng-class=\"{first: $first, last: $last}\"\n" +
    "                class=\"ngc right footer cell {{$$bottomRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{$$bottomRightData[$parent.$index][$index].style}}; {{row.height}}; {{column.style}}\">\n" +
    "                <div class=\"ngc cell-content\" style=\"{{row.height}}; {{column.style}}\">{{$$bottomRightData[$parent.$index][$index].value}}</div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Placeholder for vertical scroll -->\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "\n" +
    "        <!-- Horizontal scroll -->\n" +
    "        <tr class=\"ngc row scrollbar\">\n" +
    "            <!-- Cells for row headers columns -->\n" +
    "            <td ng-repeat=\"column in $$leftRowHeadersColumns\"\n" +
    "                class=\"ngc hscrollbar cell {{column.clazz}}\"\n" +
    "                style=\"{{column.style}}\">\n" +
    "                <!--<div class=\"ngc row-header-content\"></div>-->\n" +
    "            </td>\n" +
    "            <!-- Cells for left fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$leftFixedColumns\" class=\"ngc scrollbar cell {{column.clazz}}\" style=\"{{column.style}}\">\n" +
    "                <!--<div class=\"ngc cell-content\"></div>-->\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for middle variable columns -->\n" +
    "            <td class=\"ngc scroll-wrapper-cell\" colspan=\"{{$$variableCenterColumns.length}}\">\n" +
    "                <div class=\"ngc scroll-wrapper horizontal {{column.clazz}}\" >\n" +
    "                    <div ngc-scrollbar horizontal></div>\n" +
    "                </div>\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Cells for right fixed columns -->\n" +
    "            <td ng-repeat=\"column in $$rightFixedColumns\"\n" +
    "                class=\"ngc scrollbar cell {{$$middleRightData[$parent.$index][$index].clazz}} {{column.clazz}}\"\n" +
    "                style=\"{{column.style}}\">\n" +
    "                <!--<div class=\"ngc cell-content\"></div>-->\n" +
    "            </td>\n" +
    "\n" +
    "            <!-- Placeholder for vertical scroll -->\n" +
    "            <td></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "\n" +
    "</div>\n" +
    "");
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
                    $$createColumns(scope.leftColumnNumber || 1, scope.$$leftFixedColumns, scope.leftColumnWidths);
                    /**
                     * Variable center column definitions
                     * @type {Array}
                     */
                    scope.$$variableCenterColumns = [];
                    /* Create the columns based on directive parameters */
                    $$createColumns(scope.centerColumnNumber || 10, scope.$$variableCenterColumns, scope.centerColumnWidths);
                    /**
                     * Right fixed columns definitions
                     * @type {Array}
                     */
                    scope.$$rightFixedColumns = [];
                    /* Create the columns based on directive parameters */
                    $$createColumns(scope.rightColumnNumber || 1, scope.$$rightFixedColumns, scope.rightColumnWidths);

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
                    nHeaderRows = scope.showHeader ? nHeaderRows : 0;

                    for (i = 0; i < nHeaderRows; i++) {
                        var headerRowDef = {
                            index: i,
                            height: $$getStyleDecl('height', scope.headerRowHeights, i) + ';' + $$getStyleDecl('max-height', scope.headerRowHeights, i)
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
                    var nRows = angular.isNumber(scope.rowNumber) ? scope.rowNumber : 10;
                    for (i = 0; i < nRows; i++) {
                        var rowDef = {
                            index: i,
                            height: $$getStyleDecl('height', scope.rowHeights, i) + ';' + $$getStyleDecl('max-height', scope.rowHeights, i)
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
                    var nFooterRows = angular.isNumber(scope.footerRowNumber) ? scope.footerRowNumber : 1;
                    nFooterRows = scope.showFooter ? nFooterRows : 0;

                    for (i = 0; i < nFooterRows; i++) {
                        var footerRowDef = {
                            index: i,
                            height: $$getStyleDecl('height', scope.footerRowHeights, i) + ';' + $$getStyleDecl('max-height', scope.footerRowHeights, i)
                        };
                        scope.$$footerRows.push(footerRowDef);
                    }
                },


                post: function postLink(scope /*, iElement , iAttrs, controller*/) {

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
                        var data = scope.$$getDataValue(scope.data, row, col);
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

                                /* Register available event callbacks */
                                angular.forEach(events, function(event) {
                                    if (angular.isFunction(range[event])) eventCallbacks[event] = range[event];
                                });
                            }
                        });

                        return {
                            row: row,
                            col: col,
                            data: data,
                            value: formatFn(data, row, col),
                            clazz: clazz,
                            style: styleFn(data, row, col),
                            eventCallbacks: eventCallbacks,
                            enclosingRanges: enclosingRanges
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
                    scope.$$setCenterColumnsData(scope.$$headerRows.length, scope.$$topCenterData, 0);
                    scope.$$setLeftAndRightColumnsData(scope.$$headerRows.length, scope.$$topLeftRowHeadersData, scope.$$topLeftData, scope.$$topRightData, 0);

                    /* Initiaize the variable middle parts */
                    scope.$$setCenterColumnsData(scope.$$rows.length, scope.$$middleCenterData, scope.$$headerRows.length);
                    scope.$$setLeftAndRightColumnsData(scope.$$rows.length, scope.$$middleLeftRowHeadersData, scope.$$middleLeftData, scope.$$middleRightData, scope.$$headerRows.length);

                    /* Initialize the fixed footer parts */
                    /* The footer start row should be either the total data rows minus the footer height or the number of header rows + the number of rows */
                    var footerStartRow = Math.max(scope.data.length - scope.$$footerRows.length, scope.$$headerRows.length + scope.$$rows.length);
                    scope.$$setCenterColumnsData(scope.$$footerRows.length, scope.$$bottomCenterData, footerStartRow);
                    scope.$$setLeftAndRightColumnsData(scope.$$footerRows.length, scope.$$bottomLeftRowHeadersData, scope.$$bottomLeftData, scope.$$bottomRightData, footerStartRow);

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
                headerRowNumber:"=?",
                /* Heights of the header rows (array or single value). No default (min-height:10px) */
                headerRowHeights:"=?",
                /* Number of rows in the middle. By default 10 */
                rowNumber:"=?",
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
                           ratio = (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length) / scope.$$rows.length * 100;
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

                                var footerStartRow = Math.max(scope.data.length - scope.$$footerRows.length, scope.$$headerRows.length + scope.$$rows.length);
                                scope.$$setCenterColumnsData(scope.$$headerRows.length, scope.$$topCenterData, 0);
                                scope.$$setCenterColumnsData(scope.$$rows.length, scope.$$middleCenterData, scope.$$headerRows.length + scope.$$scrollPosition.top);
                                scope.$$setCenterColumnsData(scope.$$footerRows.length, scope.$$bottomCenterData, footerStartRow);

                            } else
                            // Detect if vertical according to the class
                            if (e.currentTarget !== null && angular.element(e.target).hasClass("vertical")) {
                                scrollRatio = e.target.scrollTop / (e.target.scrollHeight);

                                scope.$$scrollPosition.top = Math.round(scrollRatio * (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length));
                                scope.$$setCenterColumnsData(scope.$$rows.length, scope.$$middleCenterData, scope.$$headerRows.length + scope.$$scrollPosition.top);
                                scope.$$setLeftAndRightColumnsData(scope.$$rows.length, scope.$$middleLeftRowHeadersData, scope.$$middleLeftData, scope.$$middleRightData, scope.$$headerRows.length + scope.$$scrollPosition.top);
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
                                var ratio = (scope.data.length - scope.$$headerRows.length - scope.$$footerRows.length) / scope.$$rows.length;
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

