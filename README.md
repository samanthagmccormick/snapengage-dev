<h2>Directions</h2>

<h3>Part 1:</h3>
<p>Using the provided JSON data, visualize the information in an interesting and/or useful way. A working system is preferable but we're also interested in seeing your design approach, what tools and frameworks you used, and how you present the data to the user. When you are finished please provide us with a link to the source code and a live demo page.</p>

<h3>Part 2 (Optional):</h3>
<p>Sign up for a SnapEngage account and using our Open API integration send several chats to an external system that you develop. Then using the same external system, display the information that was collected during those chats using the solution you developed for Part 1.</p>

<p>Some useful resources on the Open API can be found at:
http://help.snapengage.com/how-to-integrate-snapengage-with-your-open-api/
http://developer.snapengage.com/post-api/post-api/</h2>

<h2>Features</h2>
<ul>
	<li>User Dashboard (no login though)</li>
		<ul>
			<li>Display chats by website (account) - circular display? d3?</li>
			<li>Once you click into an account, you can see all the chats listed by date</li>
			<li>Green for resolved, red for unresolved</li>
		</ul>
	<li>User can mark a chat as "RESOLVED", write notes for a chat, or delete a chat</li>
	<li>User can search through their chats (use Angular)</li>
</ul>

<h2>Technologies and Frameworks</h2>
<ul>
	<li>Bootstrap</li>
	<li>Node.js</li>
	<li>Ajax for small requests to the database to display each chat's info instead of all chat info all at once</li>
	<li>Express MVC</li>
	<li>Heroku for the server / live demo</li>
	<li>Angular for searching/sorting</li>
</ul>


