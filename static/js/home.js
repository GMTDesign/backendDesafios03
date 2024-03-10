const socket = io('http://localhost:8080')

const prodId = document.querySelectorAll(".btn-primary")

const logoutFormHome = document.querySelector('form')

window.addEventListener('load', async ev => {
    const response = await fetch('api/users/current')
    if (response.status === 201) {
        const { payload: user} = await response.json()
        const [email, cart] = document.querySelectorAll('span')
        email.innerHTML = user.email
        cart.innerHTML = user.cart
    } else {
        const error = await response.json()
        alert('Debe loguearse para realizar compras, error: ' + error.message)
        window.location.href = '/login'
    }
})


logoutFormHome.addEventListener('submit', async ev => {
    ev.preventDefault()

    const response = await fetch('/api/sessions/current', {
        method: 'DELETE'
    })

    if (response.status === 204) {
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert('Error: ' + error.message)

    }
})


const cid = document.getElementById('cartId')
console.log(cid.innerHTML)
prodId.forEach(prod => {
    prod.addEventListener("click", (ev) => {
        if (!cartId.innerHTML) { alert('no tiene asignado un carrito, DEBE REGISTRESE!')}
        socket.emit('newProduct', ev.target.id, cid.innerHTML)
    })
})

const logoutForm = document.querySelector('form')

logoutForm?.addEventListener('submit', async ev => {
    ev.preventDefault()

    const response = await fetch('/api/sessions/current', {
        method: 'DELETE'
    })

    if (response.status === 204) {
        window.location.href = '/login'
    } else {
        const error = await response.json()
        alert('Error: ' + error.message)
    }
})

