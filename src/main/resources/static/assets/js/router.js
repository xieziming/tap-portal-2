/*
 * Author: Suny Xie
 * Email: inbox@xieziming.com
 * Copyright (c) 2017 xieziming.com All rights reserved.
 */

'use strict';

/**
 * Config for the router
 */
app.config(
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $ocLazyLoadProvider, JS_REQUIRES) {

        $urlRouterProvider.when('', '/home');

        $stateProvider
            .state('tap', {
                url: '',
                templateUrl: 'assets/views/app.html',
                resolve: lazyLoad('appController', 'headerController', 'sidebarController'),
                abstract: true
            }).state('tap.home', {
            url: '/home',
            templateUrl: 'assets/views/content/home.html',
        }).state('tap.testcase', {
            url: '/testcase',
            template: '<div ui-view ></div>',
            abstract: true
        }).state('tap.testcase.list', {
            url: '/list',
            templateUrl: 'assets/views/content/test-case-list.html',
            resolve: lazyLoad('testCaseListController','ngTable')
        }).state('tap.testcase.detail', {
            url: '/:uid',
            params: {uid:''},
            templateUrl: 'assets/views/content/test-case-detail.html',
            resolve: lazyLoad('testCaseDetailController', 'json-editor')
        }).state('tap.execution', {
            url: '/execution',
            template: '<div ui-view ></div>',
            abstract: true
        }).state('tap.execution.context', {
            url: '/context',
            template: '<div ui-view ></div>',
            abstract: true
        }).state('tap.execution.context.list', {
            url: '/list',
            templateUrl: 'assets/views/content/execution-context-list.html',
            resolve: lazyLoad('executionContextListController','ngTable')
        }).state('tap.execution.context.detail', {
            url: '/:name',
            params: {name:''},
            templateUrl: 'assets/views/content/execution-context-detail.html',
            resolve: lazyLoad('executionContextDetailController', 'json-editor')
        });



        app.controller = $controllerProvider.register;
        // LAZY LOAD
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: JS_REQUIRES.modules
        });

        function lazyLoad() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == 'function')
                                return promise.then(_arg);
                            else
                                return promise.then(function () {
                                    var nowLoad = requiredData(_arg);
                                    if (!nowLoad)
                                        return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                    return $ocLL.load(nowLoad);
                                });
                        }

                        function requiredData(name) {
                            if (JS_REQUIRES.modules)
                                for (var m in JS_REQUIRES.modules)
                                    if (JS_REQUIRES.modules[m].name && JS_REQUIRES.modules[m].name === name)
                                        return JS_REQUIRES.modules[m];
                            if (JS_REQUIRES.scripts)
                                for (var m in JS_REQUIRES.scripts)
                                    if (JS_REQUIRES.scripts[m].name && JS_REQUIRES.scripts[m].name === name)
                                        return JS_REQUIRES.scripts[m];
                        }
                    }]
            };
        }
    }
);