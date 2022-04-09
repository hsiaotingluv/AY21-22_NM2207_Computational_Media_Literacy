// load a library for creating servers
var http = require('http');

// Create the server. 
// Our callback function is called, it will be passed 2 paramters:
//    req: An object hodling the request made, and and object that
//    res: the object we use to send a response.
var server = http.createServer(function(req, res){
    res.writeHead(200, {'content-type': 'text/html'});
//    res.write('<hello world');
		res.write('<html><body style="background-color : sienna "> <h1> Hello World <h1> </body></html>');
    res.end();
});

// Start the server listening on a port
server.listen(3000);

console.log ("server listening on port " + 3000);


/*
run your server
- cd to folder (helloWorld)
- run node xxx.js (myNodeServer.js)

on browser
- http://localhost:3000/
- http://127.0.0.1:3000/
- on mac terminal, type ipconfig getifaddr en0
172.31.52.213:3000
*/