/* This is where client-side jQuery goes */

$(function(){

	console.log('This is a test of the jquery file!');

	// Ajax request to load ALL CHATS (and display only the description. On click of the description, display ALL chat info for the one that was clicked.)
	$.get('/allChats', {}, function(responseData){
		console.log('get request works, getting chats data file from the static server');
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
			for (var i= 0; i < responseData.length; i++) {
				if (id === responseData[i].id) {
					console.log('Found it: ', responseData[i]);

					// Loop through the found item's transcript messages and display the chat
					for (var i = 0; i < responseData[i].transcript.length; i++) {
						$(this).append(
							'<p>' + responseData[i].transcript[i].message + '</p>');
					}
				}

			}


		});


	}); // end get request






});  // end jQuery wrapper