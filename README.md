# DiscordWebSocketExposer
Attaches all created WebSockets on Discord's site (/channels) to `window.DiscordExtensions.DiscordWebSockets`.

Edits `window.WebSocket` to push the created websocket into the `DiscordWebSockets` Array. No user info (tokens, usernames, passwords) required.

This is a UserScript (because it needs to run when the document begins) so make sure it's enabled. You should receive the following output, or someting similar: 

```
[DWE] DWE Running
[DWE] Copied window.WebSocket to private variable
[DWE] No window.DiscordExtensions object created, creating...
[DWE] No window.DiscordExtensions.DiscordWebSockets array created, creating...
[DWE] New Discord Websocket found and added to index 0
```

### Log messages to the console example

```js
function handleDWS(message) {
	var event = JSON.parse(message.data);
	if (event.t !== 'MESSAGE_CREATE') return;

	var data = event.d;
	console.log("[%s]\n%s", data.author.username, data.content);
}

var DWEs = window.DiscordExtensions.DiscordWebSockets;
DWEs[0].addEventListener('message', handleDWS);
```
