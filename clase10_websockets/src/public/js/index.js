const socket = io()


socket.emit('message', 'Hola, soy German y me estoy comunicando desde el websocket!!')

socket.on('para_uno', data => {
    console.log(data);
})

socket.on('para_el_resto', data => {
    console.log(data);
})

socket.on('everyone', data => {
    console.log(data);
})
