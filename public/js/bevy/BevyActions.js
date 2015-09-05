/**
 * BevyActions.js
 *
 * Action dispatcher for bevies
 *
 * @author albert
 */

'use strict';

// imports
var dispatch = require('./../shared/helpers/dispatch');

var BEVY = require('./../constants').BEVY;

var PostActions = {

  create(name, description, image_url, slug) {

    dispatch(BEVY.CREATE, {
      name: (name == undefined) ? '' : name,
      description: (description == undefined) ? '' : description,
      image_url: (image_url == undefined) ? '' : image_url,
      slug: slug
    });
  },

  destroy(id) {
    dispatch(BEVY.DESTROY, {
      id: (id == undefined) ? '0' : id
    });
  },

  update(bevy_id, name, description, image_url, tags, siblings, settings) {
    console.log(siblings);
    dispatch(BEVY.UPDATE, {
      bevy_id: (bevy_id == undefined) ? '' : bevy_id,
      name: (name == undefined) ? null : name,
      description: (description == undefined) ? null : description,
      image_url: (image_url == undefined) ? null : image_url,
      tags: (tags == undefined) ? null : tags,
      siblings: (siblings == undefined) ? null : siblings,
      settings: (settings == undefined) ? null : settings
    });
  },

  leave(bevy_id) {
    dispatch(BEVY.LEAVE, {
      bevy_id: (bevy_id == undefined) ? '' : bevy_id
    });
  },


  join(bevy_id) {
    dispatch(BEVY.JOIN, {
      bevy_id: (bevy_id == undefined) ? '0' : bevy_id
    });
  },

  addUser(bevy_id, user_id, email) {
    dispatch(BEVY.ADD_USER, {
      bevy_id: (bevy_id == undefined) ? '0' : bevy_id,
      user_id: (user_id == undefined) ? '' : user_id,
      email: (email == undefined) ? '' : email
    });
  },

  requestJoin(bevy, user) {
    dispatch(BEVY.REQUEST_JOIN, {
      bevy: (bevy == undefined) ? {} : bevy,
      user: (user == undefined) ? {} : user
    });
  },

  switchBevy(bevy_id) {
    dispatch(BEVY.SWITCH, {
      bevy_id: bevy_id || -1
    });
  },

  filterBevies(filter) {
    dispatch(BEVY.SORT, {
      filter: (filter == undefined) ? null : filter
    });
  },

  search(query) {
    dispatch(BEVY.SEARCH, {
      query: (query == undefined) ? null : query
    });
  },

  updateTags(tags) {
    dispatch(BEVY.UPDATE_TAGS,{
      tags: (tags == undefined) ? null : tags
    });
  }
};

module.exports = PostActions;
