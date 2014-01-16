/**
 *
 * backbone-polling v1.0.0
 * https://github.com/pedrocatre/backbone-polling
 *
 * Copyright (c) 2013 Pedro Catré
 *
 * Licensed under the MIT License
 *
 * A simple plugin to give polling capabilities to backbone collections that uses a refresh rate to actively fetch data
 * from the server. Useful for fetching dynamic data for monitoring.
 */
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'jquery'], factory);
    } else {
        // Browser globals
        root.BackbonePolling = factory(root._, root.jQuery);
    }
}(this, function (_, $) {
    'use strict';

    return {

        /**
         * Id returned by the setTimeout function that the plugin uses to specify a delay between fetch requests to the
         * data source
         */
        _backbonePollTimeoutId: undefined,

        /**
         * Control variable used to stop fetch requests
         */
        _backbonePollEnabled: false,

        /**
         * Default settings for the plugin
         */
        _backbonePollSettings: {
            refresh: 1000,                      // rate at which the plugin fetches data
            fetchOptions: {},                   // options for the fetch request
            retryRequestOnFetchFail: true       // automatically retry request on fetch failure
        },

        /**
         * Specify custom options for the plugin
         * @param pollOptions object used to customize the plugin’s behavior
         */
        configure: function(pollOptions){
            this._backbonePollSettings = $.extend(true, {}, this._backbonePollSettings, pollOptions);
        },

        /**
         * Starts the process of polling data from the server
         * @returns {*}
         */
        startFetching: function() {
            this._backbonePollEnabled = true;
            this._refresh(1);
            return this;
        },

        /**
         * Periodically fetch data from a data source
         * @param refreshRateMs rate in milliseconds at which the plugin fetches data
         * @returns {*}
         * @private
         */
        _refresh: function (refreshRateMs) {
            this._backbonePollTimeoutId = setTimeout(_.bind(function() {
                if (this._backbonePollTimeoutId) {
                    clearTimeout(this._backbonePollTimeoutId);
                }
                // Return if _refresh was called but the fetching is stopped
                // should not go this far since the timeout is cleared when fetching is stopped.
                if(!this._backbonePollEnabled) { return; }

                this.fetchRequest = this.fetch(this._backbonePollSettings.fetchOptions);

                this.fetchRequest.done(_.bind(function() {
                        this.trigger('refresh:loaded');
                        this._refresh(this._backbonePollSettings.refresh);
                    }, this)).fail(_.bind(function() {
                        this.trigger('refresh:fail');

                        // If retryRequestOnFetchFail is true automatically retry request
                        if(this._backbonePollSettings.retryRequestOnFetchFail) {
                            this._refresh(this._backbonePollSettings.refresh);
                        } else {
                            this.stopFetching();
                        }
                    }, this)).always(_.bind(function() {
                        this.trigger('refresh:always');
                    }, this));
            }, this), refreshRateMs);
            return this;
        },

        /**
         * Abort pending fetch requests
         * @returns {*}
         */
        abortPendingFetchRequests: function() {
            if(!_.isUndefined(this.fetchRequest) && !_.isUndefined(this.fetchRequest['abort'])) {
                this.fetchRequest.abort();
            }
            return this;
        },

        /**
         * Checks to see if the plugin is polling data from a data source
         * @returns {boolean} true if is fetching, false if it is not fetching
         */
        isFetching: function() {
            return !(_.isUndefined(this._backbonePollTimeoutId));
        },

        /**
         * Stops the process of polling data from the server
         * @returns {*}
         */
        stopFetching: function() {
            this._backbonePollEnabled = false;
            if(this.isFetching()) {
                if (this._backbonePollTimeoutId) {
                    clearTimeout(this._backbonePollTimeoutId);
                }
                this._backbonePollTimeoutId = undefined;
            }
            this.abortPendingFetchRequests();
            return this;
        }

    };
}));