/**
 * NewPostPanel.jsx
 *
 * The dialog for creating a post
 *
 * @author kevin
 */

'use strict';

// imports
var React = require('react');

var rbs = require('react-bootstrap');
var CollapsableMixin = rbs.CollapsableMixin;
var Tooltip = rbs.Tooltip;
var Input = rbs.Input;
var Panel = rbs.Panel;

var mui = require('material-ui');
var IconButton = mui.IconButton;
var FlatButton = mui.FlatButton;
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var DropDownMenu = mui.DropDownMenu;
var FloatingActionButton = mui.FloatingActionButton;

var PostActions = require('./../PostActions');

// React class
var NewPostPanel = React.createClass({

	mixins: [CollapsableMixin],

	propTypes: {
		activeBevy: React.PropTypes.object.isRequired,
		allBevies: React.PropTypes.array.isRequired,
		activeAlias: React.PropTypes.object.isRequired
	},

	// start with an empty title
	// TODO: when the dialog is expanded, add the default options here
	getInitialState: function() {
		return {
			title: '',
			body: ''
		};
	},

	getCollapsableDOMNode: function(){
		return this.refs.collapse.getDOMNode();
	},

	getCollapsableDimensionValue: function(){
		return this.refs.collapse.getDOMNode().scrollHeight;
	},

	open: function() {
		this.setState({
			expanded: true
		});
	},

	close: function() {
		this.setState({
			expanded: false
		});
	},


	// trigger the create action
	// TODO: pass in the rest of the state attributes needed
	submit: function() {
		PostActions.create(
			this.state.title, // title
			this.state.body, // body
			null, // image_url
			this.props.activeAlias.toJSON(), // author
			this.props.activeBevy.toJSON()); // bevy
	},

	// used to trigger the create action (enter key)
	// later, we can use this to listen for ctrl+v and other media shortcuts
	onKeyUp: function(ev) {
		//if the user hits enter, submit a new post
		if(ev.which === 13) {
			this.submit();
			// empty the current title attribute
			// in case the user wants to enter another right quick
			this.setState({
				title: ''
			});
		}
	},

	// triggered every time a key is pressed
	// updates the state
	handleChange: function() {
		this.setState({
			title: this.refs.title.getValue(),
			body: this.refs.body.getValue()
		});
	},

	render: function() {

		// load bevies
		var bevies = [];
		var allBevies = this.props.allBevies;
		for(var key in allBevies) {
			var bevy = allBevies[key];
			bevies.push({
				payload: key,
				text: bevy.name
			});
		}
		if(bevies.length < 1) {
			bevies.push({
				payload: '1',
				text: ''
			});
		}

		var styles = this.getCollapsableClassSet();
		var classSet = React.addons.classSet;
		//console.log(styles);

		return <Panel className="panel new-post-panel" postId={ this.state.id }>

					<div className="row new-post-title">
						<TextField
							className="title-field"
							hintText="Title"
							ref='title'
							onChange={ this.handleChange }
							onFocus={ this.open }
						/>
					</div>

					<div ref='collapse' className={ classSet(styles) }>
						<div className="row media">
							<div className="media-content">
									<FloatingActionButton
										className="attach-btn"
										iconClassName="glyphicon glyphicon-paperclip"
										tooltip="attach media"
										mini={true}
									/>
							</div>
						</div>

						<Input
							className="post-body-text"
							type="textarea"
							placeholder="Body"
							ref='body'
							onChange={ this.handleChange }
						/>

						<div className="panel-bottom">
							<div className="panel-controls-right">
								<FlatButton
									label='cancel'
									onClick={ this.close }
								/>
								<RaisedButton label="submit" onClick={this.submit} />
							</div>
							<div className="panel-controls-left">
								<DropDownMenu className="bevies-dropdown" menuItems={bevies} />
							</div>
						</div>
					</div>

				</Panel>
			}
		});

module.exports = NewPostPanel;
