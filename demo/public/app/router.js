/**
 * Application's router
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'dataMonitorPageView',
    'singleProcessMonitorPageView',
    'modelExamplePageView',
    'bootstrap'
], function ($, _, Backbone, DataMonitorPageView, SingleProcessMonitorPageView, ModelExamplePageView) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            'modelExample': 'modelExamplePage',
            'processDetails/:processId': 'singleProcessMonitorPage',
			'*actions': 'dataMonitorPage'
        },

        initialize: function() {
            this.$bodyContent = $('#body-content');
        },

        _activateNavBtn: function () {
            var backboneHistoryFragment = Backbone.history.fragment;
            $('.navbar-nav li').removeClass('active');
            if(backboneHistoryFragment.indexOf('processDetails') !== -1) {
                backboneHistoryFragment = '';
            }
            $('.navbar-nav li a[href="#' + backboneHistoryFragment + '"]')
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
            if(!_.isUndefined(this.singleProcessMonitorPageView) && !_.isNull(this.singleProcessMonitorPageView)) {
                this.singleProcessMonitorPageView.remove();
                this.singleProcessMonitorPageView = null;
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

        singleProcessMonitorPage: function(processId) {
            this._prepareForNewPage();
            this.singleProcessMonitorPageView = new SingleProcessMonitorPageView({ processId: processId });
            this.$bodyContent.html(this.singleProcessMonitorPageView.render().el);
        },

        modelExamplePage: function() {
            this._prepareForNewPage();
            this.modelExamplePageView = new ModelExamplePageView();
            this.$bodyContent.html(this.modelExamplePageView.render().el);
        }

    });

    var initialize = function () {
        var app = new AppRouter();
        window.AppUtils.app = app;
        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});