/**
 * FilterSidebar.jsx
 * formerly money.jsx
 *
 * @author kevin
 */

'use strict';

var React = require('react');
var _ = require('underscore');

var router = require('./../../router');
var BevyActions = require('./../../bevy/BevyActions');
var BevyStore = require('./../../bevy/BevyStore');
var constants = require('./../../constants');
var Footer = require('./Footer.jsx');

var rbs = require('react-bootstrap');
var Badge = rbs.Badge;
var ButtonGroup = rbs.ButtonGroup;
var MenuItem = rbs.MenuItem;
var Accordion = rbs.Accordion;
var Panel = rbs.Panel;
var Button = rbs.Button;
var Input = rbs.Input;
var ModalTrigger = rbs.ModalTrigger;
var TabbedArea = rbs.TabbedArea;
var TabPane = rbs.TabPane;

var mui = require('material-ui');
var DropDownMenu = mui.DropDownMenu;
var IconButton = mui.IconButton;
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;
var FontIcon = mui.FontIcon;
var Tabs = mui.Tabs;
var Tab = mui.Tab;

var CreateNewBevy = require('./../../bevy/components/CreateNewBevy.jsx');

var FilterSidebar = React.createClass({
	propTypes: {
		searchQuery: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			filter: 'top'
		};
	},

	/*componentWillMount: function() {
		if(_.isEmpty(BevyStore.getMyBevies()) && this.state.collection == 'my') {
			BevyActions.changeCollection('all');
			this.setState({
				collection: 'all'
			});
		}
	},*/

	onSearch: function(ev) {
		ev.preventDefault();

		var query = this.refs.search.getValue();

		router.navigate('s/' + query, { trigger: true });
	},

	onKeyUp: function(ev) {
		if(ev.which == 13) {
			// trigger search
			this.onSearch(ev);
		}
	},

	/*onCollectionChange: function(ev) {
		ev.preventDefault();

		var collection = ev.target.textContent.split(' ');

		if(collection[0] == 'my' || collection[0] == 'all') {
			this.setState({
				collection: collection[0]
			});
			BevyActions.changeCollection(collection[0]);
		} else {
			console.log('invalid collection');
		}
	},*/

	handleFilter: function(filter) {
		var selectedIndex = 0;
		switch(filter) {
			case 'top':
				selectedIndex = 0;
				break;
			case 'bottom':
				selectedIndex = 1;
				break;
			case 'new':
				selectedIndex = 2;
				break;
			case 'old':
				selectedIndex = 3;
				break;
		};

		this.setState({
			selectedIndex: selectedIndex
		});

		BevyActions.filterBevies(filter);
	},

	onFilterChange: function(ev, selectedIndex, menuItem) {
		ev.preventDefault();
		var filter = ev.target.textContent;
		this.handleFilter(filter);
	},

	render: function() {
		var searchQuery = (this.props.searchQuery) ? this.props.searchQuery : '';
		var selectedIndex = this.state.selectedIndex;

		var myClass = (this.state.collection == 'my') ? 'active' : '';
		var allClass = (this.state.collection == 'all') ? 'active' : '';

		var filterItems = [
			{payload: '0', text: 'top'},
			{payload: '1', text: 'bottom'},
			{payload: '2', text: 'new'},
			{payload: '3', text: 'old'}
		];

		var searchTitle = (searchQuery == 'a8d27dc165db909fcd24560d62760868' || _.isEmpty(searchQuery))
		? 'all public bevies'
		: 'searching for ' + searchQuery;

		var bevyContent = (
				<div className='actions'>
					<h4 className='search-title'>
						{searchTitle}
					</h4>
					<div className='action sort'>
						<div className='action-name'>
							filter by
						</div> 
						<DropDownMenu 
							menuItems={filterItems}
							selectedIndex={selectedIndex}
							onChange={this.onFilterChange}
						/>
					</div>
					<div className='action new'>
							<ModalTrigger modal={
								<CreateNewBevy	/>
							}>
								<RaisedButton 
									disabled={_.isEmpty(window.bootstrap.user)} 
									label='new bevy' 
									className='public-bevy-panel panel'
								>
									<FontIcon className="glyphicon glyphicon-plus"/>
								</RaisedButton>
							</ModalTrigger>
					</div>
				</div>
			);
		return (
			<div>
				<div className="bevy-panel panel filter-sidebar">
					{bevyContent}
				</div>
				<Footer />
			</div>
		);
	}
});
module.exports = FilterSidebar;
