/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
    '../modules/b-tabs',
], function (
    $,
    Tabs
) {

    var App;

    App = function () {
        this._initialize();
    };

    App.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('App init');

            var tabs = new Tabs();
        },
    };

    return App;

});
