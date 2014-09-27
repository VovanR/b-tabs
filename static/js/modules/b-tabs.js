/**
 * @author VovanR <mail@vovanr.com>
 */

define([
    'jquery',
], function (
    $
) {

    'use strict';

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
            this._bTabs = bTabs.filter('.b-tabs__tabs');
            this._bPanels = bTabs.filter('.b-tabs__panels');

            this._bindControls();
        },

        /**
         * Bindings
         *
         * @private
         */
        _bindControls: function () {
            var _this = this; // Save context

            this._bTabs.on('click', '.b-tabs__tab', function (e) {
                var $this = $(this);
                var name = $this.data('name');
                _this._bTabs.find('.b-tabs__tab')
                    .removeClass(currentClass)
                    .filter('._name_' + name)
                    .addClass(currentClass);
                _this._bPanels.find('.b-tabs__panel')
                    .removeClass(currentClass)
                    .filter('._name_' + name)
                    .addClass(currentClass);

                e.preventDefault();
            });

            this._bindArrowKeys();
        },

        /**
         * Binding arrow keys to navigate tabs
         *
         * @private
         */
        _bindArrowKeys: function () {
            this._bTabs.on('keyup', function (e) {
                if (e.keyCode === 39) {
                    this.openNext();
                }
            }.bind(this));
        },

        /**
         * Open next tab
         */
        openNext: function () {
            var tabs = this._bTabs.find('.b-tabs__tab');
            var current = this._bTabs.find('.' + currentClass).index();
            var length = tabs.length;

            tabs.removeClass(currentClass);

            $(tabs[current + 1]).addClass(currentClass);
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
