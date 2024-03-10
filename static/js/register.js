const registryForm = document.querySelector('form')

registryForm.addEventListener('submit', async ev => {
    ev.preventDefault()

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(registryForm))
    })

    if (response.status === 201) {
        const { payload: user } = await response.json()
        alert(JSON.stringify(user.email) + ' se registro con éxito')
        window.location.href = '/profile'
    } else {
        const error = await response.json()
        alert('Error: ' + error.message)
    }
})