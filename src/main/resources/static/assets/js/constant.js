/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';

/**
 * Config constant
 */
app.constant('TAP_GATEWAY', {
    testCaseRequest: 'http://192.168.1.102:9090',
    executionRequest: 'http://127.0.0.1:9090'
});

app.constant('JS_REQUIRES', {
    scripts: [
        {name:  'appController',
            files: ['assets/js/controllers/appController.js']
        }, {name: 'headerController',
            files: ['assets/js/controllers/headerController.js']
        }, {name:  'sidebarController',
            files: ['assets/js/controllers/sidebarController.js']
        }, {name:  'testCaseListController',
            files: ['assets/js/controllers/testCaseListController.js']
        }, {name:  'testCaseDetailController',
            files: ['assets/js/controllers/testCaseDetailController.js']
        }
    ],
    modules: [
        {name: 'ngTable',
            files: ['bower_components/ng-table/dist/ng-table.min.js', 'bower_components/ng-table/dist/ng-table.min.css']
        }, {name: 'json-editor',
            files: ['bower_components/json-editor/dist/jsoneditor.min.js']
        }
    ]
});