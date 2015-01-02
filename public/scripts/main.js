/* This is where client-side jQuery goes */

$(function(){

	console.log('This is a test of the jquery file!');

	// Ajax request to load all CHATS (and display only the description. On click of the description, display ALL chat info for the one that was clicked.)
	$('#loadChats').on('click', function() {

		$.get('/allChats', {}, function(responseData){
			console.log('get request works, getting chats data from the file');
			// Print the chats json data to the client's console
			console.log('responseData:', responseData);

			// Loop through the chats and append to the page
			for (var i = 0; i < responseData.length; i++) {
				$('#allChats').append('<li id=' + responseData[i].id + '>' + responseData[i].description + '</li>');
			}

			// On click of a list item, display all of the chat's info to the user
			$(document).on('click', 'li', function() {
				console.log('LI has been clicked!');

				var id = $(this).attr('id');

				console.log('ID of what you clicked: ', id);

				// Go thru the responseData and look for the ID of what you clicked. 
				for (var i = 0; i < responseData.length; i++) {
					if (id === responseData[i].id) {
						console.log('Found it: ', responseData[i]);
							for (var z = 0; z < responseData[i].transcript.length; z++) {
								// If there is no alias (i.e. it's the customer) then print the 'requested_by' email address
								if (!responseData[i].transcript[z].alias) {
									$(this).append('<p><span class="green">' + responseData[i].requested_by + ': </span>' + responseData[i].transcript[z].message + '</p>');
								} else {
								// else print the agent's alias
									$(this).append('<p><span class="blue">' + responseData[i].transcript[z].alias + ': </span>' + responseData[i].transcript[z].message + '</p>');
								}

							}
					}
				}
			});
		}); // end get request
	}); // end loadChats click handler

	







});  // end jQuery wrapper