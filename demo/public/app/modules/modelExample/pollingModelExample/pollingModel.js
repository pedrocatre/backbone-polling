/**
 * A simple example model
 */
define(['backbone',
    'underscore',
    'backbonePolling'
], function (Backbone, _, BackbonePolling) {
    'use strict';

    var PollingModel =  Backbone.Model.extend({

        idAttribute: 'Id',

        url: '/processExample',

        defaults: {
            value: 0
        }
    });

    // Add backbone polling mixin
    _.extend(PollingModel.prototype, BackbonePolling);

    return PollingModel;
});
