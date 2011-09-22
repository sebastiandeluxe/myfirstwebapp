// load the required modules
var http = require("http");
var url = require("url");
// initialize port and ip for use in c9.io
var port = process.env.C9_PORT;
var ip = "0.0.0.0";
// initialize the text response shown by the server
var textOut = "Hallo Welt!";

// create the startServer function to be exported as a module
function startServer(route) {
    
    // how requests and responses are handled
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        // ?
        route(pathname);
        // write out the server response to the client
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write(textOut);
        response.end();
    }
    // create the actual server object
    http.createServer(onRequest).listen(port, ip);
    // debug info to be passed to the console
    console.log("Der Server laeuft!");
}

// now export the function as a module
exports.startServer = startServer;