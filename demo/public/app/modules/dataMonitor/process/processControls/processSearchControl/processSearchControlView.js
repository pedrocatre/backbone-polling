/**
 * View responsible for the search control
 */
define(['backbone',
    'underscore',
    'handlebars',
    'baseView',
    'text!../app/modules/dataMonitor/process/processControls/processSearchControl/processSearchControl.html',
    'handlebarsHelpers'
], function (Backbone, _, Handlebars, BaseView, ProcessControlSearchHtml) {
    'use strict';

    return BaseView.extend({

        initialize: function () {
            this.processControlSearchHtml = ProcessControlSearchHtml;
            return this;
        },

        events: {
            'keyup  .search-term-control-js': '_setTimeOutForChangeSearchFilter'
        },

        render: function () {
            this.$el.html(this.processControlSearchHtml);
            return this;
        },

        /**
         * Delay calling a function to change the search term until the user appears to have finished typing
         * @private
         */
        _setTimeOutForChangeSearchFilter: function() {

            // Interrupt the timeout if the user keeps typing
            if (this.searchTimerId) {
                window.clearTimeout(this.searchTimerId);
            }

            // Delay calling the function that changes the search term
            this.searchTimerId = window.setTimeout(_.bind(function() {
                this._changeSearchTermFilter();
            }, this), 300);
        },

        /**
         * Configure the collection to take into account a search term in the fetch options
         * @private
         */
        _changeSearchTermFilter: function() {
            var searchTerm = this.$el.find('.search-term-control-js').val(),
                isFetching = this.collection.isFetching();

            // Stop fetching so that any pending fetch request is aborted
            this.collection.stopFetching();

            this.collection.configure({ fetchOptions: { data: {searchTerm: searchTerm }}});

            // Start fetching again, now with new fetch options, if the collection was fetching when the search term
            // changed
            if(isFetching) { this.collection.startFetching(); }
        }

    });
});
