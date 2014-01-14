define(['backbone',
    'underscore',
    'baseView',
    'gauge'
], function (Backbone, _, BaseView) {
    'use strict';

    return BaseView.extend({

        initialize: function () {
            this.opts = {
                lines: 12,                      // The number of lines to draw
                angle: 0.15,                    // The length of each line
                lineWidth: 0.34,                // The line thickness
                pointer: {
                    length: 0.77,               // The radius of the inner circle
                    strokeWidth: 0.086,         // The rotation offset
                    color: '#000000'            // Fill color
                },
                limitMax: 'false',              // If true, the pointer will not go past the end of the gauge

                colorStart: '#6FADCF',          // Colors
                colorStop: '#8FC0DA',           // just experiment with them
                strokeColor: '#E0E0E0',         // to see which ones work best for you
                generateGradient: true
            };
            this.listenTo(this.model, 'change:value', this.updateValue);
            return this;
        },

        updateValue: function () {
            if(!_.isUndefined(this.gauge)) {
                this.gauge.set(this.model.get('value'));
            }
        },

        render: function () {
            this.gauge = new Gauge(this.$el.get(0)).setOptions(this.opts); // create sexy gauge!
            this.gauge.maxValue = 3000; // set max gauge value
            this.gauge.animationSpeed = 32; // set animation speed (32 is default value)
            this.gauge.set(this.model.get('value')); // set actual value
            return this;
        },

        remove:function() {
            BaseView.prototype.remove.apply(this);
        }

    });
});
