const express = require("express");
const app = express();
const socketio = require("socket.io");
const path = require("path");

let namespaces = require("./data/namespaces");

app.use(express.static(path.join(__dirname, "/public")));
app.get("/", (req, res, next) => {
    res.sendFile("/index.html");
});

const expressServer = app.listen(9000, () =>
    console.log("Express server at 9000")
);

const io = socketio(expressServer, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("New Client added");
    const nsData = namespaces.map(({ img, endpoint }) => ({ img, endpoint }));
    socket.emit("nsData", nsData);
});

namespaces.forEach((ns) => {
    io.of(ns.endpoint).on("connection", (nsSocket) => {
        console.log(`New user connected to ${ns.title} namespace`);

        nsSocket.emit("rooms", ns.rooms);

        nsSocket.on("joinRoom", (roomName, cb) => {
            nsSocket.join(roomName);

            io.of(ns.endpoint)
                .in(roomName)
                .allSockets()
                .then((res) => {
                    cb(Array.from(res).length);
                })
                .catch((err) => console.log(err.message));
        });

        nsSocket.on('messageToServer', (data)=> {
            console.log(data);
        })
    });
});
