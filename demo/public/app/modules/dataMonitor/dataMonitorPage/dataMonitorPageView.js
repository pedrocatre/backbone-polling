/**
 * View responsible for rendering the data monitor page
 */
define(['backbone',
    'masterView',
    'handlebars',
    'text!../app/modules/dataMonitor/dataMonitorPage/dataMonitorPageBody.html',
    'processListView',
    'processCollection'
], function (Backbone, MasterView, Handlebars, DataMonitorPageBodyTemplate, ProcessListView, ProcessCollection) {
    'use strict';

    return MasterView.extend({

        dom: {
            PROCESSCONTAINER: '.process-container-js'
        },

        initialize: function () {
            this.dataMonitorPageBodyTemplate = Handlebars.compile(DataMonitorPageBodyTemplate);

            // Setup some example options for the Backbone Polling plugin
            var pollOptions = { refresh: 2000 };
            this.processCollection = new ProcessCollection();
            this.processCollection.configure(pollOptions);

            // Add some listeners to the events that the plugin triggers
            this.listenTo(this.processCollection, 'refresh:done', function() {
                console.log('Done with the fetch request');
            });
            this.listenTo(this.processCollection, 'refresh:fail', function() {
                console.log('Had a problem requesting from the server. Going to keep trying.');
            });
            this.listenTo(this.processCollection, 'refresh:always', function() {
                console.log('Finished another fetch request');
            });

            MasterView.prototype.initialize.apply(this);
            return this;
        },

        render: function() {
            var self = this;
            this._removeSubViews();
            this.$el.html(this.dataMonitorPageBodyTemplate());
            this.processListView = new ProcessListView({el: this.$el.find(this.dom.PROCESSCONTAINER),
                collection: this.processCollection}).render();
            this.processCollection.startFetching();
            this.subViews.push(this.processListView);
            return this;
        },

        remove: function() {
            this.processCollection.stopFetching();
            this.processCollection = null;
            MasterView.prototype.remove.apply(this);
        }

    });
});