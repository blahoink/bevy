/**
 * comments.js
 *
 * @author albert
 */

'use strict';

var api = require('./../../api');

module.exports = function(router) {

	// INDEX
	router.get('/bevies/:bevyid/posts/:postid/comments', api.comments.index);

	// CREATE
	router.get('/bevies/:bevyid/posts/:postid/comments/create', api.comments.create);
	router.post('/bevies/:bevyid/posts/:postid/comments', api.comments.create);

	// SHOW
	router.get('/bevies/:bevyid/posts/:postid/comments/:id', api.comments.show);

	// EDIT
	router.get('/bevies/:bevyid/posts/:postid/comments/:id/edit', api.comments.update);

	// UPDATE
	router.get('/bevies/:bevyid/posts/:postid/comments/:id/update', api.comments.update);
	router.put('/bevies/:bevyid/posts/:postid/comments/:id', api.comments.update);
	router.patch('/bevies/:bevyid/posts/:postid/comments/:id', api.comments.update);

	// DESTROY
	router.get('/bevies/:bevyid/posts/:postid/comments/:id/destroy', api.comments.destroy);
	router.delete('/bevies/:bevyid/posts/:postid/comments/:id', api.comments.destroy);

	// non-bevy dependent routes

	// INDEX
	router.get('/posts/:postid/comments', api.comments.index);

	// CREATE
	router.get('/posts/:postid/comments/create', api.comments.create);
	router.post('/posts/:postid/comments', api.comments.create);

	// SHOW
	router.get('/posts/:postid/comments/:id', api.comments.show);

	// EDIT
	router.get('/posts/:postid/comments/:id/edit', api.comments.update);

	// UPDATE
	router.get('/posts/:postid/comments/:id/update', api.comments.update);
	router.put('/posts/:postid/comments/:id', api.comments.update);
	router.patch('/posts/:postid/comments/:id', api.comments.update);

	// DESTROY
	router.get('/posts/:postid/comments/:id/destroy', api.comments.destroy);
	router.delete('/posts/:postid/comments/:id', api.comments.destroy);
}