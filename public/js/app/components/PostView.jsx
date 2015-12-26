/**
 * PostView.jsx
 *
 * @author albert
 * @author kevin
 */

'use strict';

var React = require('react');
var _ = require('underscore');

var router = require('./../../router');

var {
  RaisedButton,
  Snackbar
} = require('material-ui');

var PostSort = require('./../../post/components/PostSort.jsx');
var PostContainer = require('./../../post/components/PostContainer.jsx');
var NewPostPanel = require('./../../post/components/NewPostPanel.jsx');
var LeftSidebar = require('./LeftSidebar.jsx');
var RightSidebar = require('./RightSidebar.jsx');
var BoardSidebar = require('./../../board/components/BoardSidebar.jsx');

var BevyStore = require('./../../bevy/BevyStore');
var BevyActions = require('./../../bevy/BevyActions');

var PostView = React.createClass({

  propTypes: {
    myBevies: React.PropTypes.array,
    activeBevy: React.PropTypes.object,
    allThreads: React.PropTypes.array,
    allPosts: React.PropTypes.array,
    allBevies: React.PropTypes.array,
    activeBoard: React.PropTypes.object
  },

  onRequestJoin(ev) {
    ev.preventDefault();
    //BoardActions.requestJoin(this.props.board, window.bootstrap.user);
    this.refs.snackbar.show();
  },

  render() {
    var joinedBoard = true;
    var joinedParent = true;
    var activeBoard = this.props.activeBoard;
    var parent = BevyStore.getBevy(activeBoard.parent);
    
    if(_.isEmpty(activeBoard)) {
      console.log('whoops', activeBoard);
      return <div/>;
    }

    if(_.isEmpty(window.bootstrap.user)) {
      joinedParent = false;
    }

    if(parent.settings.privacy == 'Private') {
      if(_.find(window.bootstrap.user.bevies, 
        function(bevyId) { 
        return bevyId == parent._id 
      }.bind(this))) {
        joinedParent = true;
      } 
    } else {
      joinedParent = true;
    }

    console.log('joined board', joinedBoard);
    console.log('joined parent', joinedParent);

    if(activeBoard.settings.privacy == 'Private') {
      if(_.find(window.bootstrap.user.boards, 
        function(boardId) { 
        return boardId == activeBoard._id 
      }.bind(this))) {
        joinedBoard = true;
      }
    } else {
      joinedBoard = true;
    }


    if(!joinedParent) {
      return (
        <div className='main-section private-container'>
          <div className='private panel'>
            <div className='private-img'/>
            This commmunity is private
          </div>
        </div>
      );
    }

    if(!joinedBoard) {
      return (
      <div className='main-section private-container'>
        <div className='private panel'>
          <div className='private-img'/>
          you must be approved by an <br/>admin to view this board<br/><br/>
          <RaisedButton label='request join' onClick={ this.onRequestJoin }/>
          <Snackbar
            message="Invitation Requested"
            autoHideDuration={5000}
            ref='snackbar'
            style={{fontSize: '14px', fontWeight: '300'}}
          />
        </div>
      </div>
      );
    }

    var body = (
      <div>
        <NewPostPanel
          activeBevy={ this.props.activeBevy }
          activeBoard={this.props.activeBoard}
          myBevies={ this.props.myBevies }
          disabled={disabled}
        />
        {/*<PostSort 
          activeBevy={ this.props.activeBevy}
          sortType={ this.props.sortType }
          disabled={ disabled }
        />*/}
        <PostContainer
          allPosts={ this.props.allPosts }
          activeBevy={ this.props.activeBevy }
          sortType={ this.props.sortType }
          activeTags={ this.props.activeTags }
          activeBoard={this.props.activeBoard}
        />
      </div>
    );

    return (
      <div className='main-section'>
        <BoardSidebar
          board={activeBoard}
        />
        <div className='post-view-body'>
          { body }
        </div>
        {/*<RightSidebar
          activeBevy={ this.props.activeBevy }
          disabled={ _.isEmpty(window.bootstrap.user) }
          myBevies={ this.props.myBevies }
        />*/}
      </div>
    );
    }
});

module.exports = PostView;
