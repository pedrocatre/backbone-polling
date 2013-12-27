﻿/**
 * Require js configuration file
 */
require.config({
    paths: {
        // libs
        jquery: '../libs/jquery/jquery',
        underscore: '../libs/underscore/underscore',
        backbone: '../libs/backbone/backbone',
        handlebars: '../libs/handlebars/handlebars',
        text: '../libs/require/text',
        bootstrap: '../libs/bootstrap/js/bootstrap.min',
        respond: '../libs/respond/respond.min', // necessary so ie8 can support media queries
        gauge: '../libs/gauge/gauge.min',

        // PollCollection backbone plugin
        backbonePollCollection: '../libs/backbone-poll-collection/backbone-poll-collection',

        //// app

        // common
        appUtils: 'modules/common/appUtils',
        baseView: 'modules/common/baseView',
        masterView: 'modules/common/masterView',
        handlebarsHelpers: 'modules/common/handlebarsHelpers',

        //dataMonitor
        dataMonitorPageView: 'modules/dataMonitor/dataMonitorPage/dataMonitorPageView',

        // process
        processModel: 'modules/dataMonitor/process/processModel',
        processCollection: 'modules/dataMonitor/process/processCollection',
        processListView: 'modules/dataMonitor/process/processListView',
        processItemView: 'modules/dataMonitor/process/processItemView',

        // modeExample
        modelExamplePageView: 'modules/modelExample/modelExamplePage/modelExamplePageView',

        // polling model
        pollingModel: 'modules/modelExample/pollingModelExample/pollingModel',
        pollingModelView: 'modules/modelExample/pollingModelExample/pollingModelView',

        // tests
        runJasmine: 'tests/runJasmine'

    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: ['jQuery', '$']
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});