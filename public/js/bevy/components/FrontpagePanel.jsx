'use strict';

var React = require('react');
var _ = require('underscore');

var FrontpagePanel = React.createClass({
	render: function() {

		var bevyImage = '/img/logo_100.png';
		var name = 'Frontpage';
		var description = 'Welcome to Bevy!';

		return (<div className='right-sidebar panel'>
					<div className="row sidebar-top">
						<div className="col-xs-3 sidebar-picture">
							<img src={ bevyImage } />
						</div>
						<div className="col-xs-9 sidebar-title">
							<span
								className='sidebar-title-name'>
								{ name }
							</span>
							<span
								className='sidebar-title-description'>
								{ description }
							</span>
						</div>
					</div>
				</div>);
	}
});

module.exports = FrontpagePanel;
