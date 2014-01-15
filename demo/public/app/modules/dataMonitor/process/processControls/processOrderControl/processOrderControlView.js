/**
 * View responsible for the process order control
 */
define(['backbone',
    'handlebars',
    'baseView',
    'text!../app/modules/dataMonitor/process/processControls/processOrderControl/processOrderControl.html',
    'handlebarsHelpers'
], function (Backbone, Handlebars, BaseView, ProcessOrderControlHtml) {
    'use strict';

    return BaseView.extend({

        dom: {
            PROCESSORDERCONTROL: '.process-order-control-js'
        },

        initialize: function () {
            this.processOrderControlHtml = ProcessOrderControlHtml;
            return this;
        },

        events: {
            'change  .process-order-control-js': '_changeOrderBy'
        },

        render: function () {
            this.$el.html(this.processOrderControlHtml);
            return this;
        },

        _changeOrderBy: function () {
            var orderByValue = this.$el.find(this.dom.PROCESSORDERCONTROL).val(),
                isFetching = this.collection.isFetching();

            // Stop fetching so that any pending fetch request is aborted
            this.collection.stopFetching();

            this.collection.configure({ fetchOptions: {data: { orderBy: orderByValue }}});

            // Start fetching again, now with new fetch options, if the collection was fetching when the search term
            // changed
            if(isFetching) { this.collection.startFetching(); }
        }

    });
});

