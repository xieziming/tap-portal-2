/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';
app.controller('testCaseListController', function ($scope, $http, TAP_GATEWAY, $filter, ngTableParams) {
    /*
    var loadPath = function(path) {
        $scope.currentPath = path;

        $http({
            method: 'POST',
            url: TAP_GATEWAY.testCaseRequest + '/testcase/search/path',
            data: {path: path},
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function (response) {
            $scope.testCases = response.data;
        });


    };
    loadPath("/");
    */
    var createTable = function (data) {
        var count = arguments[1]?arguments[1]:15;
        var sorting = arguments[2]?arguments[2]:'asc';
        return new ngTableParams(
            {
                page: 1, // show first page
                count: count, // count per page
                sorting: {
                    id: sorting // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;
                    orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
                    var filteredData = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    params.total(orderedData.length);

                    // set total for recalc pagination
                    $defer.resolve(filteredData);
                }
            });
    }

    $scope.isLoading = true;
    $http.get(TAP_GATEWAY.testCaseRequest+"/testcase/search/all").then(function (response) {
        $scope.isLoading = false;
        $scope.testCases = response.data;
        $scope.testCaseTable = createTable($scope.testCases);
    });
});