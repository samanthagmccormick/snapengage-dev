// Require your chat data file
var chats = require('../models/sample-chat-data.json');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	allChats: function(req, res) {
		// Test to see if the json file sends the chats data to your terminal
		// console.log(chats);

		// Send the chats json data to the client
		// res.send(chats);

		var data = [];

		console.log(chats[0]);

		for (var i = 0; i < chats.length; i++){
			// Only want to send the chats that have transcripts.
			if (chats[i].transcript) {
				data.push(chats[i]);
			}
		};

		res.send(data);
	}

};

module.exports = indexController;