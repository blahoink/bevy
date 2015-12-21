/**
 * threads.js
 * @author albert
 * @flow
 */

'use strict';

var mongoose = require('mongoose');
var async = require('async');
var _ = require('underscore');
var shortid = require('shortid');

var Thread = require('./../models/Thread');
var Bevy = require('./../models/Bevy');
var User = require('./../models/User');
var Message = require('./../models/Message');

// GET /users/:id/threads
exports.getThreads = function(req, res, next) {
	var id = req.params.id;

	async.waterfall([
		function(done) {
			User.findOne({ _id: id }, function(err, user) {
				if(err) return next(err);
				return done(null, user);
			}).populate('bevies');
		},
		function(user, done) {
			var bevy_id_list = _.pluck(user.bevies, '_id');

			Thread.find(function(err, threads) {
				if(err) return next(err);
				var $threads = [];
				async.each(
					threads,
					function(thread, callback) {
						thread = JSON.parse(JSON.stringify(thread));
						Message.find({ thread: thread._id }, function(err, latest) {
					      if(err) return next(err);
					      latest = JSON.parse(JSON.stringify(latest));
					      thread.latest = latest[0];
					      $threads.push(thread);
					      callback();
					    })
					    .limit(1)
					    .sort('-created')
					    .populate('author');
					},
					function(err) {
						if(err) {
							return next(err);
						}
						else {
							return res.json($threads);
						}
					}
				);
			})
			.or([{ users: id }, { bevy: { $in: bevy_id_list } }])
			.populate('bevy users');
		}
	]);
}

// GET /bevies/:id/thread
exports.getThread = function(req, res, next) {
	var id = req.params.id;
	Thread.findOne({ bevy: id }, function(err, thread) {
		if(err) return next(err);
	    Message.find({ thread: thread._id }, function(err, latest) {
	      if(err) return next(err);
	      thread = thread.toObject();
	      thread.latest = latest;
	      return res.json(thread);
	    })
	    .populate('created')
	    .sort('-created')
	    .limit(1);
	}).populate('bevy users');
}


// POST /threads
exports.createThread = function(req, res, next) {
	var thread = {};
	thread._id = shortid.generate();
	thread.name = req.body['name'];
	thread.image = req.body['image'];
	thread.type = req.body['type'];
	thread.bevy = req.body['bevy'];
	thread.users = req.body['users'];

	Thread.create(thread, function(err, $thread) {
		if(err) return next(err);
		Thread.populate($thread, 'bevy users', function(err, pop_thread) {
			if(err) return next(err);
			return res.json(pop_thread);
		});
	});
};

// PUT/PATCH /users/:id/threads/:threadid
// PUT/PATCH /threads/:threadid
exports.updateThread = function(req, res, next) {
	var thread_id = req.params.threadid;

	var thread = {};
	if(req.body['users'] != undefined)
		thread.users = req.body['users'];
	if(req.body['bevy'] != undefined)
		thread.bevy = req.body['bevy'];
	if(req.body['type'] != undefined)
		thread.type = req.body['type'];
	if(req.body['name'] != undefined)
		thread.name = req.body['name'];
	if(req.body['image'] != undefined)
		thread.image = req.body['image'];

	var promise = Thread.findOneAndUpdate({ _id: thread_id }, thread, { new: true })
		.populate('bevy users')
		.exec();
	promise.then(function($thread) {
		return res.json($thread);
	}, function(err) { return next(err); })
}

// DELETE /users/:id/threads/:threadid
exports.destroyThread = function(req, res, next) {
	var thread_id = req.params.threadid;

	Thread.findOneAndRemove({ _id: thread_id }, function(err, thread) {
		if(err) return next(err);
		return res.json(thread);
	});
}