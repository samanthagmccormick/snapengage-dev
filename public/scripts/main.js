/* Client-side jQuery & Ajax requests */


////////////
// Objects//
////////////

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
				// console.log('Found it: ', responseData[i]);

				var itemFound = responseData[i];
				
				// If the item has a transcript
				if (itemFound.transcript) {
					// Remove the innerTab's contents 
					itemClicked.closest('li').find('.innerTab').remove();

					for (var z = 0; z < itemFound.transcript.length; z++) {
						// If there is no alias (i.e. it's the customer) then print the 'requested_by' email address

						if (!itemFound.transcript[z].alias) {
							itemClicked.closest('li').append('<p class="innerTab"><span class="green">' + itemFound.requested_by + ': </span>' + itemFound.transcript[z].message + '</p>');
						} else {
							itemClicked.closest('li').append('<p class="innerTab"><span class="blue">' + itemFound.transcript[z].alias + ': </span>' + itemFound.transcript[z].message + '</p>');
						}
					} // end for loop
				} else {
					// Remove the innerTab's contents 
					itemClicked.closest('li').find('.innerTab').remove();

					// There is no chat transcript, so just list the MESSAGE
					itemClicked.closest('li').append('<div class="innerTab"><p>Requested By: <span class="gray"><a href="mailto:' + itemFound.requested_by + '">' + itemFound.requested_by + '</a></span></br>Page URL: ' + itemFound.page_url + '</br>Location: ' + itemFound.city + ', ' + itemFound.region + ', ' + itemFound.country + '</p>');
					itemClicked.closest('li').append('<div class="innerTab"><form><div class = "form-group"><label>Write your message below: </label><textarea name = "email" class="form-control" rows="3"></textarea><button class="btn btn-primary right">Send</button></form></div>');
				} // end if statement
			}
		}
};

var printChats = function(responseData, style) {
		// Loop through the chats and append to the page
		for (var i = 0; i < responseData.length; i++) {
			$('#body').append('<li class = "'+ style + '" id=' + responseData[i].id + '><i class= "fa fa-sort-down carat closeCarat"></i><span class= "heading">' + responseData[i].description + '</span></li>');
		}
};

var printAgents = function(responseData) {
	// Loop through the array of agents and append to the page
	for (var i = 0; i < responseData.length; i++) {
		$('#body').append('<div id="' + responseData[i] + '" class="col-lg-3 col-md-3 col-sm-3 col-xs-12 innerTab agentBlock center"><img src="http://www.placesheen.com/150/150" class="img-circle img img-responsive center"/><p><br />' + responseData[i] + '</p></div>');
	}
};

var average = function(total, quantity) {
	return (total / quantity);
};

///////////////////////////
//Event Handlers & Ajax //
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

	// Tab to load all chats
	$('#loadChats').on('click', function() {

		// Clear out the body
		$('#body').children().remove();

		$.get('/allChats', {}, function(responseData){
			// console.log('get request works, getting chats data from the file');
			// Print the chats json data to the client's console
			// console.log('responseData:', responseData);

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
				// printTranscripts(carat, searchByID(carat, ID, responseData));
			}); // end closeCarat click handler

			$(document).on('click', '.openCarat', function(){
				$(this).closest('li').find('.innerTab').remove();
				$(this).removeClass('openCarat').addClass('closeCarat');
			});
		}); // end Ajax get request loadChats
	}); // end loadChats click handler

	// Tab to load all messages
	$('#loadMessages').on('click', function() {

		// console.log('clicked!');

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
				// console.log('ID of what you clicked: ', ID);

				var carat = $(this);
				searchByID(carat, ID, responseData);
				// printTranscripts(carat, searchByID(carat, ID, responseData));
			}); // end closeCarat click handler

			$(document).on('click', '.openCarat', function(){
				$(this).closest('li').find('.innerTab').remove();
				$(this).removeClass('openCarat').addClass('closeCarat');
			});
		}); // end Ajax get loadMessages
	});  // end loadMessages click handler

	// Tab to load all agents
	$('#loadAgents').on('click', function() {
		console.log('clicked loadAgents!');

		// Clear out the body
		$('#body').children().remove();

		$.get('/loadAgents', {}, function(responseData) {
			console.log(responseData);

			// Get list of unique agent IDs
			var agentIDs = _.uniq(_.pluck(responseData, 'id'));

			printAgents(agentIDs);

			$(document).on('click', '.agentBlock', function() {
				console.log('you clicked the agent block');

				// Get the ID of the agent you clicked
				var agentID = $(this).attr('id');

				var showAgent = new Agent("", 0, 0, 0, 0, [], 0, 0, 0);

				for (var i = 0; i < responseData.length; i++) {
					if (agentID === responseData[i].id) {
						showAgent.alias = responseData[i].alias;
						showAgent.numberOfChats += 1;
						showAgent.waittime += responseData[i].waittime;
						showAgent.chatDuration += responseData[i].chatDuration;
						showAgent.chatScore += responseData[i].chatScore;
						// showAgent.chatComments.push(responseData[i].chatComments);  
					}
				}

				showAgent.avgWaittime = average(showAgent.waittime, showAgent.numberOfChats);
				showAgent.avgChatduration = average(showAgent.chatDuration, showAgent.numberOfChats);
				showAgent.avgChatScore = average(showAgent.chatScore, showAgent.numberOfChats);

				console.log(showAgent);
			});

		});

	});
	







});  // end jQuery wrapper