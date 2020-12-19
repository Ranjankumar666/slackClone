// const name = prompt("Enter your name: ");

const socket = io("/", {
  transports: ["polling", "websocket"],
});

socket.on("nsData", (data) => {
  nsData = data;
  // adding the first Namespace by default
  const firstNs = io(nsData[0].endpoint);
  nsContainer.innerHTML = "";

  addNs(nsData[0]);

  firstNs.on('rooms', rooms => {
    joinRoom(socket, rooms[0].roomTitle);
    rooms.forEach(r => {
        addRoom(socket, r);
    });
  })

  // adding others ns
  nsData.forEach((ns, index) => {
    if(index !== 0 ) addNs(ns);
  });
});
