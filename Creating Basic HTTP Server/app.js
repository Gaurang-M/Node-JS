// It is a core node js module
var http = require('http');

var hostname = "localhost";

var port = 3000;

var server = http.createServer((req, res) => {
    console.log(`My server was hit by URL ${req.url}`);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hey there, i am GM Tuts .. !!\n');
});

server.listen(port, hostname, () => {
    console.log(`Serevr is running & is accessed on http://${hostname}:${port}`);
})