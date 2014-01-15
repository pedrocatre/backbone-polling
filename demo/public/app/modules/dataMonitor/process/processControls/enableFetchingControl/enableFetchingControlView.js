/**
 * View responsible for the control for starting and stopping the polling process
 */
define(['backbone',
    'handlebars',
    'baseView',
    'text!../app/modules/dataMonitor/process/processControls/enableFetchingControl/enableFetchingControl.html',
    'handlebarsHelpers'
], function (Backbone, Handlebars, BaseView, EnableFetchingControlTemplate) {
    'use strict';

    return BaseView.extend({

        initialize: function () {
            this.enableFetchingControlTemplate = Handlebars.compile(EnableFetchingControlTemplate);
            this.isFetching = true;
            return this;
        },

        events: {
            'click .control-fetching-btn-js': 'changeFetchingState'
        },

        render: function () {
            var enableFetchingControlHtml = this.enableFetchingControlTemplate({ isFetching: this.isFetching });
            this.$el.html(enableFetchingControlHtml);
            return this;
        },


        changeFetchingState: function(e) {
            (this.isFetching) ? this.collection.stopFetching() : this.collection.startFetching();
            this.isFetching = !this.isFetching;
            this.render();
            return this;
        }

    });
});

