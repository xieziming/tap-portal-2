/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';
app.controller('testCaseListController', function ($scope, $http, TAP_GATEWAY, tapTable) {
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

    $scope.isLoading = true;
    $http.get(TAP_GATEWAY.testCaseRequest+"/testcase/search/all").then(function (response) {
        $scope.isLoading = false;
        $scope.testCases = response.data;
        $scope.testCaseTable = tapTable.createTable($scope.testCases);
    });
});