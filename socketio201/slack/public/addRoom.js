const roomContainer = document.querySelector('.room-list');


const addRoom = (socket, {roomTitle}) => {
    const room = document.createElement('li');
    room.classList.add('room');
    room.textContent = `#${roomTitle}`;

    roomContainer.appendChild(room);
    room.addEventListener('click', ()=>{
        joinRoom(socket, roomTitle)
        // socket.on('success', (data)=> console.log(data));
        // console.log(socket)
    })
}


