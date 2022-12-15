const socket = io()

let user;
let chatBox = document.getElementById('chatBox')

// Autenciar (Escribimos nombre)
Swal.fire({
    title: "Identificate",
    input: "text",
    inputValidator: value => {
        return !value && 'Necesita un nombre'
    },
    allowOutsideClick: false
}).then(result => {
    // Seteamos el usuario
    user = result.value
    let txtUsername = document.getElementById('username')
    txtUsername.innerHTML = user
    socket.emit('authenticated', user)
})

// Evento de escribir en el campo de texto [1]
chatBox.addEventListener('keyup', event => {
    if(event.key == 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user, 
                message: chatBox.value
            })
            chatBox.value = ''
        }
    }
})

// CUando alguien emite un mensaje [2]
socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs')
    
    let messages = ''
    data.forEach(message => {
        messages += `<b>${message.user}</b>: ${message.message}<br>`
    })

    log.innerHTML = messages
})