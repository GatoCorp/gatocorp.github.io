const API = "https://gatocorpapi.herokuapp.com"
//const API = 'http://localhost:8000' //comentar despues de usar

//codigo del estudiante
const codigo = document.cookie

//expresiones regulares y campos del formulario
const expresiones = {
    password: /^.{6,20}$/, // 4 a 12 digitos.
}
const campos = {
    contra: false
}

//valida si el formulario esta llenado correctamente
const validarFormulario = (e) => {
    switch (e.target.id) {
        case "contra":
            validarCampo(expresiones.password, e.target, 'contra')
            validarContrasena()
            break
        case "contra2":
            validarContrasena()
            break
    }
}

//valida los input con las expresiones regulares
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

//verifica si las 2 contraseñas son iguales
const validarContrasena = () => {
    const contra1 = document.getElementById('contra')
    const contra2 = document.getElementById('contra2')
    const elemento = document.getElementById('div__contra2')
    if (contra2.value == contra1.value) {
        elemento.classList.remove('has-danger')
        elemento.classList.add('has-success')
        contra2.classList.remove('is-invalid')
        contra2.classList.add('is-valid')
        campos['contra'] = true
    } else {
        elemento.classList.add('has-danger')
        elemento.classList.remove('has-success')
        contra2.classList.add('is-invalid')
        contra2.classList.remove('is-valid')
        campos['contra'] = false
    }
}

const inputs = document.querySelectorAll('#formulario input')

//verifica los cambios en los input
inputs.forEach(input => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

// cerrar mensaje de error
document.getElementById('alert-button').addEventListener('click', (e) => {
    e.preventDefault() // bugaso
    document.getElementById('alerta').classList.remove('alert-activo')
})

//mostrar mensaje de error
function mostrarAlertError() {
    document.getElementById('alerta').classList.add('alert-activo')
    window.scrollTo(0, 0)
}

//comunica con la API y realiza la actualizacion
function actualizar() {
    let data = {
        codigo: codigo,
        nuevacontra: document.getElementById('contra').value,
    }
    fetch(`${API}/actualizarcontra`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById('formulario').reset()
        })
        .catch(error => console.log(error))
}

// envio del formulario
document.getElementById('formulario').addEventListener('submit', (e) => {
    e.preventDefault()
    if (campos.contra) {
        document.getElementById('alerta').classList.remove('alert-activo') // pa no pelarle
        actualizar()
    } else {
        mostrarAlertError()
    }
})