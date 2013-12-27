/**
 * Application's router. For now it only has one path so this was not even necessary.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'dataMonitorPageView',
    'bootstrap'
], function ($, _, Backbone, DataMonitorPageView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
			'*actions': 'dataMonitorPage'
        },

        initialize: function() {
            this.$bodyContent = $('#body-content');
        },

        dataMonitorPage: function() {
            this.dataMonitorPageView = new DataMonitorPageView();
            this.$bodyContent.html(this.dataMonitorPageView.render().el);
        }

    });

    var initialize = function () {
        var app = new AppRouter();
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});