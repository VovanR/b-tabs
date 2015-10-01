/**
 * Tabs for any content
 *
 * @module Tabs
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

/* global define */
define([
	'jquery'
], function (
	$
) {
	'use strict';

	var Tabs;
	var currentClass = '_state_current';

	/**
	 * @param {Object} o Options
	 * @param {String} o.name
	 * @constructor
	 * @alias module:Tabs
	 */
	Tabs = function (o) {
		this._name = o.name;

		this._$tabs = null;
		this._$panels = null;

		this._init();
	};

	Tabs.prototype = {
		/**
		 * Initialize
		 *
		 * @private
		 */
		_init: function () {
			console.info('Tabs init');

			var bTabs = $('.b-tabs._name_' + this._name);
			this._$tabs = bTabs.filter('.b-tabs__tabs');
			this._$panels = bTabs.filter('.b-tabs__panels');

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
			var _this = this;

			this._$tabs.on('click', '.b-tabs__tab', function (e) {
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
			this._$tabs.on('keyup', function (e) {
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
			this._$tabs.find('.b-tabs__tab')
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
			this._$panels.find('.b-tabs__panel')
				.removeClass(currentClass)
				.filter('._name_' + name)
				.addClass(currentClass);
		},

		/**
		 * Open next tab
		 */
		openNext: function () {
			var tabs = this._$tabs.find('.b-tabs__tab');
			var currentTab = this._$tabs.find('.' + currentClass);
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
			var tabs = this._$tabs.find('.b-tabs__tab');
			var currentTab = this._$tabs.find('.' + currentClass);
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
		}
	};

	return Tabs;
});
