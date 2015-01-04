var Agent = function(alias, numberOfChats, waittime, chatDuration, chatScore, chatComments, avgWaittime, avgChatduration, avgChatscore) {
	this.alias = alias;
	this.numberOfChats = numberOfChats;
	this.waittime = waittime;
	this.chatDuration = chatDuration;
	this.chatScore = chatScore;
	this.chatComments = chatComments;
	this.avgWaittime = avgWaittime;
	this.avgChatduration = avgChatduration;
	this.avgChatscore = avgChatscore;
};