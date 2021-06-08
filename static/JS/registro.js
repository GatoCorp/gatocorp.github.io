const API = "https://gatocorpapi.herokuapp.com"
//const API = "http://localhost:8000"

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
    const foto = document.getElementById('imagen')
    const certifNac = document.getElementById('CertifNac')
    const titulo = document.getElementById('Titulo')
    const certifMed = document.getElementById('CertifMed')

    //let formdata = new FormData()
    //formdata.append(
    //    "codigo", codigo,
    //    "nombre", nombre,
    //    "apellido", apellido,
    //    "ci", parseInt(ci),
    //    "correo", correo,
    //    "carrera", carrera,
    //    "semestre", 1
    //    foto", foto,
    //    "certifNac" , certifNac,
    //    "titulo", titulo , 
    //    "certifMed", certifMed
    //)
    let data = {
        codigo: codigo,
        nombre: nombre,
        apellido: apellido,
        ci: parseInt(ci),
        correo: correo,
        carrera: carrera,
        semestre: 1, // quitar esta hardcodeada
        foto: foto.files[0],
        certifNac: certifNac.files[0],
        titulo: titulo.files[0],
        certifMed: certifMed.files[0]
    }
    console.log(data)
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

const defaultBtn = document.getElementById("imagen")
defaultBtn.addEventListener("change", agregarImagen)

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

async function handleArchivo(e) {
    const file = e.target.files[0]
    toBase64(file)
        .then(base64 => {
            console.log(base64)
            fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    Authorization: 'Client-ID 52851f0aeb3684f',
                },
                body: {
                    type: 'base64',
                    image: base64,
                    name: 'prueba-imgur.png',
                    title: 'imagen server',
                    description: 'agregar descripcion'
                }
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
        })
        .catch(e => console.log(e))

}

//const btnArchivo = document.getElementById('file')
//btnArchivo.addEventListener('change', handleArchivo)

//Validacion del formulario
const formulario = document.getElementById('formulario')
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
    switch(e.target.id) {
        case "nombre":
            validarCampo(expresiones.nombre,e.target,'nombre')
        break
        case "apellido":
            validarCampo(expresiones.nombre,e.target,'apellido')
        break
        case "ci":
            validarCampo(expresiones.telefono,e.target,'ci')
        break
        case "correo":
            validarCampo(expresiones.correo,e.target,'correo')
        break
    }
}
const validarCampo = (expresion,input,campo) => {
    if (expresion.test(input.value)){
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
inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    if(campos.nombre && campos.apellido && campos.ci && campos.correo){
        await agregarEstudiante()
        formulario.reset() 
    }else {
        document.getElementById('alerta').classList.add('alert-activo')
    }
})