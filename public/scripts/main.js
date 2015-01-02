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
				$('#allChats').append('<li class = "tab" id=' + responseData[i].id + '><i class= "fa fa-sort-down carat closeCarat"></i><span class= "heading">' + responseData[i].description + '</span></li>');
			}

			// On click of a list item, display all of the chat's info to the user
			$(document).on('click', '.closeCarat', function() {
				console.log('Carat has been clicked!');

				$(this).addClass('openCarat').removeClass('closeCarat');

				// Get the ID of what you clicked
				var id = $(this).closest('li').attr('id');
				console.log('ID of what you clicked: ', id);

				// Go thru the responseData and look for the ID of what you clicked. 
				for (var i = 0; i < responseData.length; i++) {
					if (id === responseData[i].id) {
						console.log('Found it: ', responseData[i]);
							for (var z = 0; z < responseData[i].transcript.length; z++) {
								// If there is no alias (i.e. it's the customer) then print the 'requested_by' email address
								if (!responseData[i].transcript[z].alias) {
									$(this).closest('li').append('<p class="message"><span class="green">' + responseData[i].requested_by + ': </span>' + responseData[i].transcript[z].message + '</p>');
								} else {
									$(this).closest('li').append('<p class="message"><span class="blue">' + responseData[i].transcript[z].alias + ': </span>' + responseData[i].transcript[z].message + '</p>');
								}

							} // end for loop
					} // end if statement
				} // end for loop
			}); // end closeCarat click handler

			$(document).on('click', '.openCarat', function(){
				$(this).closest('li').find('p').remove();
				$(this).removeClass('openCarat').addClass('closeCarat');
			});
		}); // end get request
	}); // end loadChats click handler

	







});  // end jQuery wrapper