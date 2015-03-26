# term.js
Terminal access for the devices sitting behind firewall.

Created the fork of [**term.js**](https://github.com/chjj/term.js) to acccess the Terminals sitting behind firewall, by adding client-sever socketio.

## Example

device:

``` js
var term = require('term.js');
app.use(term.middleware());
...
```
Server:

bridge the client socket to device.

client:

``` js
window.addEventListener('load', function() {
  var socket = io.connect();
  socket.on('connect', function() {
    var term = new Terminal({
      cols: 80,
      rows: 24,
      screenKeys: true
    });

    term.on('data', function(data) {
      socket.emit('data', data);
    });

    term.on('title', function(title) {
      document.title = title;
    });

    term.open(document.body);

    term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');

    socket.on('data', function(data) {
      term.write(data);
    });

    socket.on('disconnect', function() {
      term.destroy();
    });
  });
}, false);
```

## Tmux-like



## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your code
to be distributed under the MIT license. You are also implicitly verifying that
all code is your original work. `</legalese>`

## License

Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
