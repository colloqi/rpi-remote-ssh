#!/usr/bin/env node
/**
 * term.js
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 */
var http = require('http'),
    io = require('socket.io'),
    pty = require('pty'),
    terminal = require('./mytermjs/lib');
process.title = 'term.js';

var stream,
    nodeParams = process.argv.slice(2),
    server = nodeParams[0] || 'pisignage.com',
    port = nodeParams[1] || '8080',
    dump = nodeParams[2] || false;
    
if (dump)
    stream = require('fs').createWriteStream(__dirname + '/dump.log');

var buff = [],
    socket,
    term;
term = pty.fork(process.env.SHELL || 'bash', [], {
    name: require('fs').existsSync('/usr/share/terminfo/x/xterm-256color')
        ? 'xterm-256color'
        : 'xterm',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME
});
term.on('data', function(data) {
    if (stream)
        stream.write('OUT: ' + data + '\n-\n');
    // send data to server
    //console.log("reply from shell:\n")
    //console.log(data)
    if(mysocket)
        mysocket.emit('termdata', data);
});
console.log(term.pid);
console.log('Created shell with pty master/slave pair (master: %d, pid: %d)',term.fd, term.pid);

var ioclient = require('socket.io-client');
var mysocket= ioclient.connect('http://'+server+":"+port, { 'force new connection': true })

mysocket.on('connect', function(sock) {
    console.log('Connection On..');
    socket = sock;
    mysocket.emit('piconn', "Connection From PI");
    //mysocket.emit('pid', term.pid);
    mysocket.on('cmdtoterm', function(data) {
        if (stream) stream.write('IN: ' + data + '\n-\n');
        console.log(data)
        term.write(data);
    });
    mysocket.on('disconnect', function() {
        console.log('Disconnected....');
        socket = null;
    });
    mysocket.on('ack', function(msg) {
        console.log('Message from server: '+msg);
    })
    while (buff.length) {
        mysocket.emit('termdata', buff.shift());
    }
});

mysocket.on('error', function(err) {
    console.log('Error Event....');
    console.log(err ? err: 'No Err Msg Available');
})

mysocket.on('reconnect_error', function(err) {
    console.log('Reconnect Event....');
    console.log(err ? err: 'No Err Msg Available');
})
