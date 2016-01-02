/**
 * PostContainer.jsx
 * React Component that manages and wraps around
 * Post panels
 * @author albert
 * @author kevin
 * @flow
 */

'use strict';

var React = require('react');
var {
  CircularProgress
} = require('material-ui');
var Post = require('./Post.jsx');
var Event = require('./Event.jsx');

var _ = require('underscore');
var router = require('./../../router');
var BevyActions = require('./../../bevy/BevyActions');
var BevyStore = require('./../../bevy/BevyStore');
var BoardActions = require('./../../board/BoardActions');
var BoardStore = require('./../../board/BoardStore');
var PostStore = require('./../PostStore');
var NotificationStore = require('./../../notification/NotificationStore');
var PostActions = require('./../PostActions');
var constants = require('./../../constants');

var POST = constants.POST;
var BEVY = constants.BEVY;
var BOARD = constants.BOARD;

var PostContainer = React.createClass({
  propTypes: {
    activeBevy: React.PropTypes.object,
    activeBoard: React.PropTypes.object
  },

  getInitialState() {
    return {
      allPosts: PostStore.getAll(),
      activePosts: [],
      postsLoaded: false
    };
  },

  componentDidMount() {
    PostStore.on(POST.CHANGE_ALL, this.handleChangeAll);
    // sometimes the bevy switch event completes before this is mounted
    if(router.current == 'board')
      BoardActions.switchBoard(this.props.activeBoard._id);
    if(router.current == 'bevy') {
      BevyActions.switchBevy(this.props.activeBevy._id);
    }
  },
  componentWillUnmount() {
    PostStore.off(POST.CHANGE_ALL, this.handleChangeAll);
  },

  onScroll(ev) {
  },

  handleChangeAll() {
    this.setState({
      postsLoaded: true,
      allPosts: PostStore.getAll()
    });
  },

  render() {
    var allPosts = this.state.allPosts || [];
    var posts = [];

    if(!this.state.postsLoaded) {
      return (
        <div className='post-container' style={{ height: 100 }}>
          <div className='loading-indeterminate'>
            <CircularProgress mode="indeterminate" />
          </div>
        </div>
      );
    }
    // for each post
    for(var key in allPosts) {
      var post = allPosts[key];
      switch(post.type) {
        // special render for event post types
        case 'event':
          posts.push(
            <Event
              id={ post._id }
              key={ 'postcontainer:post:' + post._id }
              post={ post }
            />
          );
          break;
        default:
          posts.push(
            <Post
              id={ post._id }
              key={ 'postcontainer:post:' + post._id }
              post={ post }
            />
          );
          break;
      }
    }
    // if filtering got rid of all posts, display no posts
    if(posts.length == 0) {
      return (
        <div className='post-container'>
          <span className='no-posts-text'>No Posts Yet</span>
        </div>
      );
    }

    posts.push(<div key='postcontainer:spacer' style={{height: '100px'}}/>);

    return (
      <div className='post-container' onScroll={ this.onScroll }>
        { posts }
      </div>
    );
  }
});

module.exports = PostContainer;
