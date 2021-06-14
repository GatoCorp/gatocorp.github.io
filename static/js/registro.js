const API = "https://gatocorpapi.herokuapp.com"
// const API = "http://localhost:8000" comentar despues de usar

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

function generarLinkImagen(file) {
    let data = new FormData()
    data.append('image', file)
    data.append('expiration', 604800) // 3600 seg = 1 hora, 604800 seg = 1 semana
    let settings = {
        url: "https://api.imgbb.com/1/upload?key=96966ef8138bc841dfcf76c97b15aea0",
        method: "POST",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: data
    }

    return new Promise((resolve, reject) => {
        $.ajax(settings).then(response => {
            response = JSON.parse(response)
            resolve(response.data['url'])
        })
    })
    // let response = await $.ajax(settings)
    // response = JSON.parse(response)
    // return response.data['url']
}

const getArchivoById = (id) => document.getElementById(id).files[0]
function agregarEstudiante() {
    mostrarModal()

    // aqui leo los archivos
    let foto = getArchivoById('foto')
    let certifNac = getArchivoById('certifNac')
    let titulo = getArchivoById('titulo')
    let certifMed = getArchivoById('certifMed')
    //  y genero los links de imagen simultaneamente
    let p1 = generarLinkImagen(foto)
    let p2 = generarLinkImagen(certifNac)
    let p3 = generarLinkImagen(titulo)
    let p4 = generarLinkImagen(certifMed)

    let p5 = generarNuevoCodigo()
    // una vez tenga todos los links y el codigo de estudiante
    Promise.all([p1, p2, p3, p4, p5])
        .then(values => {
            let data = {
                codigo: values[4],
                nombre: document.getElementById('nombre').value,
                apellido: document.getElementById('apellido').value,
                ci: parseInt(document.getElementById('ci').value),
                correo: document.getElementById('correo').value,
                carrera: document.getElementById('carrera').value,
                semestre: 1, // la hardcodeada is real
                foto: values[0],
                certificado_nacimiento: values[1],
                titulo_bachiller: values[2],
                certificado_medico: values[3]
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
                .then(data => {
                    // aqui ya tengo la respuesta del servidor en JSON
                    cambiarModal()
                    console.log(data)
                    document.getElementById('formulario').reset()
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}

/**
 * Validación de los campos del formulario
 */

const inputs = document.querySelectorAll('#formulario input')
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    apellido: false,
    ci: false,
    correo: false
}

const todosLosCamposSonValidos = () => (campos.nombre && campos.apellido && campos.ci && campos.correo)

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
// document.getElementById('texto-modal').innerHTML = 'cuisaaa'
const validarCampo = (expresion, input, campo) => {
    const elemento1 = document.getElementById(`div__${campo}`)
    const elemento2 = document.getElementById(input.id)
    if (expresion.test(input.value)) {
        elemento1.classList.remove('has-danger')
        elemento1.classList.add('has-success')
        elemento2.classList.remove('is-invalid')
        elemento2.classList.add('is-valid')
        campos[campo] = true
    } else {
        elemento1.classList.add('has-danger')
        elemento1.classList.remove('has-success')
        elemento2.classList.add('is-invalid')
        elemento2.classList.remove('is-valid')
        campos[campo] = false
    }
}

inputs.forEach(input => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

function tengoTodosLosArchivos() {
    let foto = getArchivoById('foto')
    let certifNac = getArchivoById('certifNac')
    let titulo = getArchivoById('titulo')
    let certifMed = getArchivoById('certifMed')
    // esto retorna true si existen los 4 archivos
    return (foto && certifNac && titulo && certifMed)
}

function mostrarAlertError() {
    document.getElementById('alerta').classList.add('alert-activo')
    window.scrollTo(0, 0)
}

function mostrarModal() {
    document.getElementById('modal').style.display = 'block'
    document.getElementById('modal-loading').style.display = 'block'
    document.getElementById('texto-modal').innerHTML = 'Cargando datos al sistema...'
    document.getElementById('modal-loaded').style.display = 'none'
}

function cambiarModal() {
    document.getElementById('modal-loading').style.display = 'none'
    document.getElementById('texto-modal').innerHTML = 'Se cargo su información correctamente'
    document.getElementById('modal-loaded').style.display = 'block'
}
/**
 * Acciones globales o que se ejecutan tras cargar la página
 */

fetch(`${API}/carreras_aux`)
    .then(response => response.json())
    .then(data => llenarSelect(data))
    .catch(err => console.log(err))

// cerrar mensaje de error
document.getElementById('alert-button').addEventListener('click', (e) => {
    e.preventDefault() // bugaso
    document.getElementById('alerta').classList.remove('alert-activo')
})

// cerrar modal
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none'
})

// cambiar la imagen y quitar el placeholder
document.getElementById('foto').addEventListener('change', (e) => {
    const img = document.getElementById('img')
    const file = e.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = function () {
            img.src = reader.result
            document.querySelector('.content').style.display = 'none'
        }
        reader.readAsDataURL(file)
    }
})

// envio del formulario
document.getElementById('formulario').addEventListener('submit', (e) => {
    e.preventDefault()
    if (todosLosCamposSonValidos() && tengoTodosLosArchivos()) {
        document.getElementById('alerta').classList.remove('alert-activo') // pa no pelarle
        agregarEstudiante()
    } else {
        mostrarAlertError()
    }
})
