/**
 * ForgotPage.jsx
 *
 * @author albert
 */

var React = require('react');
var $ = require('jquery');
var _ = require('underscore');
var constants = require('./../../constants');

var rbs = require('react-bootstrap');
var Input = rbs.Input;

var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

// helper function to validate whether an email is valid
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var ForgotPage = React.createClass({

	getInitialState: function() {
		return {
			  emailBsStyle: ''
			, statusText: ''
		};
	},

	submit: function(ev) {
		ev.preventDefault();

		var email = this.refs.email.getValue();

		if(_.isEmpty(email)) {
			this.setState({
				statusText: 'Invalid Email'
			});
			return;
		}

		$.post(
			constants.siteurl + '/forgot',
			{
				email: email
			},
			function(data) {
				console.log(data);
			}
		).fail(function(jqXHR) {

		}.bind(this));
	},

	onChange: function() {
		var $email = $(this.refs.email.getDOMNode());

		var emailVal = $email.find('input').val();

		if(!validateEmail(emailVal)) {
			this.setState({
				emailBsStyle: 'error'
			});
		} else {
			this.setState({
				emailBsStyle: 'success'
			});
		}
	},

	render: function() {

		var statusText;
		if(!_.isEmpty(this.state.statusText)) {
			statusText =	<div>
									<span>{ this.state.statusText }</span>
								</div>
		}

		return	<div>
						{ statusText }
						<form method='post' action='/forgot'>
							<Input
								type='text'
								name='email'
								ref='email'
								placeholder='Email'
								hasFeedback
								bsStyle={ this.state.emailBsStyle }
								onChange={ this.onChange }/>
							<RaisedButton
								label='Forgot Password'
								onClick={ this.submit } />
						</form>
					</div>
	}
});
module.exports = ForgotPage;
