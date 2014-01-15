/**
 * View responsible for rendering a process item
 */
define(['backbone',
    'handlebars',
    'baseView',
    'text!../app/modules/dataMonitor/process/processItem.html',
    'handlebarsHelpers'
], function (Backbone, Handlebars, BaseView, ProcessItemTemplate) {
    'use strict';

    return BaseView.extend({

        tagName: 'li',
        className: 'process-item',

        initialize: function () {
            this.processItemTemplate = Handlebars.compile(ProcessItemTemplate);
            this.listenTo(this.model, 'refresh:done', this.render);
            return this;
        },

        events: {
            'click': 'navigateToSingleProcessMonitorPage'
        },

        render: function () {
            var processItemHtml = this.processItemTemplate(this.model.toJSON());
            this.$el.html(processItemHtml);
            return this;
        },

        navigateToSingleProcessMonitorPage: function () {
            window.AppUtils.app.navigate('/processDetails/' + this.model.get('id'), {trigger: true});
        },

        remove:function() {
            BaseView.prototype.remove.apply(this);
        }

    });
});