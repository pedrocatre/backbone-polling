/**
 * View responsible for rendering the data monitor page
 */
define(['backbone',
    'masterView',
    'underscore',
    'handlebars',
    'text!../app/modules/dataMonitor/singleProcessMonitorPage/singleProcessMonitorPageBody.html',
    'text!../app/modules/dataMonitor/singleProcessMonitorPage/singleProcessNotFound.html',
    'processItemView',
    'processModel'
], function (Backbone, MasterView, _, Handlebars, SingleProcessMonitorPageBodyTemplate, SingleProcessNotFoundHtml,
             ProcessItemView, ProcessModel) {
    'use strict';

    return MasterView.extend({

        dom: {
            PROCESSDETAILCONTAINER: '.process-detail-container-js'
        },

        initialize: function (options) {
            this.processId = options.processId;
            this.singleProcessMonitorPageBodyTemplate = Handlebars.compile(SingleProcessMonitorPageBodyTemplate);
            this.processModel = new ProcessModel({ id: this.processId });
            this.processModel.configure({
                retryRequestOnFetchFail: false
            });
            this.listenTo(this.processModel, 'refresh:fail', this.renderNotFoundMessage);
            MasterView.prototype.initialize.apply(this);
            return this;
        },

        render: function() {
            this._removeSubViews();
            this.$el.html(this.singleProcessMonitorPageBodyTemplate({ processIdentification: this.processId }));


            this.processModel.fetch({
                success: _.bind(function(model, response, options) {
                    var processDetailsView = new ProcessItemView({model: this.processModel});
                    this.$el.find(this.dom.PROCESSDETAILCONTAINER).html(processDetailsView.render().el);
                    this.processModel.startFetching();
                    this.subViews.push(processDetailsView);
                }, this),
                error: _.bind(function(model, response, options) {
                    this.renderNotFoundMessage();
                }, this)
            });
            return this;
        },

        renderNotFoundMessage: function () {
            this.$el.find(this.dom.PROCESSDETAILCONTAINER).html(SingleProcessNotFoundHtml);
        },

        remove: function() {
            this.processModel.stopFetching();
            this.processModel = null;
            MasterView.prototype.remove.apply(this);
        }

    });
});