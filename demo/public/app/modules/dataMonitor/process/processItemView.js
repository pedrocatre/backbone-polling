/**
 * View responsible for rendering a process item
 */
define(['backbone', 'handlebars', 'baseView', 'text!../app/modules/dataMonitor/process/processItem.html', 'handlebarsHelpers'],
    function (Backbone, Handlebars, BaseView, ProcessItemTemplate) {

        var ProcessItemView = BaseView.extend({

            tagName: 'li',
            className: 'process-item',

            initialize: function () {
                this.processItemTemplate = Handlebars.compile(ProcessItemTemplate);
                return this;
            },

            render: function () {
                var processItemHtml = this.processItemTemplate(this.model.toJSON());
                this.$el.html(processItemHtml);
                return this;
            },

            remove:function() {
                BaseView.prototype.remove.apply(this);
            }

        });

        return ProcessItemView;

    });