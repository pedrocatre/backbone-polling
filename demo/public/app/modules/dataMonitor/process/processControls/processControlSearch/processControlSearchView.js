/**
 * View responsible for the search control
 */
define(['backbone',
    'handlebars',
    'baseView',
    'text!../app/modules/dataMonitor/process/processControls/processControlSearch/processControlSearch.html',
    'handlebarsHelpers'
], function (Backbone, Handlebars, BaseView, ProcessControlSearchHtml) {
    'use strict';

    return BaseView.extend({

        tagName: 'form',
        className: 'form-search',

        initialize: function () {
            this.processControlSearchHtml = ProcessControlSearchHtml;
            return this;
        },

        events: {
            'keyup  .search-term-control-js': 'changeSearchTermFilter'
        },

        render: function () {
            this.$el.html(this.processControlSearchHtml);
            return this;
        },

        changeSearchTermFilter: function() {
            var searchTerm = this.$el.find('.search-term-control-js').val(),
                isFetching = this.collection.isFetching();

            // Stop fetching so that any pending fetch request is aborted
            this.collection.stopFetching();

            if(searchTerm !== '') {
                this.collection.configure({ fetchOptions: {data: {searchTerm: searchTerm }}});
            } else {
                this.collection.configure({ fetchOptions: {}});
            }

            // Start fetching again, now with new fetch options, if the collection was fetching when the search term
            // changed
            if(isFetching) { this.collection.startFetching(); }
        }

    });
});
