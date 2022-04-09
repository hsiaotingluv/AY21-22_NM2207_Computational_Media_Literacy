const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketio = new Server(server);

var portnum = process.argv[2] || 3000; // Get portnum from the command line if it is there, otherwise use 3000 as default

// look in the www directory for static code to serve
app.use(express.static('www'));

// listen for incoming messages on the port specified on the comman line
server.listen(portnum, () => {
  console.log('listening on ' + portnum);
});

// when we get a new connection, set up a new listener for 'message' messages
socketio.on('connection', function (socket) {
	//create a listener for this particular socket
	console.log("Got a connection on socket : " + socket);
	
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});

/*
Dynamic Web pages
- can be responive to user info
- change depending on real-time data
- content created when it is requested
- typically involves a database from which the webpages that are served are created at the time they are requested
- e.g. stock market trading, shopping sites

Why github.io does not host dynamic web page?
- expensive
- security issue

Multi-user interaction
- "chat room" model

// socket connection established for each site visitor
socketio.listen(server).on('connection', function (socket) { 
	socket.on('message', function (msg) {
		console.log('Message Received: ', msg);
		// any messages server receives, are broadcast to all other sockets
		socket.broadcast.emit('message', msg); 
	});
});

Sockets
- Socket enables real-time two-way communication
- each client gets a different socket number, or 'id' to use once the connection is established
*/
