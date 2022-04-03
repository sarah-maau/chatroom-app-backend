"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendApplicationParams = void 0;
/* eslint-disable no-process-env */
var BackendApplicationParams = /** @class */ (function () {
    function BackendApplicationParams(p) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        var httpPort = 8080;
        if (process.env.PORT) {
            httpPort = Number(process.env.PORT);
        }
        else if (process.env.HTTP_PORT) {
            httpPort = Number(process.env.HTTP_PORT);
        }
        this.http = {
            port: (_b = (_a = p.http) === null || _a === void 0 ? void 0 : _a.port) !== null && _b !== void 0 ? _b : httpPort,
            host: (_e = (_d = (_c = p.http) === null || _c === void 0 ? void 0 : _c.host) !== null && _d !== void 0 ? _d : process.env.HTTP_HOST) !== null && _e !== void 0 ? _e : '127.0.0.1'
        };
        this.db = {
            uri: (_h = (_g = (_f = p.db) === null || _f === void 0 ? void 0 : _f.uri) !== null && _g !== void 0 ? _g : process.env.DB_URI) !== null && _h !== void 0 ? _h : 'mongodb://localhost:27017/chatroom',
            proxyUri: (_k = (_j = p.db) === null || _j === void 0 ? void 0 : _j.proxyUri) !== null && _k !== void 0 ? _k : process.env.DB_PROXY_URI
        };
        this.jwt = {
            secret: (_o = (_m = (_l = p.jwt) === null || _l === void 0 ? void 0 : _l.secret) !== null && _m !== void 0 ? _m : process.env.JWT_SECRET) !== null && _o !== void 0 ? _o : 'changemechangemechangeme'
        };
        this.management = {
            secret: (_q = (_p = p.management) === null || _p === void 0 ? void 0 : _p.secret) !== null && _q !== void 0 ? _q : process.env.MANAGEMENT_SECRET
        };
    }
    return BackendApplicationParams;
}());
exports.BackendApplicationParams = BackendApplicationParams;
