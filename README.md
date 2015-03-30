# rpi-remote-ssh
Connect to a Remote Raspberry Pi over 3G cellular modem from the browser

Based on, **[term.js](https://github.com/chjj/term.js/)**, **[pty](https://github.com/chjj/pty.js/)** modules.

#HOW TO



##### On your development mc/ or Server.
  *	cd rpi-remote-ssh/termjs.
  *      ```$ node server.js 7777``` (Use any free port),
  *      Don't forget to enable port forwarding if you are sitting behind NAT

##### Client
Keep your raspberry pi device connected to internet using wvdial. 

  *     git clone https://github.com/ariemtech/rpi-remote-ssh.
  *	cd rpi-remote-ssh
  *	npm install
  * 	```$ node sshclient.js myserverip-or-domainname 7777```
  * This will start the client and is now ready to connect to the server.

##### Browser
  * Access, the server and port given while starting the client on your browser to see the terminal in action.
  * The server must be running on the domain and port passed to the client.
  * ex: **http://myserverip-or-domainname:7777**

- Port forwarding, must be done to access the client machine over ssh, on the desired machine running the server.
