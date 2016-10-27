var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer( function (request, response) { 
  var pathname = url.parse(request.url).pathname;
  pathname = (pathname == "/") ? "index.html" : pathname.substr(1);
  console.log("Request for " + pathname + " received.");


  fs.readFile(pathname, "utf-8", function (err, data) {
    if (err) {
       console.log(err);
       response.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      // response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data.toString());
      response.end();
    }
  });
});

server.listen(4040);

console.log('Server running at http://127.0.0.1:4040/');