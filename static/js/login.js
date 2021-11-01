const API = 'https://gatocorpapi.herokuapp.com'

const ingresar = document.getElementById('login')

ingresar.addEventListener('click', verificar)
function verificar() {
  const codEst = document.getElementById('codigo').value
  const contra = document.getElementById('contrasena').value
  fetch(`${API}/login/estudiante`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usuario: codEst,
      contrasena: contra
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.correcto) {
        document.cookie = `codigo=${codEst};`
        window.location.href = 'perfil.html'
      }
      else {
        document.getElementById('alerta').classList.add('alert-activo')
      }
    })
    .catch(error => console.log(error))

}

// cerrar mensaje de error
document.getElementById('alert-button').addEventListener('click', (e) => {
  e.preventDefault() // bugaso
  document.getElementById('alerta').classList.remove('alert-activo')
})

