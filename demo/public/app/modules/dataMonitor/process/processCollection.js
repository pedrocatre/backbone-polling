/**
 * The process collection that has the plugin as a mixin
 */
define([
    'backbone',
    'underscore',
    'backbonePollCollection',
    'processModel'
], function (Backbone, _, BackbonePollCollection, ProcessModel) {
    'use strict';

    var ProcessCollection = Backbone.Collection.extend({
        url: '/processes',

        model: ProcessModel
    });

    // Add backbone polling mixin
    _.extend(ProcessCollection.prototype, BackbonePollCollection);

    return ProcessCollection;
});