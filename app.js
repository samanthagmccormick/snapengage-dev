var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');
var _ = require('underscore');

var chats = require('./models/sample-chat-data.json');
var Agent = require('./models/agentObject.js');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);
// Tab to view all chats (by description)
app.get('/allChats', indexController.allChats);
// Tab to view only open messages (i.e. chats with no transcript)
app.get('/loadMessages', indexController.loadMessages);
// Tab to view agent data
app.get('/loadAgents', indexController.loadAgents);

var server = app.listen(8080, function() {
	console.log('Express server listening on port ' + server.address().port);
});
