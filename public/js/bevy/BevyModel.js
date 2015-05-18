/**
 * BevyModel.js
 *
 * Backbone model for Bevies
 *
 * @author albert
 */

'use strict';

// imports
var Backbone = require('backbone');

var constants = require('./../constants');

// backbone model
module.exports = Backbone.Model.extend({
	defaults: {
		name: null,
		description: null,
		image_url: null,
		members: [],
		settings: {},
		created: 0,
		updated: 0
	},

	idAttribute: '_id'
});
