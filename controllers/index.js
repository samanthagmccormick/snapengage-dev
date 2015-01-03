// Require your chat data file
var chats = require('../models/sample-chat-data.json');
var _ = require('underscore');

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
		}

		res.send(data);
	},
	loadMessages: function(req, res) {
		var data = [];

		for (var i = 0; i < chats.length; i++){
			// Only want to send the transcript-less chats (i.e. open messages)
			if (!chats[i].transcript) {
				data.push(chats[i]);
			}
		}
		res.send(data);
	},
	loadAgents: function(req, res) {
		var agents = [];

		for (var i = 0; i < chats.length; i++) {
			// If chat has a transcript then you can get the agent's name
			if (chats[i].transcript) {
				console.log('there is a transcript');
				for (var z = 0; z < chats[i].transcript.length; z++) {
					// If there is an alias
					if (chats[i].transcript[z].alias) {
						console.log('there is an alias');
						var agentAlias = chats[i].transcript[z].alias;
						agents.push(agentAlias);
					}
				}
			}
		}
		var uniqueAgents = _.uniq(agents);

		// Send the found agents to the client
		res.send(uniqueAgents);
	}

}; // end

module.exports = indexController;