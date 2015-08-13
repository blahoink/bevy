/**
 * ChatDropdown.jsx
 *
 * @author KEVIN
 */

'use strict';

var React = require('react');
var _ = require('underscore');
var $ = require('jquery');

var rbs = require('react-bootstrap');
var OverlayTrigger = rbs.OverlayTrigger;
var ModalTrigger = rbs.ModalTrigger;
var Button = rbs.Button;
var Popover = rbs.Popover;
var ButtonGroup = rbs.ButtonGroup;
var Tooltip = rbs.Tooltip;
var OverlayMixin = rbs.OverlayMixin;

var ChatActions = require('./../ChatActions');
var ChatStore = require('./../ChatStore');
var UserActions = require('./../../profile/UserActions');
var UserStore = require('./../../profile/UserStore');

var mui = require('material-ui');
var FlatButton = mui.FlatButton;
var IconButton = mui.IconButton;
var TextField = mui.TextField;

var SubBevyPanel = require('./../../bevy/components/SubBevyPanel.jsx');
var ConversationList = require('./../../chat/components/ConversationList.jsx');

var user = window.bootstrap.user;
var email = user.email;

var ChatSidebar = React.createClass({

	propTypes: {
		allContacts: React.PropTypes.array,
		allThreads: React.PropTypes.array,
		activeThread: React.PropTypes.object,
		userSearchResults: React.PropTypes.array,
		userSearchQuery: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			isOverlayOpen: false,
		};
	},

  	handleToggle: function(ev) {
  		ev.preventDefault();
  		this.setState({
  			isOverlayOpen: !this.state.isOverlayOpen
  		});
  	},

	openThread: function(ev) {
		ev.preventDefault();

		var thread_id = ev.target.getAttribute('id');

		ChatActions.openThread(thread_id);
	},

	openUserThread: function(ev) {
		ev.preventDefault();

		var thread_id = ev.target.getAttribute('id');

		ChatActions.openThread(null, thread_id);
	},

	openSearchResults: function() {
		document.getElementById("search-results").style.height = "300px";
	},

	closeSearchResults: function() {
		document.getElementById("search-results").style.height = "0px";
	},

	onChange: function(ev) {
		ev.preventDefault();
	    UserActions.search(this.refs.userSearch.getValue());
  	},

	render: function() {

		var threads = [];
		var allThreads = (_.isEmpty(this.props.allThreads)) ? [] : this.props.allThreads;
		for(var key in allThreads) {
			var thread = allThreads[key];
			var bevy = thread.bevy;

			var latestMessage = ChatStore.getLatestMessage(thread._id);
			var message = '';
			if(!_.isEmpty(latestMessage)) {

				if(bevy) {

					var messageAuthor = latestMessage.author.displayName;
					if(latestMessage.author._id == user._id) messageAuthor = 'Me';

					message = (
						<span className='latest-message'>
							{ messageAuthor + ': ' + latestMessage.body }
						</span>
					);
				} else {

					var messageAuthor = latestMessage.author.displayName;
					if(latestMessage.author._id == user._id) messageAuthor = 'Me';

					message = (
						<span className='latest-message'>
							{ messageAuthor + ': ' + latestMessage.body }
						</span>
					);
				}
			}

			var image_url = (bevy) ? bevy.image_url : '';
			if(_.isEmpty(image_url)) {
				if(bevy) image_url = '/img/logo_100.png';
				else image_url = '/img/user-profile-icon.png';
			}
			var imageStyle = {
				backgroundImage: 'url(' + image_url + ')',
				backgroundSize: 'auto 100%',
				backgroundPosition: 'center'
			};

			threads.push(
				<Button className='conversation-item' key={ 'thread' + thread._id } id={ thread._id } onFocus={ this.openThread }>
					<div className='image' style={imageStyle}/>
					<div className='conversation-details'>
						<span className='bevy-name'>{ name }</span>
						{ message }
					</div>
				</Button>
			);
		}

		if(threads.length <= 0) {
			console.log('no threads');
			return <div/>;
		};
		var searchResults = [];
		var userSearchResults = this.props.userSearchResults;
		for(var key in userSearchResults) {

			var user = userSearchResults[key];

			var image_url = (_.isEmpty(user.image_url)) ? '/img/user-profile-icon.png' : user.image_url;

			var name = user.displayName;

			var imageStyle = {
				backgroundImage: 'url(' + image_url + ')',
				backgroundSize: 'auto 100%',
				backgroundPosition: 'center'
			};

			searchResults.push(<Button className='conversation-item' key={ 'thread' + user._id } id={ user._id } onFocus={ this.openUserThread }>
					<div className='image' style={imageStyle}/>
					<div className='conversation-details'>
						<span className='bevy-name'>{ name }</span>
					</div>
			</Button>);
		}

		if(_.isEmpty(searchResults) && !_.isEmpty(this.props.userSearchQuery)) {
			searchResults = <div>
				<h3>
					no results :(
				</h3>
			</div>
		}

		if(this.props.userSearchQuery == 'a8d27dc165db909fcd24560d62760868') {
			searchResults = <section className="loaders"><span className="loader loader-quart"> </span></section>
		}

		console.log(this.props.userSearchResults);
		console.log(this.props.userSearchQuery);

		return (
			<div className='chat-sidebar'>
				<div className='conversation-list'>
					<div className='title'>
					</div>
					{ threads }
				</div>
				<div className='search-results' id='search-results'>
					<div className='content' >
						<div className='top'>
						</div>
						<div className='results-list'>
							{ searchResults }
						</div>
					</div>
					<div className='topline-wrapper'>
						<div className='topline'/>
					</div>
				</div>
				<div className='chat-actions'>
					<span className='glyphicon glyphicon-search' />
					<TextField 
					onFocus={this.openSearchResults} 
					onBlur={this.closeSearchResults}
					type='text'
		            className='search-input'
		            ref='userSearch'
		            onChange={ this.onChange }
		            defaultValue={ this.props.searchQuery }/>
				</div>
			</div>
		);
	}
});
module.exports = ChatSidebar;