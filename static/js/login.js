const loginForm = document.querySelector('form')

loginForm.addEventListener('submit', async ev => {
    ev.preventDefault()
    const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(loginForm))
    })

    if (response.status === 201) {
        alert('Bienvenido!')
        window.location.href = '/profile'
    } else {
        const error = await response.json()
        alert('Error: ' + error.message)
        
    }
})