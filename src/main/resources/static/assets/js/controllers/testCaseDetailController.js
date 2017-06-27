/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';
app.controller('testCaseDetailController', function ($scope, $http, TAP_GATEWAY, $stateParams, $state) {
    var uid = $stateParams.uid;

    JSONEditor.defaults.theme = 'bootstrap3';
    JSONEditor.defaults.iconlib = 'fontawesome4';

    var saveTestCase = function (testcase) {
        $http.post(TAP_GATEWAY.testCaseRequest+"/testcase", testcase).then(function (response) {
            alert("ok");
            $state.go("tap.testcase.detail", {uid: testcase.uid});
        });
    }

    var showTestCaseEditor = function (testcase) {
        var editor = new JSONEditor(document.getElementById('editor_holder'),{
            // Enable fetching schemas via ajax
            ajax: true,

            // The schema for the editor
            schema: {
                $ref: "testcase_schema.json",
                format: "grid"
            },

            // Seed the form with a starting value
            startval: testcase
        });

        // Hook up the submit button to log to the console
        document.getElementById('submit').addEventListener('click',function() {
            // Get the value from the editor
            testcase = editor.getValue();
            saveTestCase(testcase);
        });

        // Hook up the Restore to Default button
        document.getElementById('restore').addEventListener('click',function() {
            editor.setValue(testcase);
        });

        // Hook up the validation indicator to update its
        // status whenever the editor changes
        editor.on('change',function() {
            // Get an array of errors from the validator
            var errors = editor.validate();

            var indicator = document.getElementById('valid_indicator');

            // Not valid
            if(errors.length) {
                indicator.className = 'label alert';
                indicator.textContent = 'not valid';
            }
            // Valid
            else {
                indicator.className = 'label success';
                indicator.textContent = 'valid';
            }
        });
        //editor.getEditor('root.createdTime').disable();
    }

    var emptyTestCase = {
        "path": "/",
        "createdTime": null,
        "uid": "",
        "name": "",
        "status": "Ready",
        "description": "",
        "testCaseMetas": [],
        "testCaseTags": [],
        "testSteps": [],
        "testDatas": []
    };

    if(uid == null||angular.equals({}, uid) || angular.equals('', uid)) {
        showTestCaseEditor(emptyTestCase);
    }else {
        $http.get(TAP_GATEWAY.testCaseRequest + "/testcase/" + uid).then(function (response) {
            $scope.testCaseDetail = response.data;
            showTestCaseEditor($scope.testCaseDetail);
        });
    }
});