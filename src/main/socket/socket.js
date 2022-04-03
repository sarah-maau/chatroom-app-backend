"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SocketTypes_1 = require("./SocketTypes");
var Logging_1 = __importDefault(require("../helpers/logs/Logging"));
var uuid_1 = require("uuid");
var rooms = {};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function socket(_a) {
    var io = _a.io;
    Logging_1.default.info(">>> socket connected");
    io.on(SocketTypes_1.ServerConnection, function (socket) {
        Logging_1.default.info("user ".concat(socket.id, " connected "));
        socket.emit(SocketTypes_1.ServerEvent.ROOMS, rooms);
        socket.on(SocketTypes_1.ClientEvent.CREATE_ROOM, function (_a) {
            var roomName = _a.roomName;
            Logging_1.default.info("room ".concat(roomName, " created "));
            var roomId = (0, uuid_1.v4)();
            rooms[roomId] = {
                name: roomName
            };
            socket.join(roomId);
            socket.broadcast.emit(SocketTypes_1.ServerEvent.ROOMS, rooms);
            socket.emit(SocketTypes_1.ServerEvent.ROOMS, rooms);
            socket.emit(SocketTypes_1.ServerEvent.JOINED_ROOM, roomId);
        });
        socket.on(SocketTypes_1.ClientEvent.SEND_ROOM_MESSAGE, function (_a) {
            var roomId = _a.roomId, message = _a.message, username = _a.username;
            var date = new Date();
            socket.to(roomId).emit(SocketTypes_1.ServerEvent.ROOM_MESSAGE, {
                message: message,
                username: username,
                time: "".concat(date.getHours(), ":").concat(date.getMinutes())
            });
        });
        socket.on(SocketTypes_1.ClientEvent.JOIN_ROOM, function (roomId) {
            socket.join(roomId);
            socket.emit(SocketTypes_1.ServerEvent.JOINED_ROOM, roomId);
        });
    });
}
// eslint-disable-next-line import/no-default-export
exports.default = socket;
