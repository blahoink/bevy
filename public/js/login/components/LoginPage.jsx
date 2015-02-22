'use strict';

var React = require('react');

var LoginPanel = require('./LoginPanel.jsx')

var rbs = require('react-bootstrap');
var Panel = rbs.Panel;
var Input = rbs.Input;
var Button = rbs.Button;

var LoginPage = React.createClass({
	render: function() {
		return	<div className="login-container">
					<div className="login-header row">
						<img src="../../../img/logo_100.png" height="60" width="60"/>
					</div>
					<div className="login-title row">
						<h1>Join the Fun ;)</h1>
						<h2>Sign in to continue to Bevy.</h2> 
					</div>
					<LoginPanel />
					<a href="/#/register">
						Create an account
					</a>
				</div>
	}
});

module.exports = LoginPage;