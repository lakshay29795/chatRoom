import io from "socket.io-client";

let configData = {
    socketConnection: io("localhost:3000"),
};

export default configData;