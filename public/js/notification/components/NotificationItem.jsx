/**
 * NotificationItem.jsx
 *
 * @author KEVIN
 * @author albert
 */

var React = require('react');
var $ = require('jquery');

var rbs = require('react-bootstrap');
var ButtonGroup = rbs.ButtonGroup;
var Button = rbs.Button;
var Panel = rbs.Panel;

var NotificationActions = require('./../NotificationActions');

var NotificationItem = React.createClass({

	propTypes: {
		  id: React.PropTypes.string
		, event: React.PropTypes.string
		, data: React.PropTypes.object
	},

	dismiss: function(ev) {
		ev.preventDefault();
		NotificationActions.dismiss(this.props.id);
	},

	render: function() {

		var event = this.props.event;
		var data = this.props.data;
		var defaultNotificationImage = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

		var body;

		switch(event) {
			case 'invite':
				var bevy = data.bevy;
				var from_alias = data.from_alias;

				body = <div>
						 	Invite to { bevy.name } from { from_alias.name }
						 </div>

				break;
		}

		return <Panel className="notification-item">
					<div className='row'>
						<div className='col-xs-8'>
							{ this.props.id }
						</div>
						<div className='col-xs-4'>
							<Button
								onClick={ this.dismiss }>
								Dismiss
							</Button>
						</div>
					</div>
					<div className='notification-body'>
				 		{ body }
				 	</div>
				 </Panel>
	}
});
module.exports = NotificationItem;