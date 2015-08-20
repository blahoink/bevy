/**
 * NewThreadPanel.jsx
 * @author albert
 */

'use strict';

var React = require('react');
var _ = require('underscore');
var {
  Input,
  Button
} = require('react-bootstrap');

var UserSearchOverlay = require('./UserSearchOverlay.jsx');

var ChatActions = require('./../ChatActions');

var NewThreadPanel = React.createClass({

  getInitialState() {
    return {
      inputValue: '',
      addedUsers: [],
      message: ''
    };
  },

  componentDidMount() {
    this.container = React.findDOMNode(this.refs.Container);
  },

  close() {
    // close the panel
    ChatActions.closePanel('-1');
    // remove it from the threads list
    ChatActions.cancelNewMessage();
  },

  onChange(ev) {
    var value = this.refs.input.getValue();
    this.setState({
      inputValue: value
    });
  },

  addUser(user) {
    //console.log('adding', user.displayName);
    var users = _.map(this.state.addedUsers, function($user) {
      return $user;
    });
    _.uniq(users); // remove duplicates
    users.push(user);
    this.setState({
      addedUsers: users,
      inputValue: ''
    });
  },

  removeUser(ev) {
    ev.preventDefault();
    var id = ev.target.getAttribute('id');
    var users = _.reject(this.state.addedUsers, function($user) {
      return $user._id == id;
    });
    this.setState({
      addedUsers: users
    });
  },

  onMessageKeyPress(ev) {
    if(ev.which == 13) {
      // enter button was pressed
      if(_.isEmpty(this.state.message)) return; // dont send empty message

      // create message and thread
      ChatActions.createThreadAndMessage(
        this.state.addedUsers, // users to add
        this.state.message // message body text
      );
    }
  },

  onMessageChange(ev) {
    var message = this.refs.MessageInput.getValue();
    this.setState({
      message: message
    });
  },

  _renderAddedUsers() {
    var itemArray = [];
    for(var key in this.state.addedUsers) {
      var addedUser = this.state.addedUsers[key];
      itemArray.push(
        <div className='added-user' key={ 'newthreadpanel:addeduser:' + addedUser._id }>
          <span className='display-name'>{ addedUser.displayName }</span>
          <Button id={ addedUser._id } className='remove-btn' onClick={ this.removeUser }>
            <span id={ addedUser._id } className='glyphicon glyphicon-remove'></span>
          </Button>
        </div>
      );
    }
    return itemArray;
  },

  _renderInput() {
    if(this.state.addedUsers.length <= 0) return <div />;
    return (
      <div className='message-input-container'>
        <Input
          type='text'
          ref='MessageInput'
          placeholder='Chat'
          onKeyPress={ this.onMessageKeyPress }
          onChange={ this.onMessageChange }
          value={ this.state.message }
          groupClassName='message-input'
        />
      </div>
    );
  },

  render() {
    return (
      <div ref='Container' className='new-thread-panel'>
        <div className='header'>
          <a href='#' className='title' title='Close' onClick={ this.close }>
            New Message
          </a>
          <div className='actions'>
            {/*<span className={ 'glyphicon ' + expandGlyph + ' btn' } title={ expandTitle } onClick={ this.handleToggle }></span>*/}
            <span className="glyphicon glyphicon-remove btn" title='Close' onClick={ this.close }></span>
          </div>
        </div>
        <div className='participants'>
          <span className='to-text'>To:</span>
          { this._renderAddedUsers() }
          <Input 
            type='text'
            ref='input'
            value={ this.state.inputValue }
            onChange={ this.onChange }
            groupClassName='participant-input'
          />
        </div>
        <UserSearchOverlay
          container={ this.container }
          target={() => React.findDOMNode(this.refs.input)}
          query={ this.state.inputValue }
          addUser={ this.addUser }
          addedUsers={ this.state.addedUsers }
        />
        { this._renderInput() }
      </div>
    );
  }
});

module.exports = NewThreadPanel;