/**
 * User: Pedro_Catre
 * Date: 23-05-2013
 * Time: 20:48
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'router'
], function($, _, Backbone, Router){
    'use strict';

    var initialize = function(){
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});