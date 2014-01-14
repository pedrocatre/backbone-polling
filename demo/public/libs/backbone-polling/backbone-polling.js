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

        // Variable that controls stopping the fetch requests
        doFetchRequest: false,

        configure: function(pollOptions){
            this._backbonePollSettings = $.extend( {}, this._backbonePollSettings, pollOptions );
        },

        _backbonePollSettings: {
            refresh: 1000,                      // rate at which the plugin fetches data
            done: function() {},                // handler to be called when the Deferred object is resolved
            fail: function() {},                // handler to be called when the Deferred object is rejected
            always: function() {},              // handler that is always called when the fetch request finishes
            fetchOptions: {},                   // options for the fetch request
            retryRequestOnFetchFail: true       // automatically retry request on fetch failure
        },

        startFetching: function() {
            this.doFetchRequest = true;
            this._refresh(1);
            return this;
        },

        _refresh: function (length) {
            var self = this;

            self.timeout = setTimeout(function() {
                clearTimeout(self.timeout);

                // Return if _refresh was called but the fetching is stopped
                // should not go this far since the timeout is cleared when fetching is stopped.
                if(!self.doFetchRequest) { return self; }

                self.fetchRequest = self.fetch(self._backbonePollSettings.fetchOptions);

                self.fetchRequest.done(function() {
                    self._setupCallback('done', arguments);
                    self.trigger('finishedFetch');
                    self._refresh(self._backbonePollSettings.refresh);
                }).fail(function() {
                        self._setupCallback('fail', arguments);

                        // If retryRequestOnFetchFail is true automatically retry request
                        if(self._backbonePollSettings.retryRequestOnFetchFail) {
                            self._refresh(self._backbonePollSettings.refresh);
                        } else {
                            self.stopFetching();
                        }
                    }).always(function() {
                        self._setupCallback('always', arguments);
                    });
            }, length );
            return this;
        },

        /**
         * Helper function for calling handlers
         * @param callbackCodeName is the name of the handler setting whose callback we want to
         * execute (ex: done)
         * @returns {*}
         * @private
         */
        _setupCallback: function(callbackCodeName) {
            // Get the callback function
            var callback = this._backbonePollSettings[callbackCodeName];

            if(_.isFunction(callback)) {
                // First argument is the callbackCodeName, so don't send that
                callback.apply(this, _.rest(arguments, 1));
            }
            return this;
        },

        abortPendingFetchRequests: function() {
            if(!_.isUndefined(this.fetchRequest) && !_.isUndefined(this.fetchRequest['abort'])) {
                this.fetchRequest.abort();
            }
            return this;
        },

        isFetching: function() {
            return !(_.isUndefined(this.timeout));
        },

        stopFetching: function() {
            this.doFetchRequest = false;
            if(_.isUndefined(this.timeout) === false) {
                clearTimeout(this.timeout);
                this.timeout = undefined;
            }
            this.abortPendingFetchRequests();
            return this;
        }

    };
}));