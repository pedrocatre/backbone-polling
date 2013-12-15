Backbone-Poll-Collection
==============
[![Build Status](https://travis-ci.org/pedrocatre/backbone-poll-collection.png)](https://travis-ci.org/pedrocatre/backbone-poll-collection)

A simple plugin to give poll capabilities to backbone collections that uses a refresh rate to actively fetch data and keep the collection updated. In other words, it gives a backbone collection the ability to periodically query a data source.
Useful for fetching dynamic data for monitoring.

## Basic Demo

http://aqueous-badlands-8314.herokuapp.com

## Usage

One possible usage is to create a backbone collection that inherits from backbone-poll-collection.

```javascript
define([
    'backbonePollCollection'
], function (BackbonePollCollection) {

    return BackbonePollCollection.extend({
        url: '/processes',

        initialize: function(){
            //I'm putting this here so you don't forget to call the `BackbonePollCollection`
            //`initialize` when overriding the method
            BackbonePollCollection.prototype.initialize.apply(this, arguments);
        }
    });
});
```

Simply Instantiate and start fetching:

```javascript
var processCollection = new ProcessCollection();
processCollection.startFetching();
```

Or pass in some options first:

```javascript
var pollOptions = {
    refresh: 2000,
    doneFetchCallback: function() {
        console.log('Done with the fetch request');
    },
    havingProblemsFetchingFromTheServer: false,
    failedFetchCallback: function() {
        console.log('The request failed');
        if(!this.havingProblemsFetchingFromTheServer) {
            this.havingProblemsFetchingFromTheServer = true;
            console.log('Had a problem requesting from the server. Going to keep trying.')
        }
    },
    alwaysCallback: function() {
        console.log('Finished another fetch request');
    }
}
var processCollection = new ProcessCollection([], {}, pollOptions);
processCollection.startFetching();
```

## Configuration Options

An object can be used to customize the plugin’s behavior. All configurations are optional.

```javascript
var options = {
    refresh: 1000,                          // rate at which the plugin fetches data
    doneFetchCallback: function() {},       // handler to be called when the Deferred object is resolved
    failedFetchCallback: function() {},     // handler to be called when the Deferred object is rejected
    alwaysCallback: function() {},          // handler that is always called when the fetch request finishes
    fetchOptions: {},                       // options for the fetch request
    retryRequestOnFetchFail: true           // automatically retry request on fetch failure
}
```

refresh: refresh rate in milliseconds. Default value is 1000 milliseconds.
doneFetchCallback: callback function to execute each time a fetch request finishes successfully.
failedFetchCallback: callback function to execute each time a fetch request fails.
failedFetchCallback: callback function to execute each time a fetch request fails.
fetchOptions: to be passed in the collection.fetch() request (same options as the backbone collection’s fetch method).
retryRequestOnFetchFail: specify if the plugin should retry the request if fails or if it should simply stop fetching data.

## Events

* finishedFetch: is triggered every time a fetch finishes successfully.

## Methods

* startFetching: starts polling data from the server.
* stopFetching: stops fetching data from the server.
* resetFetching: resets the collection and restarts fetching if the collection was already fetching
* abortPendingFetchRequests: aborts the current fetch request.
* isFetching: returns true if the collection is fetching data and false otherwise.

## Installation

To install, include the `backbone-poll-collection.js` file in your project and add its path to require.config (if you are using requireJS).

```javascript
require.config({
    paths: {
        //...

        // PollCollection backbone plugin
        backbonePollCollection: '../backbone-poll-collection',

        //...
    }
});
```

## License

The code in this repository can be used under the MIT License.