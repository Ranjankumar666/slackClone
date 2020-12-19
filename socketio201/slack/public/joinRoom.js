const joinRoom = (socket, roomName) => {
  return socket.emit('joinRoom', roomName, (newNoOfMembers) => {
    document.querySelector('.curr-room-num-users').innerHTML = `${newNoOfMembers} <span class="glyphicon glyphicon-user"></span
                    >`
    document.querySelector('.curr-room-text').innerHTML = roomName;

  })
}
