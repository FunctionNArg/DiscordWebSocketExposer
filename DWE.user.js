// ==UserScript==
// @name         Discord WebSocket Exposer
// @namespace    https://github.com/izy521
// @version      0.1
// @description  Easily get information from the client without spawning a secondary websocket.
// @author       izy521
// @match        https://discordapp.com/channels/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var inform = console.info.bind(console, "[DWE]");
    var warn = console.warn.bind(console, "[DWE]");
    inform("DWE Running");
    var oWS = window.WebSocket;
    inform("Copied window.WebSocket to private variable");
    window.WebSocket = function(url, protocols) {
        var x = new oWS(url, protocols);
        if (!window.DiscordExtensions) {
            warn("No window.DiscordExtensions object created, creating...");
            window.DiscordExtensions = {};
        }
        if (!window.DiscordExtensions.DiscordWebSockets) {
            warn("No window.DiscordExtensions.DiscordWebSockets array created, creating...");
            window.DiscordExtensions.DiscordWebSockets = [];
        }
        window.DiscordExtensions.DiscordWebSockets.push(x);
        inform("New Discord Websocket found and added to index", window.DiscordExtensions.DiscordWebSockets.length - 1);
        return x;
    };
})();
