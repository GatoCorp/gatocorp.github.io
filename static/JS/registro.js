const API = "https://gatocorpapi.herokuapp.com"
//const API = "http://localhost:8000"

function llenarSelect(data) {
    let res = document.getElementById('carrera')
    res.innerHTML = ''
    for (let item of data)
        res.innerHTML += `<option value="${item.nombre}">${item.nombre_completo}</option>`
}

async function fetchCodigos() {
    const response = await fetch(`${API}/codigos_aux`)
    const datos = await response.json()
    return datos
}

function generarCodigo() {
    const cod1 = Math.floor((Math.random() * (9000 - 7000 + 1)) + 7000)
    const cod2 = Math.floor((Math.random() * (9 - 1 + 1)) + 1)
    return `S${cod1}-${cod2}`
}

async function generarNuevoCodigo() {
    let codigos = await fetchCodigos()
    let codigoNuevo
    let existeOtro
    while (true) {
        codigoNuevo = generarCodigo()
        existeOtro = false

        for (i in codigos) {
            if (i.codigo == codigoNuevo) {
                existeOtro = true
                break
            }
        }
        if (existeOtro)
            continue
        else
            return codigoNuevo
    }
}

async function generarLinkImagen(file) {
    let data = new FormData()
    data.append('image', file)
    data.append('expiration', 60) // 3600 seg = 1 hora
    let settings = {
        "url": "https://api.imgbb.com/1/upload?key=96966ef8138bc841dfcf76c97b15aea0",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": data
    }

    let response = await $.ajax(settings)
    response = JSON.parse(response)
    return response.data['url']
}

// const defaultBtn = document.getElementById('foto')
// defaultBtn.addEventListener('change', generarLinkImagen)

async function agregarEstudiante() {
    // archivos
    let foto = document.getElementById('foto').files[0]
    let certifNac = document.getElementById('certifNac').files[0]
    let titulo = document.getElementById('titulo').files[0]
    let certifMed = document.getElementById('certifMed').files[0]

    let data = {
        codigo: await generarNuevoCodigo(),
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        ci: parseInt(document.getElementById('ci').value),
        correo: document.getElementById('correo').value,
        carrera: document.getElementById('carrera').value,
        semestre: 1, // la hardcodeada is real
        foto: await generarLinkImagen(foto),
        certifNac: await generarLinkImagen(certifNac),
        titulo: await generarLinkImagen(titulo),
        certifMed: await generarLinkImagen(certifMed)
    }

    console.log(JSON.stringify(data, null, 4))
    
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

/**
 * Validación de los campos del formulario
 */
const inputs = document.querySelectorAll('#formulario input')
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    apellido: false,
    ci: false,
    correo: false
}

const validarFormulario = (e) => {
    switch (e.target.id) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre')
            break
        case "apellido":
            validarCampo(expresiones.nombre, e.target, 'apellido')
            break
        case "ci":
            validarCampo(expresiones.telefono, e.target, 'ci')
            break
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo')
            break
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`div__${campo}`).classList.remove('has-danger')
        document.getElementById(input.id).classList.remove('is-invalid')
        document.getElementById(`div__${campo}`).classList.add('has-success')
        document.getElementById(input.id).classList.add('is-valid')
        campos[campo] = true
    } else {
        document.getElementById(`div__${campo}`).classList.add('has-danger')
        document.getElementById(input.id).classList.add('is-invalid')
        document.getElementById(`div__${campo}`).classList.remove('has-success')
        document.getElementById(input.id).classList.remove('is-valid')
        campos[campo] = false
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

/**
 * Envío del formulario
 */
const formulario = document.getElementById('formulario')
formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (campos.nombre && campos.apellido && campos.ci && campos.correo) {
        await agregarEstudiante()
        formulario.reset()
    } else {
        document.getElementById('alerta').classList.add('alert-activo')
    }
})

fetch(`${API}/carreras_aux`)
    .then(response => response.json())
    .then(data => llenarSelect(data))
    .catch(err => console.log(err))

document.getElementById('foto').addEventListener('change', (e) => {
    const img = document.getElementById('img')
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = function () {
            const result = reader.result
            img.src = result
            document.querySelector('.content').style.display = 'none'
        }
        reader.readAsDataURL(file)
    }
})