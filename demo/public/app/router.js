/**
 * Application's router. For now it only has one path so this was not even necessary.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'dataMonitorPageView',
    'modelExamplePageView',
    'bootstrap'
], function ($, _, Backbone, DataMonitorPageView, ModelExamplePageView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            'modelExample': 'modelExamplePage',
			'*actions': 'dataMonitorPage'
        },

        initialize: function() {
            this.$bodyContent = $('#body-content');
        },

        _activateNavBtn: function () {
            $('.navbar-nav li').removeClass('active');
            $('.navbar-nav li a[href="#' + Backbone.history.fragment + '"]')
                .parent().addClass('active');

        },

        _tearDownLastPageResources: function () {
            if(!_.isUndefined(this.dataMonitorPageView) && !_.isNull(this.dataMonitorPageView)) {
                this.dataMonitorPageView.remove();
                this.dataMonitorPageView = null;
            }
            if(!_.isUndefined(this.modelExamplePageView) && !_.isNull(this.modelExamplePageView)) {
                this.modelExamplePageView.remove();
                this.modelExamplePageView = null;
            }
        },

        _prepareForNewPage: function () {
            this._tearDownLastPageResources();
            this._activateNavBtn();
        },

        dataMonitorPage: function() {
            this._prepareForNewPage();
            this.dataMonitorPageView = new DataMonitorPageView();
            this.$bodyContent.html(this.dataMonitorPageView.render().el);
        },

        modelExamplePage: function() {
            this._prepareForNewPage();
            this.modelExamplePageView = new ModelExamplePageView();
            this.$bodyContent.html(this.modelExamplePageView.render().el);
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