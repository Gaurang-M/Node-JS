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

app.use(function(req, res, next){
    // check for authentication
    console.log(`My first Middleware`);
    var isAuthticated = true;
    if(isAuthticated){
        next();
    }else{
        res.statusCode = 401;
        res.setHeader('Content-Type','text/plain'),
        res.end('user not authenticated \n');
    }
})

app.use(function(req, res, next){
    // check authorization
    console.log(`My second Middleware`);
    next();
})


app.use(`/downloads`,function(req, res, next){
    // check anything
    console.log(`My downloads Middleware`);
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