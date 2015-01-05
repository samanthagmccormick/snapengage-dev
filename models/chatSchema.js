var mongoose = require('mongoose');

var chatSchema = mongoose.Schema({
	id: String,
	url: String,
	type: String,
	requested_by: String,
	description: String,
	created_at: Number,
	page_url: String,
	referrer_url: String,
	entry_url: String,
	ip_address: String,
	user_agent: String,
	country: String,
	region: String,
	city: String,
	latitude: Number,
	longitude: Number,
	chat_waittime: Number,
	chat_duration: Number,
	survey_score: Number,
	language_code: String,
	transcript: [
		{
			id: String,
			date: Number,
			alias: String,
			message: String
		}
	]

});

module.exports = mongoose.model('testcollections', chatSchema);