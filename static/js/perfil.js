const API = 'http://localhost:8000'
document.addEventListener('DOMContentLoaded',async function(){
    await fetch(`${API}/estudiantes/S8419-4`)
    .then(response => response.json())
    .then(data => {        
        console.log(data)
        document.getElementById('codigo').value = data[0].codigo
        document.getElementById('nombre').value = data[0].nombre
        document.getElementById('carrera').value = data[0].carrera
        document.getElementById('semestre').value = data[0].semestre
        document.getElementById('correo').value = data[0].correo
        document.getElementById('foto').src = data[0].foto
    })
    .catch(err => console.log(err))
})