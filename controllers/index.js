// Require your chat data file
var chats = require('../models/sample-chat-data.json');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	allChats: function(req, res) {
		// Test to see if the json file sends the chats data to your terminal
		console.log(chats);

		// Send the chats json data to the client
		res.send(chats);
	},
	
};

module.exports = indexController;