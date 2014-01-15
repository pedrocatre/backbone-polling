/**
 * A simple example model to represent a process
 */
define(['backbone',
    'backbonePolling'
], function (Backbone, BackbonePolling) {
    'use strict';

    var ProcessModel = Backbone.Model.extend({

        urlRoot: '/processes',

        defaults: {
            typeOfProcess: 'Refactoring',
            percentageComplete: 0,
            state: 'executing',
            numberOfProcessedFiles: 0,
            title: ''
        }
    });

    // Add backbone polling mixin
    _.extend(ProcessModel.prototype, BackbonePolling);

    return ProcessModel;
});