"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConnection = exports.ServerEvent = exports.ClientEvent = void 0;
var ServerConnection = "connection";
exports.ServerConnection = ServerConnection;
var ClientEvent;
(function (ClientEvent) {
    ClientEvent["CREATE_ROOM"] = "CREATE_ROOM";
    ClientEvent["SEND_ROOM_MESSAGE"] = "SEND_ROOM_MESSAGE";
    ClientEvent["JOIN_ROOM"] = "JOIN_ROOM";
})(ClientEvent || (ClientEvent = {}));
exports.ClientEvent = ClientEvent;
var ServerEvent;
(function (ServerEvent) {
    ServerEvent["ROOMS"] = "ROOMS";
    ServerEvent["JOINED_ROOM"] = "JOINED_ROOM";
    ServerEvent["ROOM_MESSAGE"] = "ROOM_MESSAGE";
})(ServerEvent || (ServerEvent = {}));
exports.ServerEvent = ServerEvent;
