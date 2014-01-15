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
    'use strict';

    return MasterView.extend({

        dom: {
            PROCESSLIST: '.process-list-js',
            CONTROLFETCHINGBTN: '.control-fetching-btn-js'
        },

        initialize: function (params, options) {
            this.processListTemplate = Handlebars.compile(ProcessListTemplate);
            this.listenTo(this.collection, 'refresh:done', this.render);
//            this.listenTo(this.collection, 'add', this._addProcess);
//            this.listenTo(this.collection, 'remove', this._removeProcess);

            MasterView.prototype.initialize.apply(this);
            return this;
        },

//        _addProcess: function(model, collection, options) {
//            var processItemView = new ProcessItemView({model: model});
//            this.subViews.push(processItemView);
//            this.$elementList.append(processItemView.render().el);
//        },
//
//        _removeProcess: function(model, collection, options) {
//            var removedProcessView = _.findWhere(this.subViews, {model: model});
//            removedProcessView.remove();
//        },

        render: function () {
            this._removeSubViews();
            this.$el.html(this.processListTemplate());
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

        remove: function() {
            MasterView.prototype.remove.apply(this);
        }

    });
});
