const config = require('../config/config');

const http = require('http');

const request = require('request');

const cluster = require('cluster');

const myConsole = require('./consoleWithColor');

const server = http.createServer((req, res) => {
    myConsole.log(req.url);
    req.pipe(request(req.url, (err) => {
        if(err){
            res.writeHead(200,{'Content-type':'text/html'});
            res.end(err.message);
        }
    })).pipe(res);
});

server.listen(config.localPort);

process.send(`工作进程${cluster.worker.id}已启动！`);