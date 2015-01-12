
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

				// Remove the innerTab's contents and append two empty columns
				itemClicked.closest('li').find('.innerTab').empty().append('<div class="row"><div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 transcript"></div><div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 details"></div></div>');

				// Append the chat's details to the 'details' column
				itemClicked.closest('li').find('.details').append('<p><span class="bold">User: </span><a class="link" href="mailto:' + itemFound.requested_by + '">' + itemFound.requested_by + '</a><br /><span class="bold">IP: </span>' + itemFound.ip_address + '<br /><span class="bold">Location: </span>' + itemFound.city + ', ' + itemFound.region + ', ' + itemFound.country + '<br /><span class="bold">Chat Occured: </span><a class="link" href="' + itemFound.page_url + '">View Webpage</a><br /><span class="bold">Waittime: </span>' + itemFound.chat_waittime + ' seconds<br /><span class="bold">Duration: </span>' + itemFound.chat_duration + ' seconds</p><p><a class="link btn btn-md btn-primary" href="' + itemFound.url + '">View Case Webpage</a></p>');
				
				// If the item HAS a transcript
				if (itemFound.type === "chat") {

					for (var z = 0; z < itemFound.transcript.length; z++) {
						// If there is no alias (i.e. it's the customer) then print the 'requested_by' email address
						if (!itemFound.transcript[z].alias) {
							itemClicked.closest('li').find('.transcript').append('<span class="orange">' + itemFound.requested_by + ': </span>' + itemFound.transcript[z].message + '<br />');
						} else {
							itemClicked.closest('li').find('.transcript').append('<span class="blue">' + itemFound.transcript[z].alias + ' (' + itemFound.transcript[z].id + ')'  + ': </span>' + itemFound.transcript[z].message + '<br />');
						}
					} // end for loop

				// If the item DOESN'T have a transcript
				} else {

					console.log('this is the found item', itemFound);

					// There is no chat transcript, so just list the MESSAGE
					itemClicked.closest('li').find('.transcript').append('<form class="col-lg-11 col-md-11 col-sm-11 col-sm-8"><div class = "form-group"><label>Write your response below: </label><textarea placeholder="Future feature would be to hook this up to email" name = "email" class="form-control" rows="3"></textarea><p class="right margin-top"><button class="btn btn-success">Send</button></p></div></form>');
				} // end if statement
			}
		}
};

var printChats = function(responseData, style) {
		// Loop through the chats and append to the page
		for (var i = 0; i < responseData.length; i++) {
			$('#body').append('<li class = "'+ style + '" id=' + responseData[i].id + '><i class= "fa fa-lg fa-sort-down carat closeCarat"></i><span class= "heading">' + responseData[i].description + '</span><div class="innerTab"></div></li>');
		}
};

var printAgents = function(responseData) {

	// Loop through the array of agents and append to the page
	for (var i = 0; i < responseData.length; i++) {

		// Shorten the agent ID's to just the unique letters
		var agent = responseData[i];
		agent = agent.replace("@snapengage.com", "");
		agent = agent.replace("wc:", "");
		console.log(agent);

		$('#body').append('<div data-toggle="modal" data-target="#myModal" id="' + responseData[i] + '" class="col-lg-3 col-md-3 col-sm-3 col-xs-6 agentBlock center"><img src="images/' + agentPictures[i] + '" class="img-circle img img-responsive center"/><h4 class="blue">' + agent + '</h4></div>');
	}
};

var average = function(total, quantity) {
	return (total / quantity);
};

////////////////
// Agent Pics //
////////////////

var agentPictures = [
	'mattsmith.jpg',
	'amypond.png',
	'arya.jpg',
	'goffrey.png',
	'hodor.png',
	'jonsnow.jpg',
	'khaleesi.png',
	'nedstark.jpg'
];

///////////////////////////
// Event Handlers & Ajax //
///////////////////////////

$(function(){

	// console.log('This is a test of the jquery file!');

	// Nav bar
	$('.tab').on('click', function() {
		// Remove 'active' from all tabs
		$('.tab').removeClass('active');
		// Add 'active' to THIS tab
		$(this).addClass('active');
	});

	// "Welcome/Home" tab
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

				// Search by ID and then print the chat
				searchByID(carat, ID, responseData);
			}); // end closeCarat click handler

			$(document).on('click', '.openCarat', function(){
				$(this).closest('li').find('.innerTab').empty();
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
				$(this).closest('li').find('.innerTab').empty();
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
			// console.log('The agents: ', responseData);

			// Get list of unique agent IDs
			var agentIDs = _.uniq(_.pluck(responseData, 'id'));

			printAgents(agentIDs);

			$(document).on('click', '.agentBlock', function() {
				// console.log('you clicked the agent block');

				// Get the ID of the agent you clicked
				var agentID = $(this).attr('id');
				
				// Get the image and save
				var agentPicture = $(this).find('img').attr('src');
				// console.log(agentPicture);

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
							// showAgent.chatComments.push(responseData[i].chatComments);
							showAgent.chatComments = responseData[i].chatComments;
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