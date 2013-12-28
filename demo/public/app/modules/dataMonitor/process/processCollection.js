/**
 * The process collection that has the plugin as a mixin
 */
define([
    'backbone',
    'underscore',
    'backbonePolling',
    'processModel'
], function (Backbone, _, BackbonePolling, ProcessModel) {
    'use strict';

    var ProcessCollection = Backbone.Collection.extend({
        url: '/processes',

        model: ProcessModel
    });

    // Add backbone polling mixin
    _.extend(ProcessCollection.prototype, BackbonePolling);

    return ProcessCollection;
});