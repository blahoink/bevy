/**
 * BevyStore.js
 *
 * Backbone and React and Flux confluence
 * for bevies
 *
 * @author albert
 */

'use strict';

// imports
var Backbone = require('backbone');
var _ = require('underscore');

var Dispatcher = require('./../shared/dispatcher');

var Bevy = require('./BevyModel');
var Bevies = require('./BevyCollection');

// create collection
var bevies = new Bevies;
bevies.fetch();

// inherit event class first
// VERY IMPORTANT, as the PostContainer view binds functions
// to this store's events
var PostStore = _.extend({}, Backbone.Events);

// now add some custom functions
_.extend(PostStore, {

	initialize: function() {
		// register dispatcher
		var dispatchId = Dispatcher.register(this.handleDispatch.bind(this));
	},

	// handle calls from the dispatcher
	// these are created from BevyActions.js
	handleDispatch: function(payload) {
		switch(payload.actionType) {
		}
	},

	getAll: function() {
		return bevies.toJSON();
	}

});
module.exports = PostStore;