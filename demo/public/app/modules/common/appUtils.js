/**
 * This module creates an object where I put the application's global variables.
 * It is helpful because it avoids to much pollution of the global namespace preventing possible conflicts for example:
 * with project libs and browser extensions.
 */
define([],
    function () {
        window.AppUtils = window.AppUtils || {};
        return window.AppUtils;
    });