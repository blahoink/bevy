/**
 * comments.js
 *
 * @author albert
 */

'use strict';

var mongoose = require('mongoose');
var error = require('./../error');
var _ = require('underscore');
var async = require('async');

var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

function collectCommentParams(req) {
	var update = {};
	// dynamically load schema values from request object
	Comment.schema.eachPath(function(pathname, schema_type) {
		// collect path value
		var val = null;
		if(req.body != undefined) val = req.body[pathname];
		if(!val && !_.isEmpty(req.query)) val = req.query[pathname];
		if(!val) return;
		update[pathname] = val;
	});
	return update;
}

// GET /bevies/:bevyid/posts/:postid/comments
exports.index = function(req, res, next) {
	var postid = req.params.postid;
	var query = { postId: postid };
	var promise = Comment.find(query)
		.populate('author')
		.exec();
	promise.then(function(comments) {
		return res.json(comments);
	}, function(err) {
		return next(err);
	});
}

// GET /posts/:postid/comments/create
// POST /posts/:postid/comments/
exports.create = function(req, res, next) {
	var update = collectCommentParams(req);

	if(!update.body) return next(error.gen('comment body not specified'));

	Comment.create(update, function(err, comment) {
		if(err) return next(err);
		return res.json(comment);
	});
}

// GET /posts/:postid/comments/:id
exports.show = function(req, res, next) {
	var id = req.params.id;
	var query = { _id: id };
	var promise = Comment.findOne(query)
		.exec();
	promise.then(function(comment) {
		if(!comment) return next(error.gen('comment not found'));
		return res.json(comment);
	}, function(err) {
		return next(err);
	});
}

// GET /posts/:postid/comments/:id/edit
// GET /posts/:postid/comments/:id/update
// PUT /posts/:postid/comments/:id/
exports.update = function(req, res, next) {
	var update = collectCommentParams(req);
	var id = req.params.id;
	var query = { _id: id };
	var promise = Comment.findOneAndUpdate(query, update)
		.exec();
	promise.then(function(comment) {
		if(!comment) return next(error.gen('comment not found'));
		return res.json(comment);
	}, function(err) {
		return next(err);
	});
}

// GET /posts/:postid/comments/:id/destroy
// DELETE /posts/:postid/comments/:id/
exports.destroy = function(req, res, next) {
	// delete comment
	var id = req.params.id;
	var query = { _id: id };
	var promise = Comment.findOneAndRemove(query).exec();
	promise.then(function(comment) {
		if(!comment) return next(error.gen('comment not found'));
		done(null, comment);
	}, function(err) {
		return next(err);
	});
}
