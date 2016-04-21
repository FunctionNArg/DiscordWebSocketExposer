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
    var inform = console.info.bind(console, "[DWE]");
    var warn = console.warn.bind(console, "[DWE]");
    inform("DWE Running");
    var oWS = window.WebSocket;
    inform("Copied window.WebSocket to private variable");

    if (!window.DiscordExtensions) {
        warn("No window.DiscordExtensions object created, creating...");
        window.DiscordExtensions = {};
    }
    if (!window.DiscordExtensions.DiscordWebSockets) {
        warn("No window.DiscordExtensions.DiscordWebSockets array created, creating...");
        window.DiscordExtensions.DiscordWebSockets = [];
    }
    var DWEArr = window.DiscordExtensions.DiscordWebSockets;

    window.WebSocket = function(url, protocols) {
        var x = new oWS(url, protocols);
        DWEArr.push(x);
        inform("New Discord Websocket found and added to index", DWEArr.indexOf(x));
        x.addEventListener('close', function(e) {
            var i = DWEArr.indexOf(x);
            DWEArr.splice( i, 1 );
            inform("Discord Websocket in index " + i + " closed and removed");
            x.removeEventListener('close', arguments.callee);
            x = null;
        });
        return x;
    };
})();
