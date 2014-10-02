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
            this._bindClickOnTab();
            this._bindArrowKeys();
        },

        /**
         * Binding click on tabs
         *
         * @private
         */
        _bindClickOnTab: function () {
            var _this = this; // Save context

            this._bTabs.on('click', '.b-tabs__tab', function (e) {
                var name = $(this).data('name');

                _this._openTab(name);

                e.preventDefault();
            });

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
                } else if (e.keyCode === 37) {
                    this.openPrev();
                }
            }.bind(this));
        },

        /**
         * Open tab
         *
         * @param {String} name
         * @private
         */
        _openTab: function (name) {
            this._bTabs.find('.b-tabs__tab')
                .removeClass(currentClass)
                .filter('._name_' + name)
                .addClass(currentClass);

            this._openPanel(name);
        },

        /**
         * Open panel
         *
         * @param {String} name
         * @private
         */
        _openPanel: function (name) {
            this._bPanels.find('.b-tabs__panel')
                .removeClass(currentClass)
                .filter('._name_' + name)
                .addClass(currentClass);
        },

        /**
         * Open next tab
         */
        openNext: function () {
            var tabs = this._bTabs.find('.b-tabs__tab');
            var currentTab = this._bTabs.find('.' + currentClass);
            var current = currentTab.index();
            var length = tabs.length;
            var next = current + 1;

            if (next === length) {
                next = 0;
            }

            this._openTab($(tabs[next]).data('name'));
        },

        /**
         * Open previous tab
         */
        openPrev: function () {
            var tabs = this._bTabs.find('.b-tabs__tab');
            var currentTab = this._bTabs.find('.' + currentClass);
            var current = currentTab.index();
            var length = tabs.length;
            var prev = current - 1;

            if (prev === -1) {
                prev = length - 1;
            }

            this._openTab($(tabs[prev]).data('name'));
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
