const API = 'https://gatocorpapi.herokuapp.com'

const codigo = document.cookie.match(/codigo=([A-Z]\d{4}-\d{1})/)[1]
console.log('codigo de la cookie:', codigo)
document.addEventListener('DOMContentLoaded', function () {
    fetch(`${API}/estudiantes/codigo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codigo: codigo
        })
      }).then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
})

// cambiar contraseña
const cambiar = document.getElementById('contra')

cambiar.addEventListener('click', function () {
    document.cookie = `${codigo}; path=cambiarcontra.html;`
    window.location.href = 'cambiarcontra.html'
})

//cerrar sesion
document.getElementById('sesion').addEventListener('click', (e) => {
    e.preventDefault()
    document.cookie = ";max-age=0;"
    window.location.href = 'login.html'
})