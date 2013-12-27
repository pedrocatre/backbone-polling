/**
 * View responsible for listing the processes
 */
define(['backbone',
    'underscore',
    'handlebars',
    'masterView',
    'text!../app/modules/dataMonitor/process/processList.html',
    'processItemView',
    'backbone'
], function (Backbone, _, Handlebars, MasterView, ProcessListTemplate, ProcessItemView) {
    return MasterView.extend({

        dom: {
            PROCESSLIST: '.process-list-js',
            CONTROLFETCHINGBTN: '.control-fetching-btn-js'
        },

        events: {
            'click .control-fetching-btn-js': 'changeFetchingState'
        },

        initialize: function (params, options) {
            this.processListTemplate = Handlebars.compile(ProcessListTemplate);
            this.listenTo(this.collection, 'finishedFetch', this.render);
            this.isFetching = true;
            MasterView.prototype.initialize.apply(this);
            return this;
        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.processListTemplate({ isFetching: this.isFetching }));
            this.$elementList = this.$el.find(this.dom.PROCESSLIST);

            // Create the new HTML in a fragment before adding it to the DOM
            var fragment = document.createDocumentFragment();
            this.collection.each( function(process) {
                var processItemView = new ProcessItemView({model: process});
                this.subViews.push(processItemView);
                fragment.appendChild(processItemView.render().el);
            }, this);

            if(this.collection.length > 0) {
                this.$elementList.html(fragment);
            }

            return this;
        },

        changeFetchingState: function(e) {
            (this.isFetching) ? this.collection.stopFetching() : this.collection.startFetching();
            this.isFetching = !this.isFetching;
            this.render();
            return this;
        },

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});
