/**
 * CommentActions.jsx
 *
 * @author albert
 */

'use strict';

// imports
var dispatch = require('./../shared/helpers/dispatch');

var COMMENT = require('./../constants').COMMENT;

var CommentActions = {

	create: function(post_id, author, body, comment_id) {
		dispatch(COMMENT.CREATE, {
			post_id: (post_id == undefined) ? null : post_id,
			author: (author == undefined) ? null : author,
			body: (body == undefined) ? null : body,
			comment_id: (comment_id == undefined) ? null : comment_id
		});
	},

	destroy: function() {
		dispatch(COMMENT.DESTROY, {

		});
	},

	vote: function() {
		dispatch(COMMENT.VOTE, {

		});
	}
}

module.exports = CommentActions;
