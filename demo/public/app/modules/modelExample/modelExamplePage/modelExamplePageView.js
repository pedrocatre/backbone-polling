/**
 * View responsible for rendering the model example
 */
define(['backbone',
    'masterView',
    'handlebars',
    'text!../app/modules/modelExample/modelExamplePage/modelExamplePageBody.html',
    'pollingModelView',
    'pollingModel'
], function (Backbone, MasterView, Handlebars, ModelExamplePageTemplate, PollingModelView, PollingModel) {
    'use strict';

    return MasterView.extend({

        dom: {
            PROCESSCONTAINER: '.process-container-js'
        },

        initialize: function () {
            this.modelExamplePageTemplate = Handlebars.compile(ModelExamplePageTemplate);

            // Setup some example options for the Backbone Polling plugin
            var pollOptions = { refresh: 2000 };
            this.pollingModel = new PollingModel();
            this.pollingModel.configure(pollOptions);
            MasterView.prototype.initialize.apply(this);
            return this;
        },

        render: function() {
            var self = this;
            this._removeSubViews();
            this.$el.html(this.modelExamplePageTemplate());
            this.pollingModelView = new PollingModelView({el: this.$el.find(this.dom.PROCESSCONTAINER),
                model: this.pollingModel}).render();
            this.pollingModel.startFetching();
            this.subViews.push(this.pollingModelView);
            return this;
        },

        remove: function() {
            this.pollingModel.stopFetching();
            this.pollingModel = null;
            MasterView.prototype.remove.apply(this);
        }

    });
});
