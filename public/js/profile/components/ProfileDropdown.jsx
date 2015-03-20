/**
 * ProfileDropdown.jsx
 *
 * @author albert
 */

'use strict';

var React = require('react');
var _ = require('underscore');

var rbs = require('react-bootstrap');
var OverlayTrigger = rbs.OverlayTrigger;
var ModalTrigger = rbs.ModalTrigger;
var Button = rbs.Button;
var Popover = rbs.Popover;
var ButtonGroup = rbs.ButtonGroup;

var mui = require('material-ui');
var FlatButton = mui.FlatButton;

var AliasList = require('./../../alias/components/AliasList.jsx');
var AddAliasModal = require('./../../alias/components/AddAliasModal.jsx');

var user = window.bootstrap.user;
var email = user.email;

var ProfileDropdown = React.createClass({

	propTypes: {
		  allAliases: React.PropTypes.array
		, activeAlias: React.PropTypes.object
	},

	render: function() {

		var defaultProfileImage = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';
		var profileImage = (_.isEmpty(user.google.photos))
		 ? defaultProfileImage
		 : user.google.photos[0].value;

		var defaultName = 'Default Name';
		var name = user.google.displayName || defaultName;

		var buttonStyle = {
			backgroundImage: 'url(' + profileImage + ')'
		};

		return	<OverlayTrigger trigger="click" placement="bottom" overlay={
						<Popover>

							<div className="row profile-top">
								<div className="col-xs-3 profile-picture">
									<img src={ profileImage }/>
								</div>
								<div className="col-xs-9 profile-details">
									<span className='profile-name'>{ name }</span>
									<span className='profile-email'>{ email }</span>
									<span className='profile-points'>123 points</span>
								</div>
							</div>
							<div className='row profile-links'>
								<ButtonGroup className="col-xs-12" role="group">
									<Button type='button' className="profile-link">
										Saved Posts
									</Button>
									•
									<Button type='button' className="profile-link">
										Contacts
									</Button>
									•
									<Button type='button' className="profile-link">
										Settings
									</Button>
								</ButtonGroup>
							</div>

							<hr />
							<AliasList
								allAliases={ this.props.allAliases }
								activeAlias={ this.props.activeAlias } />
							<hr />

							<div className="profile-buttons">
								<div className="profile-btn-left add-alias-modal-container">
									<ModalTrigger modal={ <AddAliasModal /> }>
										<FlatButton label="Add Alias"/>
									</ModalTrigger>
								</div>
								<div className="profile-btn-right">
									<FlatButton
										label="Logout"
										linkButton={ true }
										href='/logout' />
								</div>
							</div>
						</Popover>}>
					<Button className="profile-btn" style={ buttonStyle } />
				</OverlayTrigger>;
	}
});
module.exports = ProfileDropdown;
