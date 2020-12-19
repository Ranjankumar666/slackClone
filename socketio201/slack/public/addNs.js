const nsContainer = document.querySelector('.namespaces');

const addNs = ({img, endpoint}) => {
    const ns = document.createElement('img');

    ns.setAttribute('src', img);
    ns.classList.add('namespace');
    nsContainer.appendChild(ns);
    let socket;
    

    ns.addEventListener('click', (e)=> {
        roomContainer.innerHTML = '';
        socket = io(endpoint);

        socket.on('rooms', (rooms) => {
            joinRoom(socket, rooms[0].roomTitle);
            rooms.forEach((r,i) => {
                addRoom(socket, r);
            });
        })
    })



    const message = document.querySelector('#user-input')

    message.addEventListener('submit', (e)=> {
        e.preventDefault();
        console.log('submit')
        const msgInput = document.querySelector('#user-message').value;

        socket.emit('messageToServer', {message: msgInput})
        })
    }

