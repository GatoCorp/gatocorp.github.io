const API = "https://gatocorpapi.herokuapp.com"
//const API = "http://localhost:8000" //comentar despues de usar
const codigo = document.cookie.match(/codigo=([A-Z]\d{4}-\d{1});/)[1]
console.log('codigo de la cookie:', codigo)
document.addEventListener('DOMContentLoaded', function () {
    fetch(`${API}/estudiantes/${codigo}`)[0]
        .then(response => response.json())
        .then(data => {
            console.log('data de la response:', data)
            document.getElementById('codigo').value = data[0].codigo
            document.getElementById('nombre').value = `${data[0].nombre} ${data[0].apellido}`
            document.getElementById('carrera').value = data[0].carrera
            document.getElementById('semestre').value = data[0].semestre
            document.getElementById('correo').value = data[0].correo
            document.getElementById('foto').src = data[0].foto
        })
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