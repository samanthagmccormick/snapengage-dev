// Require your chat data file
var chats = require('../models/sample-chat-data.json');
var _ = require('underscore');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	api: function(req, res) {
		var data = [];

		
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
					// If there is an agent in the message
					if (chats[i].transcript[z].id) {

						// Get info about the agent and about this particular chat
						var agentID = chats[i].transcript[z].id;
						var agentAlias = chats[i].transcript[z].alias;
						var agentWait = chats[i].chat_waittime;
						var agentDuration = chats[i].chat_duration;
						var agentScore = chats[i].survey_score;
						var agentComments = chats[i].survey_comments;

						// Push to the array
						agents.push({
									id: agentID,
									alias: agentAlias,
									waittime: agentWait,
									chatDuration: agentDuration,
									chatScore: agentScore,
									chatComments: agentComments
								});
						break;
					}
				}
			}
		}

		// Send the found agents to the client so that you can manipulate the data
		res.send(agents);
	}

}; // end

module.exports = indexController;