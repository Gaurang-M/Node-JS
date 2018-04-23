// It is a core node js module
var http = require('http');

var hostname = "localhost";

var port = 3000;

var fs = require('fs');


var sendPageNotFoundResponse = function(res){
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end('Page Not Found \n');
}

var server = http.createServer((req, res) => {
    console.log(`My server was hit by URL ${req.url}`);

    if(req.method === "GET" && req.url === `/`){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        fs.createReadStream('./index.html').pipe(res);
    }else{
        sendPageNotFoundResponse(res);
    }
});

server.listen(port, hostname, () => {
    console.log(`Serevr is running & is accessed on http://${hostname}:${port}`);
})