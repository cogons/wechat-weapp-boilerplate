// require('dotenv').config();
const app = require('./server')

// const port = process.env.PORT || 3000
// server.listen(port, () => console.log(`API server started on ${port}`))

var http = require('http');
var https = require('https');
var fs = require('fs');
var enforceHttps = require('koa-sslify');

// SSL options
var options = {
    key: fs.readFileSync('/usr/local/var/ssl/server.key'),  //ssl文件路径
    cert: fs.readFileSync('/usr/local/var/ssl/server.crt')  //ssl文件路径
};

// start the server
http.createServer(app.callback()).listen(8001);
https.createServer(options, app.callback()).listen(8002);

//
console.log('https server is running');