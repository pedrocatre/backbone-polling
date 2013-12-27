/**
 * MasterView is composed by subviews and offers common functionality to handle subviews.
 * A common use scenario is for a list view with item suviews
 */
define(['backbone',
    'baseView'
], function (Backbone, BaseView) {

    return BaseView.extend({

        initialize: function () {
            this.subViews = [];
            return this;
        },

        render: function () {
            this._removeSubViews();
            var fragment = document.createDocumentFragment();
            this.collection.each( function(type){
                var childView = new this.ChildView({model:type});
                this.subViews.push(childView);
                fragment.appendChild(childView.render().el);
            }, this);
            this.$elementList.append(fragment);
            return this;
        },

        addElement: function(resource) {
            var resourceView = new this.ChildView({model:resource})
            this.subViews.push(resourceView);
            this.$el.append(resourceView.render().el);
            return this;
        },

        _removeSubViews:function() {
            _.each(this.subViews, function(subView) {
                subView.remove();
            }, this);
            this.subViews = [];
        },

        remove:function() {
            this.stopListening();
            this._removeSubViews();
            this.subViews=null;
            BaseView.prototype.remove.apply(this);
        }
    });
});