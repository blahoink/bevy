/**
 * RightSidebar.jsx
 *
 * @author albert
 * @flow
 */

'use strict';

var React = require('react');

var BevyPanel = require('./../../bevy/components/BevyPanel.jsx');
var Footer = require('./Footer.jsx');

var RightSidebar = React.createClass({
  propTypes: {
    activeBevy: React.PropTypes.object
  },

  getInitialState() {
    return {};
  },

  render() {
    var bevy = this.props.activeBevy;
    var bevy_id = bevy._id;

    return (
      <div className='right-sidebar'>
        <BevyPanel
          activeBevy={ this.props.activeBevy }
          myBevies={ this.props.myBevies }
        />
        <Footer />
      </div>
    );
  }
});

module.exports = RightSidebar;
