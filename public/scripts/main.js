/* Client-side jQuery & Ajax requests */

var agentPictures = [
	'amypond.png',
	'arya.jpg',
	'goffrey.png',
	'hodor.png',
	'jonsnow.jpg',
	'khaleesi.png',
	'mattsmith.jpg',
	'nedstark.jpg'
];

////////////
// Objects//
////////////

var Agent = function(id, picture, alias, numberOfChats, waittime, chatDuration, chatScore, chatComments, avgWaittime, avgChatduration, avgChatscore) {
	this.id = id;
	this.picture = picture;
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

//////////////
// Functions//
//////////////

var searchByID = function(itemClicked, id, responseData) {
		// console.log('SEARCH BY ID is working');

		// console.log('responseData: ', responseData);
		// console.log('id: ', id);
		// Go thru the responseData and look for the ID of what you clicked. 
		for (var i = 0; i < responseData.length; i++) {
			if (id === responseData[i].id) {
				console.log('Found it: ', responseData[i]);

				var itemFound = responseData[i];
				
				// If the item has a transcript
				if (itemFound.type === "chat") {
					// Remove the innerTab's contents 
					itemClicked.closest('li').find('.innerTab').remove();

					for (var z = 0; z < itemFound.transcript.length; z++) {
						// If there is no alias (i.e. it's the customer) then print the 'requested_by' email address
						if (!itemFound.transcript[z].alias) {
							itemClicked.closest('li').append('<div class="row"><div class="innerTab"><p><span class="orange">' + itemFound.requested_by + ': </span>' + itemFound.transcript[z].message + '</p></div>');
						} else {
							itemClicked.closest('li').append('<div class="row"><div class="innerTab"><p><span class="blue">' + itemFound.transcript[z].alias + ' (' + itemFound.transcript[z].id + ')'  + ': </span>' + itemFound.transcript[z].message + '</p></div>');
						}
					} // end for loop
				// If the item DOESN'T have a transcript
				} else {

					console.log('this is the found item', itemFound);
					// Remove the innerTab's contents 
					itemClicked.closest('li').find('.innerTab').remove();

					// There is no chat transcript, so just list the MESSAGE
					itemClicked.closest('li').append('<div class="row"><div class="innerTab"><p><span class="bold">Requested By:</span> <a class="orange" href="mailto:' + itemFound.requested_by + '">' + itemFound.requested_by + '</a><br /><span class="bold">Page URL: </span><a class="orange" href="' + itemFound.page_url + '">' + itemFound.page_url + '</a><br /><span class="bold">Location: </span>' + itemFound.city + ', ' + itemFound.region + ', ' + itemFound.country + '</p><form class="col-lg-10 col-md-10 col-sm-10 col-xs-10"><div class = "form-group"><label>Write your message below: </label><textarea name = "email" class="form-control" rows="3"></textarea><button class="btn btn-primary">Send</button></form></div>');
				} // end if statement
			}
		}
};

var printChats = function(responseData, style) {
		// Loop through the chats and append to the page
		for (var i = 0; i < responseData.length; i++) {
			$('#body').append('<li class = "'+ style + '" id=' + responseData[i].id + '><i class= "fa fa-lg fa-sort-down carat closeCarat"></i><span class= "heading">' + responseData[i].description + '</span></li>');
		}
};

var printAgents = function(responseData) {
	// Loop through the array of agents and append to the page
	for (var i = 0; i < responseData.length; i++) {
		$('#body').append('<div data-toggle="modal" data-target="#myModal" id="' + responseData[i] + '" class="col-lg-3 col-md-3 col-sm-3 col-xs-12 innerTab agentBlock center"><img src="images/' + _.sample(agentPictures) + '" class="img-circle img img-responsive center"/><h5>' + responseData[i] + '</h5></div>');
	}
};

var average = function(total, quantity) {
	return (total / quantity);
};

///////////////////////////
// Event Handlers & Ajax //
///////////////////////////

$(function(){

	// console.log('This is a test of the jquery file!');


	$.get('/api', {}, function(responseData) {
		console.log('Snapengage GET data: ', responseData);
	});

	$.post('/api', {}, function(responseData) {
		console.log('Snapengage POST data: ', responseData);
	});

	$.ajax('http://jsonplaceholder.typicode.com/posts/1', {
		method: 'GET'}).then(function(data) {
		console.log(data);
	});

	// Nav bar
	$('.tab').on('click', function() {
		// Remove 'active' from all tabs
		$('.tab').removeClass('active');
		// Add 'active' to THIS tab
		$(this).addClass('active');
	});

	// "Welcome" tab
	$('#home').on('click', function() {
		$('#welcome').show();

		// Clear out the body
		$('#body').children().remove();
	});

	// Tab to load all chats
	$('#loadChats').on('click', function() {

		$('#welcome').hide();

		// Clear out the body
		$('#body').children().remove();

		$.get('/allChats', {}, function(responseData){
			console.log('get request works, getting chats data from the file');
			// Print the chats json data to the client's console
			console.log('responseData:', responseData);

			printChats(responseData, "chat");

			// On click of a list item, display all of the chat's info to the user
			$(document).on('click', '.closeCarat', function() {
				// console.log('Carat has been clicked!');

				$(this).addClass('openCarat').removeClass('closeCarat');

				// Get the ID of what you clicked
				var ID = $(this).closest('li').attr('id');
				// console.log('ID of what you clicked: ', ID);

				var carat = $(this);
				searchByID(carat, ID, responseData);
			}); // end closeCarat click handler

			$(document).on('click', '.openCarat', function(){
				$(this).closest('li').find('.innerTab').remove();
				$(this).removeClass('openCarat').addClass('closeCarat');
			});
		}); // end Ajax get request loadChats
	}); // end loadChats click handler

	// Tab to load all messages
	$('#loadMessages').on('click', function() {

		$('#welcome').hide();

		// Clear out the body
		$('#body').children().remove();

		$.get('/loadMessages', {}, function(responseData) {
			// console.log('get request for loadMessages works');
			// console.log('responseData: ', responseData);

			printChats(responseData, "message");

			// On click of a list item, display all of the chat's info to the user
			$(document).on('click', '.closeCarat', function() {
				// console.log('Carat has been clicked!');

				$(this).addClass('openCarat').removeClass('closeCarat');

				// Get the ID of what you clicked
				var ID = $(this).closest('li').attr('id');
				console.log('ID of what you clicked: ', ID);

				var carat = $(this);
				searchByID(carat, ID, responseData);
			}); // end closeCarat click handler

			$(document).on('click', '.openCarat', function(){
				$(this).closest('li').find('.innerTab').remove();
				$(this).removeClass('openCarat').addClass('closeCarat');
			});
		}); // end Ajax get loadMessages
	});  // end loadMessages click handler

	// Tab to load all agents
	$('#loadAgents').on('click', function() {

		$('#welcome').hide();

		// Clear out the body
		$('#body').children().remove();

		$.get('/loadAgents', {}, function(responseData) {
			console.log('The agents: ', responseData);

			// Get list of unique agent IDs
			var agentIDs = _.uniq(_.pluck(responseData, 'id'));

			printAgents(agentIDs);

			$(document).on('click', '.agentBlock', function() {
				console.log('you clicked the agent block');

				// Get the ID of the agent you clicked
				var agentID = $(this).attr('id');
				
				// Get the image and save
				var agentPicture = $(this).find('img').attr('src');
				console.log(agentPicture);

				var showAgent = new Agent("", "", 0, 0, 0, 0, 0, [], 0, 0, 0);

				for (var i = 0; i < responseData.length; i++) {
					if (agentID === responseData[i].id) {
						showAgent.id = responseData[i].id;
						showAgent.picture = agentPicture;
						showAgent.alias = responseData[i].alias;
						showAgent.numberOfChats += 1;
						showAgent.waittime += responseData[i].waittime;
						showAgent.chatDuration += responseData[i].chatDuration;
						// If there is a chat (survey) score
						if(responseData[i].chatScore) {
							showAgent.chatScore += responseData[i].chatScore;
						}
						// If there are chat comments
						if(responseData[i].chatComments) {
							showAgent.chatComments.push((responseData[i].chatComments));
						}
					}
				}

				// After looping thru all agents, get averages and store into the new Agent object
				showAgent.avgWaittime = average(showAgent.waittime, showAgent.numberOfChats);
				showAgent.avgChatduration = average(showAgent.chatDuration, showAgent.numberOfChats);
				showAgent.avgChatscore = average(showAgent.chatScore, showAgent.numberOfChats);

				console.log(showAgent);

				$('#picture').empty().append('<img class="img-responsive img-circle center" src=' + agentPicture + ' />');
				$('#title').empty().append(showAgent.alias + '<br />(' + showAgent.id + ')' );
				$('#numberOfChats').empty().append('has had <span class="aqua">' + showAgent.numberOfChats + '</span> chats');
				$('#avgWaittime').empty().append('has an average wait time of <span class="aqua">' + showAgent.avgWaittime + '</span> seconds');
				$('#avgChatduration').empty().append('has an average chat duration of <span class="aqua">' + showAgent.avgChatduration + '</span> seconds');
				if (showAgent.avgChatscore) {
					$('#avgChatscore').empty().append('has an average survey score of <span class="aqua">' + showAgent.avgChatscore + '</span>');
				}
				$('#chatComments').empty();
				if (showAgent.chatComments.length > 0) {
					$('#chatComments').empty().append('and received these survey comments:</h4><p class="aqua">"' + showAgent.chatComments + '"</p>');
				}
			});

		});

	});
	







});  // end jQuery wrapper