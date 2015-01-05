// Require your chat data file
var chats = require('../models/sample-chat-data.json');
var Chat = require('../models/chatSchema.js');
var _ = require('underscore');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	// api: function(req, res) {
	// 	console.log('API data: ', req.body);
	// 	res.render('index');
	// },
	allChats: function(req, res) {

		// Just find the CHATS and send those to the client
		Chat.find({type: "chat"}, function(err, results) {
			// console.log('these are the results from teh server: ', results);
			res.send(results);
		});

	},
	loadMessages: function(req, res) {

		// Just find the MESSAGES and send those to the client
		Chat.find({type: "offline"}, function(err, results) {
			console.log('these are the results from teh server: ', results);
			res.send(results);
		});

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