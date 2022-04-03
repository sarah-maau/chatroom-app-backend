const ServerConnection: string ="connection"

enum ClientEvent {
    CREATE_ROOM = "CREATE_ROOM",
    SEND_ROOM_MESSAGE= "SEND_ROOM_MESSAGE",
    JOIN_ROOM= "JOIN_ROOM",
}
enum ServerEvent  {
    ROOMS= "ROOMS",
    JOINED_ROOM = "JOINED_ROOM",
    ROOM_MESSAGE= "ROOM_MESSAGE",
}

export {
    ClientEvent, ServerEvent, ServerConnection
}