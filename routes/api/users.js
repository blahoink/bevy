'use strict';

// TODO: AUTH

// load api functions
var api = require('./../../api');

module.exports = function(router) {

	// GET FROM GOOGLE ID (mobile)
	router.get('/users/google/:id', api.users.getGoogle);
	// INDEX
	router.get('/users', api.users.index);
	// CREATE
	router.post('/users', api.users.create);
	// SHOW
	router.get('/users/:id', api.users.show);
	// SEARCH
	router.get('/users/search', api.users.search);
	router.get('/users/search/:query', api.users.search);
	// UPDATE
	router.put('/users/:id', api.users.update);
	router.patch('/users/:id', api.users.update);

	router.patch('/users/:userid/addbevy/:bevyid', api.users.addBevy);

	// DESTROY
	router.delete('/users/:id', api.users.destroy);

	// GET LINKED ACCOUNTS
	router.get('/users/:id/linkedaccounts', api.users.getLinkedAccounts);
	// ADD LINKED ACCOUNT
	router.post('/users/:id/linkedaccounts', api.users.addLinkedAccount);
	// REMOVE LINKED ACCOUNT
	router.delete('/users/:id/linkedaccounts/:accountid', api.users.removeLinkedAccount);

	// VERIFY USERNAME
	router.get('/users/:username/verify', api.users.verifyUsername);

	// DEVICES
	router.get('/users/:id/devices', api.users.getDevices);
	router.post('/users/:id/devices', api.users.addDevice);
	router.put('/users/:id/devices/:deviceid', api.users.updateDevice);
	router.patch('/users/:id/devices/:deviceid', api.users.updateDevice);
	router.delete('/users/:id/device/:deviceid', api.users.removeDevice);
	
};
