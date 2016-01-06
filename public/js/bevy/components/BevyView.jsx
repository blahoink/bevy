/**
 * BevyView.jsx
 * @author kevin
 * @author albert
 * @flow
 */

'use strict';

var React = require('react');
var Ink = require('react-ink');
var {
  RaisedButton,
  Snackbar,
  FontIcon
} = require('material-ui');
var PostSort = require('./../../post/components/PostSort.jsx');
var PostContainer = require('./../../post/components/PostContainer.jsx');
var NewPostPanel = require('./../../post/components/NewPostPanel.jsx');
var BoardPanel = require('./../../board/components/BoardPanel.jsx');
var Footer = require('./../../app/components/Footer.jsx');
var NewBoardModal = require('./../../board/components/NewBoardModal.jsx');
var BevyInfoBar = require('./BevyInfoBar.jsx');

var _ = require('underscore');
var constants = require('./../../constants');
var router = require('./../../router');
var UserStore = require('./../../user/UserStore');
var BevyActions = require('./../../bevy/BevyActions');
var USER = constants.USER;

var BevyView = React.createClass({
  propTypes: {
    myBevies: React.PropTypes.array,
    activeBevy: React.PropTypes.object,
    allThreads: React.PropTypes.array,
    allBevies: React.PropTypes.array
  },

  getInitialState() {
    return {
      showNewBoardModal: false
    }
  },

  componentDidMount() {
    console.log('LOADING DATA');
    BevyActions.loadBevyView(router.bevy_slug);
  },

  onRequestJoin(ev) {
    ev.preventDefault();
    BevyActions.requestJoin(this.props.activeBevy, window.bootstrap.user);
    this.refs.snackbar.show();
  },

  _renderBoards() {
    var bevy = this.props.activeBevy;
    var boardList = [];
    var boards = this.props.boards;
    for(var key in boards) {
      var board = boards[key];
      boardList.push(
        <BoardPanel
          key={ 'boardpanel:' + board._id }
          board={ board }
          bevy={ bevy }
        />
      );
    }
    boardList.push(
      <div
        key='new-board-card'
        className='new-board-card'
        onClick={() => { this.setState({ showNewBoardModal: true }); }}
      >
        <div className='plus-icon'>
          <FontIcon
            className='material-icons'
            style={{color: 'rgba(0,0,0,.2)', fontSize: '40px'}}
          >
            add
          </FontIcon>
        </div>
        <div className='new-board-text'>
          Create a New Board
        </div>
        <Ink style={{width: '100%', height: '100%', top: 0, left: 0}}/>
      </div>
    );
    return boardList;
  },

  render() {
    var joined = false;
    var activeBevy = this.props.activeBevy;

    if(_.isEmpty(window.bootstrap.user) || this.props.activeBevy.name == null) {
      return <div/>;
    }

    if(!_.isEmpty(activeBevy)) {
      if(activeBevy.settings.privacy == 'Private') {
        if(_.find(window.bootstrap.user.bevies,
          function(bevyId) {
          return bevyId == this.props.activeBevy._id
        }.bind(this))) {
          joined = true;
        }
      } else {
        joined = true;
      }
    }

    if(!joined) {
      return (
        <div className='main-section private-container'>
          <div className='private panel'>
            <div className='private-img'/>
            <span className='private-text'>
              You must be invited by an&nbsp;admin to view this community
            </span>
            <RaisedButton
              label='request to join'
              onClick={ this.onRequestJoin }
              labelStyle={{
                color: '#FFF'
              }}
            />
          </div>
          <Snackbar
            message="Invitation Requested"
            autoHideDuration={ 5000 }
            ref='snackbar'
          />
        </div>
      );
    }

    return (
      <div className='main-section bevy-view'>
        <NewBoardModal
          show={ this.state.showNewBoardModal }
          onHide={() => { this.setState({ showNewBoardModal: false }) }}
          activeBevy={ this.props.activeBevy }
        />
        <div className='board-list'>
          <div className='bevy-view-title'>Boards</div>
          { this._renderBoards() }
          <div style={{height: 10}}/>
          <Footer />
        </div>
        <div className='bevy-view-body'>
          <div className='bevy-view-title'>Feed</div>
          <div>
            <PostContainer
              activeBevy={ this.props.activeBevy }
            />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BevyView;
