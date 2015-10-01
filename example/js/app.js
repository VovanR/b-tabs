/**
 * @author Vladimir Rodkin <mail@vovanr.com>
 */

/* global define */
define([
	'jquery',
	'tabs'
], function (
	$,
	Tabs
) {
	'use strict';

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

			this._tabs = new Tabs({
				name: 'test'
			});
		}
	};

	return new App();
});
