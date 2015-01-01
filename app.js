var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

var chats = require('./models/sample-chat-data.json');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);
// Tab to view all chats (by description)
app.get('/allChats', indexController.allChats);

var server = app.listen(7566, function() {
	console.log('Express server listening on port ' + server.address().port);
});
