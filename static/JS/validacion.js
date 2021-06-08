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

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    if(campos.nombre && campos.apellido && campos.ci && campos.correo){
        formulario.reset()
    }
})