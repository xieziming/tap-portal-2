/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';
app.controller('executionContextDetailController', function ($scope, $http, TAP_GATEWAY, $stateParams, $state) {
    var name = $stateParams.name;

    JSONEditor.defaults.theme = 'bootstrap3';
    JSONEditor.defaults.iconlib = 'fontawesome4';

    var saveExecutionContext = function (executionContext) {
        $http.post(TAP_GATEWAY.executionRequest+"/execution/context", executionContext).then(function (response) {
            alert("ok");
            $state.go("tap.execution.context.detail", {name: executionContext.name});
        });
    }

    var showExecutionContextEditor = function (executionContext) {
        var editor = new JSONEditor(document.getElementById('editor_holder'),{
            // Enable fetching schemas via ajax
            ajax: true,

            // The schema for the editor
            schema: {
                $ref: "assets/schemas/execution_context_schema.json",
                format: "grid"
            },

            // Seed the form with a starting value
            startval: executionContext
        });

        // Hook up the submit button to log to the console
        document.getElementById('submit').addEventListener('click',function() {
            // Get the value from the editor
            executionContext = editor.getValue();
            saveExecutionContext(executionContext);
        });

        // Hook up the Restore to Default button
        document.getElementById('restore').addEventListener('click',function() {
            editor.setValue(executionContext);
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
    }

    var emptyExecutionContext = {
        "name": null,
        "context": null,
        "remark": null,
        "lastModified": null
    };

    if(name == null||angular.equals({}, name) || angular.equals('', name)) {
        showExecutionContextEditor(emptyExecutionContext);
    }else {
        $http.get(TAP_GATEWAY.executionRequest + "/execution/context/" + name).then(function (response) {
            $scope.executionContextDetail = response.data;
            showExecutionContextEditor($scope.executionContextDetail);
        });
    }
});