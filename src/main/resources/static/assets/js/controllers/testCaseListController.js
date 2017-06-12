/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';
app.controller('testCaseListController', function ($scope, $http, TAP_GATEWAY, $stateParams) {

    var loadPath = function(path) {
        $scope.parentPath = $scope.currentPath;
        $scope.currentPath = path;

        $http({
            method: 'POST',
            url: TAP_GATEWAY.testCaseRequest + '/search/path',
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
            $scope.testCasePathSearchResult = response.data;
        });
    };

    var currentPath = $stateParams[0];
    $scope.loadPath = loadPath;

    $scope.currentPath = currentPath;
    loadPath(currentPath);
});