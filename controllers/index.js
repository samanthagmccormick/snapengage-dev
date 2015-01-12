// Require your chat data file
var Chat = require('../models/chatSchema.js');
var _ = require('underscore');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	allChats: function(req, res) {

		// Find only the CHATS and send those to the client
		Chat.find({type: "chat"}, function(err, results) {
			// console.log('these are the results from teh server: ', results);
			res.send(results);
		});

	},
	loadMessages: function(req, res) {

		// Find only the MESSAGES and send those to the client
		Chat.find({type: "offline"}, function(err, results) {
			// console.log('these are the results from teh server: ', results);
			res.send(results);
		});

	},
	loadAgents: function(req, res) {

		// Array to temporarily store the agents
		var agents = [];

		// Scroll through only the CHATS
		Chat.find({type: "chat"}, function(err, results) {

			// Scroll through the array of chat results
			for (var i = 0; i < results.length; i++) {
				// Scroll through the array of transcripts 
				for (var z = 0; z < results[z].transcript.length; z++) {
					// If there is an agent in the message
					if (results[i].transcript[z].id) {

						// Get info about the agent and about this particular chat
						var agentID = results[i].transcript[z].id;
						var agentAlias = results[i].transcript[z].alias;
						var agentWait = results[i].chat_waittime;
						var agentDuration = results[i].chat_duration;
						var agentScore = results[i].survey_score;
						var agentComments = results[i].survey_comments;

						console.log(agentComments);

						// Push to the array, "agents"
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
			// Send the agents over to the client
			res.send(agents);
		});
	},
	loadAllData: function(req, res) {
		// Scroll through and send along all chat data
		Chat.find({}, function(err, results) {
			res.send(results);
		});
	}

}; // end

module.exports = indexController;