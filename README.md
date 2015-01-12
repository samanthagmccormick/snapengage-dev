<h2>Directions</h2>

<h3>Part 1:</h3>
<p>Using the provided JSON data, visualize the information in an interesting and/or useful way. A working system is preferable but we're also interested in seeing your design approach, what tools and frameworks you used, and how you present the data to the user. When you are finished please provide us with a link to the source code and a live demo page.</p>

<h3>Part 2 (Optional):</h3>
<p>Sign up for a SnapEngage account and using our Open API integration send several chats to an external system that you develop. Then using the same external system, display the information that was collected during those chats using the solution you developed for Part 1.</p>

<p>Some useful resources on the Open API can be found at:
http://help.snapengage.com/how-to-integrate-snapengage-with-your-open-api/
http://developer.snapengage.com/post-api/post-api/</h2>

<h2>Sam's Features!</h2>
<ul>
	<li>User Dashboard</li>
		<ul>
			<li>Chats tab: displays all CHATS by description (user's first message)</li>
			<li>Messages tab: displays all OPEN MESSAGES by description</li>
				<ul>
					<li>FUTURE: Hook up the form to actually be able to send emails thru the dashboard.</li>
				</ul>
			<li>Agents tab: displays all AGENTS. Click on an agent to view all details about their chats and stats</li>
			<li>FUTURE: Users tab displays all USERS (chatters). Allows you to view all chats/messages by user.</li>
			<li>FUTURE: All Data tab that uses Angular to display a chart of all data that you can instantly search and filter thru ALL chats/messages</li>
		</ul>
	<li>FUTURE: Editing capabilities, using the MongoDB database. You can mark a chat as "RESOLVED" to delete or archive it, write notes for a chat, or delete a chat</li>
	<li>FUTURE: Use the Snapengage API to send chat data, store in this MongoDB database, and display later on.</li>
</ul>

<h2>Technologies, Frameworks, and Libraries</h2>
<ul>
	<li>Express MVC to separate models-views-controllers</li>
	<li>Jade for server side HTML templating</li>
	<li>Node.js for server side JS</li>
	<li>Mongoose / MongoDB for the server database, mainly set this up for using the API in the future</li>
	<li>Ajax for small requests to the database to display each chat's info instead of all chat info all at once which would be a big payload if it was a lot of info</li>
	<li>Heroku for the server / live demo</li>
	<li>Github for code</li>
	<li>Bootstrap for styling</li>
	<li>Underscore for some light data manipulation</li>
</ul>


