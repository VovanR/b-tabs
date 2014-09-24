/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
], function (
    $
) {

    var Tabs;
    var currentClass = '_state_current';

    /**
     * Tabs module
     *
     * @param {Object} o Options
     * @param {String} o.name
     * @constructor
     */
    Tabs = function (o) {
        this._name = o.name;

        this._bTabs = null;
        this._bPanels = null;

        this._initialize();
    };

    Tabs.prototype = {
        /**
         * Initialize
         *
         * @private
         */
        _initialize: function () {
            console.info('Tabs init');

            var bTabs = $('.b-tabs._name_' + this._name);
            this._bTabs = bTabs.find('.b-tabs__tab');
            this._bPanels = bTabs.find('.b-tabs__panel');

            this._bindControls();
        },

        /**
         * Bindings
         *
         * @private
         */
        _bindControls: function () {
            var _this = this; // Save context
        },

        /**
         * Returns module name
         *
         * @returns {String} name
         */
        getName: function () {
            return this._name;
        },
    };

    return Tabs;

});
