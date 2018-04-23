// It is a core node js module
var http = require('http');

var hostname = "localhost";

var port = 3000;

var fs = require('fs');

var connect = require('connect');

var app = connect();


var sendPageNotFoundResponse = function(res){
    res.statusCode = 404;
    res.setHeader('Content-Type','text/plain');
    res.end('Page Not Found \n');
}

app.use((req, res, next) => {
    // User authentication can be checked here
    console.log(`My first Middleware`);
    next();
})

app.use((req, res, next) => {
     // User authorisation can be checked here
    console.log(`My second Middleware`);
    next();
})


app.use(`/contact`,(req, res, next) => {
    // User authorisation can be checked here
   console.log(`My contact Middleware`);
   next();
})

app.use((req, res) => {
    console.log(`My server was hit by URL ${req.url}`);

    if(req.method === "GET" && req.url === `/`){
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        fs.createReadStream('./index.html').pipe(res);
    }else{
        sendPageNotFoundResponse(res);
    }
})

var server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Serevr is running & is accessed on http://${hostname}:${port}`);
})