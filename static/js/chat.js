const socket = io('http://localhost:8080')
const chat = document.getElementById('chatForm')
const user = document.getElementById('email')
const message = document.getElementById('message')
const showMessages = document.getElementById('showMessages')

socket.on('newUser', () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se conectó un nuevo usuario!',
        showConfirmButton: false,
        timer: 2000
    })
})

Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Bienvenido al chat!',
    showConfirmButton: false,
    timer: 2000
})

socket.on('userDisconnected', () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Se desconectó el usuario!',
        showConfirmButton: false,
        timer: 2000
    })
})

chat.addEventListener('submit', ev => {
    ev.preventDefault()
    if (message) {
        const newMessage = {
            user: user.value,
            message: message.value
        }
        socket.emit('newMessage', newMessage)
    }
})

socket.on('messages', (messages) => {
    showMessages.innerHTML = ''
    for (const message of messages) {
        const li = document.createElement('li')
        li.innerHTML = `${message.user}: ${message.message}`
        showMessages.appendChild(li)
    }
})