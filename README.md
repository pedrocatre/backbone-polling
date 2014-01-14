Backbone-Polling
==============
[![Build Status](https://travis-ci.org/pedrocatre/backbone-polling.png)](https://travis-ci.org/pedrocatre/backbone-polling)

A simple plugin to give poll capabilities to backbone collections and models that uses a refresh rate to actively fetch data and keep the collection or model updated. In other words, it gives a backbone collection or model the ability to periodically query a data source.
Useful for fetching dynamic data for monitoring.

## Source Code And Downloads

Development: [backbone-polling.js](https://raw.github.com/pedrocatre/backbone-polling/master/dist/backbone-polling.js)

Production: [backbone-polling.min.js](https://raw.github.com/pedrocatre/backbone-polling/master/dist/backbone-polling.min.js)

## Basic Demo

http://aqueous-badlands-8314.herokuapp.com

## Dependencies

This plugin uses backbone (v1.0.0 or above) , jQuery (v1.10.2 or above) and underscore (version 1.3.3 or above).

## Usage

One possible usage is to create a backbone collection (or model) and add the plugin as a mixin.

* Example without AMD

```javascript
var ProcessCollection = Backbone.Collection.extend({
    url: '/processes',
});

// Add backbone polling mixin
_.extend(ProcessCollection.prototype, BackbonePolling);
```

* Example with AMD

```javascript
define([
    'backbone',
    'underscore',
    'backbonePolling',
], function (Backbone, _, BackbonePolling) {
    'use strict';

    var ProcessCollection = Backbone.Collection.extend({
        url: '/processes',
    });

    // Add backbone polling mixin
    _.extend(ProcessCollection.prototype, BackbonePolling);

    return ProcessCollection;
});
```

Simply Instantiate and start fetching:

```javascript
var processCollection = new ProcessCollection();
processCollection.startFetching();
```

Or pass in some options first:

```javascript
var pollOptions = { refresh: 2000 };
var processCollection = new ProcessCollection();

// Specify custom options for the plugin.
// You can also call this function inside the collection's initialize function and pass the
// options for the plugin when instantiating a new collection.
processCollection.configure(pollOptions);
processCollection.startFetching();
```

## Configuration Options

An object can be used to customize the plugin’s behavior. All configurations are optional.

```javascript
var options = {
    refresh: 1000,                 // rate at which the plugin fetches data
    fetchOptions: {},              // options for the fetch request
    retryRequestOnFetchFail: true  // automatically retry request on fetch failure
}
```

* refresh: refresh rate in milliseconds. Default value is 1000 milliseconds.
* fetchOptions: to be passed in the collection.fetch() request (same options as the backbone collection’s fetch method).
* retryRequestOnFetchFail: specify if the plugin should retry the request if fails or if it should simply stop fetching data.

## Events

* refresh:done: is triggered every time a fetch finishes successfully.
* refresh:fail: is triggered every time a fetch request fails.
* refresh:always: is triggered every time a fetch request finishes.

## Methods

* configure(options): specify custom options for the plugin
* startFetching: starts polling data from the server.
* stopFetching: stops fetching data from the server.
* isFetching: returns true if the collection is fetching data and false otherwise.

## License

The code in this repository can be used under the MIT License.