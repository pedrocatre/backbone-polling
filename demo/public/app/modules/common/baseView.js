/**
 * This is a base view all views should inherit from (or they could inherit from a view that
 * inherits from this view).
 */
define(['backbone',
    'jquery'
], function (Backbone, $) {

    return Backbone.View.extend({

        getInnerHTML: function() {
            // This is a trick to get all the html content and not just the inner html
            // read more about it here http://stackoverflow.com/questions/652763/jquery-object-to-string/5990555#5990555
            // or here http://jquery-howto.blogspot.pt/2009/02/how-to-get-full-html-string-including.html
            return $('<div>').append(this.$el).html();
        },

        changeElementVisibility: function(showElement, $element) {
            if(showElement) {
                $element.show();
            } else {
                $element.hide();
            }
            return this;
        }
    });
});