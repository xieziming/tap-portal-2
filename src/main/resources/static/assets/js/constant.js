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
    testCaseRequest: 'http://127.0.0.1:9999/tap-testcase',
    executionRequest: 'http://127.0.0.1:9999/tap-execution'
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
        }
    ],
    modules: [
        {name: 'ngTable',
            files: ['bower_components/ng-table/dist/ng-table.min.js', 'bower_components/ng-table/dist/ng-table.min.css']
        }
    ]
});