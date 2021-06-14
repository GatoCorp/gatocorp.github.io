const API = 'https://gatocorpapi.herokuapp.com'
//const API = "http://localhost:8000" //comentar despues de usar

const ingresar = document.getElementById('login')

ingresar.addEventListener('click', verificar)
async function verificar() {
    try {
        const codEst = document.getElementById('codigo').value
        const contra = document.getElementById('contrasena').value
        await fetch(`${API}/login/estudiante`, {
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
                document.cookie = ";max-age=0;"
                document.cookie = `${codEst}; path=student.html;`
                window.location.href = 'student.html'
              }
              else {
                document.getElementById('alerta').classList.add('alert-activo')
              }
            })
            .catch(error => console.log(error))
    } catch {
        document.getElementById('alerta').classList.add('alert-activo')
    }
}

// cerrar mensaje de error
document.getElementById('alert-button').addEventListener('click', (e) => {
    e.preventDefault() // bugaso
    document.getElementById('alerta').classList.remove('alert-activo')
})

