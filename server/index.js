"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uWebSockets_js_1 = require("uWebSockets.js");
var port = 3000;
uWebSockets_js_1.default
    .App()
    .get("/*", function (res, req) {
    res.end("H3llo World!");
})
    .listen(port, function (token) {
    if (token) {
        console.log("Listening to port ".concat(port));
    }
    else {
        console.log("Failed to listen to port ".concat(port));
    }
});
