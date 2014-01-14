describe('Backbone Polling Methods', function() {

    /**
     * Helper function that creates a spy and associates it with an object mixed with the backbone polling plugin and a
     * plugin event
     * @param objectMixedWithPlugin the object mixed with the plugin
     * @param eventName the name of the event that when triggered will call the spy
     * @returns {*}
     */
    var createSpyForPluginEvent = function(objectMixedWithPlugin, eventName) {
        var callbackForEvent = jasmine.createSpy();
        objectMixedWithPlugin.listenTo(objectMixedWithPlugin, eventName, callbackForEvent);
        return callbackForEvent;
    };

    beforeEach(function() {
        this.BackboneCollection = Backbone.Collection.extend({
            url: '/processes'
        });

        // Add backbone polling mixin
        _.extend(this.BackboneCollection.prototype, window.BackbonePolling);
        this.collection = new this.BackboneCollection();

        this.BackboneModel = Backbone.Model.extend({
            url: '/process'
        });

        // Add backbone polling mixin
        _.extend(this.BackboneModel.prototype, window.BackbonePolling);
        this.model = new this.BackboneModel();

        // Configure the refresh rate to be small so the tests execute faster
        this.collection.configure({ refresh: 10 });
    });

    afterEach(function() {
        this.collection.stopFetching();
        this.model.stopFetching();
        this.collection.stopListening();
        delete this.model;
        delete this.collection;
    });

    it('can start and stop fetching', function() {
        this.collection.startFetching();
        expect(this.collection.isFetching()).toBe(true);
        this.collection.stopFetching();
        expect(this.collection.isFetching()).toBe(false);
    });

    it('can query the data source multiple times', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 3;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            dfd.resolve();
            return dfd.promise();
        });

        this.collection.listenTo(this.collection, 'refresh:done', function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
        });

        var callbackAlways = createSpyForPluginEvent(this.collection, 'refresh:always');

        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(true);
            expect(callbackAlways).toHaveBeenCalled();
            expect(callbackAlways.callCount).toBe(numberOfTimesToCallBeforeContinuing);
        });
    });

    it('can configure callback functions', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 3;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            if(counter < numberOfTimesToCallBeforeContinuing) {
                dfd.resolve();
            } else {
                dfd.reject();
            }
            return dfd.promise();
        });

        this.collection.configure({ refresh: 10 });

        var callbackFail = createSpyForPluginEvent(this.collection, 'refresh:fail');
        var callbackDone = createSpyForPluginEvent(this.collection, 'refresh:done');

        this.collection.listenTo(this.collection, 'refresh:always', function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
        });

        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(true);
            expect(callbackDone).toHaveBeenCalled();
            expect(callbackFail).toHaveBeenCalled();
            expect(callbackDone.callCount).toBe(2);
            expect(callbackFail.callCount).toBe(1);
        });
    });

    it('can automatically retry a failed fetch', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 2;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            dfd.reject();
            return dfd.promise();
        });

        var callbackFail = createSpyForPluginEvent(this.collection, 'refresh:fail');

        this.collection.listenTo(this.collection, 'refresh:always', function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing);
        });

        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(true);
            expect(callbackFail).toHaveBeenCalled();
            expect(callbackFail.callCount).toBe(numberOfTimesToCallBeforeContinuing);
        });
    });

    it('can disable an automatic retry of a failed fetch', function() {
        var counter = 1;
        var continueFlag = false;
        var numberOfTimesToCallBeforeContinuing = 2;

        spyOn(this.collection, 'fetch').andCallFake(function() {
            var dfd = $.Deferred();
            dfd.reject();
            return dfd.promise();
        });

        this.collection.configure({ retryRequestOnFetchFail: false });

        var callbackFail = createSpyForPluginEvent(this.collection, 'refresh:fail');

        this.collection.listenTo(this.collection, 'refresh:always', _.bind(function() {
            continueFlag = (counter++ === numberOfTimesToCallBeforeContinuing) ||
                (this.collection.isFetching() === false);
        }, this));

        this.collection.startFetching();

        waitsFor(function(){
            return continueFlag;
        });

        runs(function () {
            expect(this.collection.isFetching()).toBe(false);
            expect(callbackFail).toHaveBeenCalled();
            expect(callbackFail.callCount).toBe(1);
        });

    });

});
