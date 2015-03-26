# rpi-remote-ssh
Connect to a Remote Raspberry Pi over 3G cellular modem from the browser

This basically uses thirdparty modules, **[term.js](https://github.com/chjj/term.js/)**, **[pty](https://github.com/chjj/pty.js/)** and its dependencies.

To run a terminal on the browser using the above technologies to connect to rpi over a 3G cellular modem.

#### Steps on rpi,

  * Use/clone the entire repo on rpi.
  *	Run npm install, locally to install the dependent node modules.

##### Server
  *	The mytermjs folder contains the *server.js* file to which the client will get connected to, and need to be run
    using node.
  * To start the server, node server.js port, ex,

    ```$ node server.js 7777```


##### Client
  * *sshclient.js* on the root of the repo need to be run using node.
  * node sshclient.js domain.com port, ex,
  
	```$ node sshclient.js example.com 7777```
  * This will start the client and is now ready to connect to the server.

##### Browser
  * Access, the server and port given while starting the client on your browser to see the terminal in action.
  * The server must be running on the domain and port passed to the client.
  * ex: **http://example.com:7777**

- Port forwarding, must be done to access the client machine over ssh, on the desired machine running the server.