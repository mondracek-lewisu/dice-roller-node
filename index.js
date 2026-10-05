const express = require('express')
const app = express()

const cors = require("cors")

const port = process.env.PORT || 3000


// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))
app.use(cors({ origin: '*' }))

// CORS failure test:
// app.use(cors({ origin: 'https://blahblahblah.com' }))

// The app.get functions below are being processed in Node.js running on the server.
// REST API
app.get('/api/roll', (request, response) => {
	console.log('Calling "/api/roll"');

	const rolls = [];

	for (let i = 0; i < 5; i++) {
		const roll = Math.floor(Math.random() * 6) + 1;
		rolls.push(roll);
	}

	console.log('Roll:', rolls);

	response.json({ rolls: rolls });
});

app.get('/api/ping', (request, response) => {
	console.log('Calling "/api/ping"')
	response.type('text/plain')
	response.send('ping response')
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)
