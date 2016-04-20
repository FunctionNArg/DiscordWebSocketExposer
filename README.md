# DiscordWebSocketExposer
Attaches all created WebSockets on Discord's site (/channels) to 'window.DiscordExtensions.DiscordWebSockets'.

Edits `window.WebSocket` to push the created websocket into the `DiscordWebSockets` Array. No user info (tokens, usernames, passwords) required.
