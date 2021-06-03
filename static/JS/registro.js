const API = "https://gatocorpapi.herokuapp.com"

function llenarSelect(data) {
    let res = document.getElementById('carrera')
    res.innerHTML = ''
    for (let item of data)
        res.innerHTML += `<option>${item.nombre_completo}</option>`
}

async function fetchCodigos() {
    const response = await fetch(`${API}/estudiantes`)
    const datos = await response.json()
    return datos
}

// cambiar esto xd
function generarcodigo(data) {
    const cod1 = Math.floor((Math.random() * (9000 - 7000 + 1)) + 7000)
    const cod2 = Math.floor((Math.random() * (9 - 1 + 1)) + 1)
    const codigo = `S${cod1}-${cod2}`
    for (i in data) {
        if (i.codigo == codigo)
            return generarcodigo(data)
    }
    return codigo
}

async function agregarEstudiante() {
    let codigos = await fetchCodigos()
    const codigo = generarcodigo(codigos)

    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const ci = document.getElementById('ci').value
    const correo = document.getElementById('correo').value
    const carrera = document.getElementById('carrera').value

    let data = {
        codigo: codigo,
        nombre: nombre,
        apellido: apellido,
        ci: parseInt(ci),
        correo: correo,
        carrera: carrera,
        semestre: 1 // quitar esta hardcodeada

    }
    fetch(`${API}/estudiantes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

function agregarImagen() {
    const img = document.querySelector("img")
    const file = this.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = function () {
            const result = reader.result
            img.src = result
            document.querySelector(".wrapper").classList.add("active")
        }
        reader.readAsDataURL(file)
    }
}

fetch(`${API}/carreras`)
    .then(response => response.json())
    .then(data => llenarSelect(data))
    .catch(err => console.log(err))

const btnenviar = document.getElementById('btnenviar')
btnenviar.addEventListener('click', agregarEstudiante)

const defaultBtn = document.getElementById("default-btn")
defaultBtn.addEventListener("change", agregarImagen)
