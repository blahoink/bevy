'use strict';

var React = require('react');
var Input = require('react-bootstrap').Input;

var rbs = require('react-bootstrap')
var NavItem = rbs.NavItem;

var mui = require('material-ui');
var IconButton = mui.IconButton;
var TextField = mui.TextField;
var LeftNav = mui.LeftNav;

var menuItems = [{ route: 'get-started', text: 'Get Started' },
					{ route: 'css-framework', text: 'CSS Framework' },
  					{ route: 'components', text: 'Components' },];

var Navbar = React.createClass({

	toggle: function() {
		console.log('toggling nav');
		this.refs.leftNav.toggle();
	},

	_onLeftNavChange: function(e, key, payload) {
		//this.refs.leftNav.toggle();
	},

	render: function() {

		var header = <div className='logo'>bevy</div>;

		return	<div className="navbar navbar-fixed-top">
						<LeftNav docked={false} isInitiallyOpen={ false } ref="leftNav"
						menuItems={menuItems} onChange={ this._onLeftNavChange } header={ header }/>
						<div className="navbar-header pull-left">
							<a className="navbar-brand" href="#">
								<IconButton iconClassName="glyphicon glyphicon-menu-hamburger" onTouchTap={ this.toggle }/>
							</a>
						</div>
						<text className="navbar-brand navbar-brand-text">Bevy</text>
						<div className="navbar-header pull-right" id="bs-example-navbar-collapse-1">
							<form className="navbar-form navbar-right" role="search">
								<div className="form-group">
									<TextField type="text" className="search-input" placeholder="  "/>
								</div>
								<IconButton iconClassName="glyphicon glyphicon-search" href="#"/>
							</form>
						</div>
					</div>;
	}

});

module.exports = Navbar;
