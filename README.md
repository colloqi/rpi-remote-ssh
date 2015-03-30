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
  * Open browser  **http://myserverip-or-domainname:7777** to see the terminal in action.

## Would you like to know about our Raspberry pi Digital Signage  solution, visit www.pisignage.com
