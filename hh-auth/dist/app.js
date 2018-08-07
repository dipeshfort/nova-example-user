"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.app = express();
exports.app.use('/health', function (req, resp) {
    resp.json({
        message: 'OK'
    });
});
//# sourceMappingURL=app.js.map