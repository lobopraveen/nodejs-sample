// loading packages
var http = require("http");
var secModule = require('./security');
var url = require('url');
var queryString = require('querystring');

// starting the server and handling the requests
var server = http.createServer(function(req, res) {

  // because chrome sends a separate request for favicon. just ignore it.
  if (req.url === '/favicon.ico') {
    // header info for the requestor
    res.writeHead(200, {"content-type":"image/x-icon"});
    // end this response
    res.end();
    // return or else ;-)
    return;
  }

  // GET
  // parsing the URL
  var q = url.parse(req.url).query;

  // extracting the parameters from the URL
  var id = queryString.parse(q)['id'];
  var pwd = queryString.parse(q)['pwd'];

  // authenticating the user using the security module
  var result = secModule.authenticate(id, pwd);

  // sending the result back as html along with headers
  res.writeHead(200, {"content-type":"text/html"});
  res.write("<!DOCTYPE html><html><body><h1>GET:"+result+"</h1></body></html>");

  // end this response
  // res.end(); // Keeping it open for POST stuff below
  console.log("get request processed");

  // POST

  // This will hold the data coming in
  postedData = '';

  // recieve the data
  req.on('data', function(incomingDataPart) {
    postedData += incomingDataPart;
  });

  // Once the complete data is available call this function
  req.on('end', function() {
    var id = queryString.parse(postedData)['id'];
    var pwd = queryString.parse(postedData)['pwd'];

    // authenticating the user using the security module
    var result = secModule.authenticate(id, pwd);

    // sending the result back as html along with headers
    //res.writeHead(200, {"content-type":"text/html"}); // can't write head twice. see GET above.
    res.write("<!DOCTYPE html><html><body><h1>POST:"+result+"</h1></body></html>");

    // end this response
    res.end();
    console.log("post request processed");
  });

});

server.listen(9400);

console.log("Sample node.js app.");
console.log("server is started");
// console.log(server);
