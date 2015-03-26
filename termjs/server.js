#!/usr/bin/env node

/**
 * term.js
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 */
var http = require('http'),
    express = require('express'),
    io = require('socket.io');

/*
 * Uses default port as 8080, substitue with default port of your choice or use port param option on command line
 * node server.js port
 */
var stream,
    nodeParams = process.argv.slice(2),
    port = nodeParams[0] || '8080',
    dump = nodeParams[1] || false;

if (dump)
    stream = require('fs').createWriteStream(__dirname + '/dump.log');
/**
 * App & Server
 */
var buff = [],
    socket;

var app = express()
   server = http.createServer(app);

app.use(function(req, res, next) {
    var setHeader = res.setHeader;
    res.setHeader = function(name) {
       switch (name) {
          case 'Cache-Control':
          case 'Last-Modified':
          case 'ETag':
             return;
       }
       return setHeader.apply(res, arguments);
    };
    next();
});

app.use(express.basicAuth(function(user, pass, next) {
    if (user !== 'foo' || pass !== 'bar') {
       return next(true);
    }
   return next(null, user);
}));

app.use(express.static(__dirname));
server.listen(port);

/**
 * Sockets
 */
io = io.listen(server, {
   log: false
});
var browserconn;
var piconn;

io.sockets.on('connection', function(sock) {
    console.log("socket connection:  \n");
    socket = sock;
    //identify the socket
    socket.on('browser', function() {
       browserconn = socket;
       console.log("browser socket")
       console.log(sock.id)
    });
    socket.on('data', function(data) {
       //send data to term
       console.log(data)
        if(piconn) {
           console.log("sending data to pi")
           piconn.emit('cmdtoterm', data);
            //term.write(data);
        }
    });
   //identify the socket
    socket.on('piconn', function(msg) {
       piconn = socket;
       console.log(msg);
       console.log("PI socket: "+sock.id);
       socket.emit('ack','Acknowledged '+sock.id);
    });
    //socket.on('pid', function(pid) {
    //    console.log('Pid of running client.js process'+pid);
    //});
    socket.on('termdata', function(data) {
        if(browserconn)
           browserconn.emit('data', data);
    });
});