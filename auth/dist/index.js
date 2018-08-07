"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var process = require("process");
var debug = require("debug");
var app_1 = require("./app");
var port = process.env.PORT || '3001';
var name = "reminder/" + process.pid;
var log = debug(name);
var httpServer = http_1.createServer(app_1.app);
httpServer.listen(port, function () {
    log("started at port " + port);
});
process.on('SIGTERM', function () {
    debug('SIGTERM' + process.pid);
    if (httpServer) {
        httpServer.close();
    }
    setTimeout(function () {
        process.exit(0);
    }, 5000);
});
//# sourceMappingURL=index.js.map