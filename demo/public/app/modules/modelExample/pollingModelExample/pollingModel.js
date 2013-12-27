/**
 * A simple example model
 */
define(['backbone',
    'underscore',
    'backbonePollCollection'
], function (Backbone, _, BackbonePollCollection) {
    'use strict';

    var PollingModel =  Backbone.Model.extend({

        idAttribute: 'Id',

        url: '/process',

        defaults: {
            value: 0
        }
    });

    // Add backbone polling mixin
    _.extend(PollingModel.prototype, BackbonePollCollection);

    return PollingModel;
});
