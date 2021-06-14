const API = "https://gatocorpapi.herokuapp.com"
//const API = "http://localhost:8000" //comentar despues de usar
const codigo = document.cookie
console.log(codigo)
document.addEventListener('DOMContentLoaded', async function () {
    await fetch(`${API}/estudiantes/${codigo}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('codigo').value = data[0].codigo
            document.getElementById('nombre').value = `${data[0].nombre} ${data[0].apellido}`
            document.getElementById('carrera').value = data[0].carrera
            document.getElementById('semestre').value = data[0].semestre
            document.getElementById('correo').value = data[0].correo
            document.getElementById('foto').src = data[0].foto
        })
        .catch(err => console.log(err))
})