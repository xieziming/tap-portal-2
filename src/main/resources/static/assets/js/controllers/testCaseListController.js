/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';
app.controller('testCaseListController', function ($scope, $http, TAP_GATEWAY) {
    $http({
        method: 'POST',
        url: TAP_GATEWAY.testCaseRequest + '/search/path',
        data: { path: '/'},
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
        transformRequest: function(obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        }
    }).then(function (response) {
       alert(response);
    }, function (error) {
        alert(error);
    });
});