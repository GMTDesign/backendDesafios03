const logoutForm = document.querySelector('form')

window.addEventListener('load', async ev => {
    const response = await fetch('api/users/current')
    if (response.status === 201) {
        const { payload: user} = await response.json()
        const [firstName, lastName, email, cart] = document.querySelectorAll('span')
        firstName.innerHTML = user.firstName
        lastName.innerHTML = user.lastName
        email.innerHTML = user.email
        cart.innerHTML = user.cart
    } else {
        const error = await response.json()
        alert('Error ' + error.message)
        window.location.href = '/login'
    }
})


logoutForm.addEventListener('submit', async ev => {
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