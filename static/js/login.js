//const API = 'https://gatocorpapi.herokuapp.com'
const API = 'http://localhost:8000'
const ingresar = document.getElementById('login')

ingresar.addEventListener('click',verificar)
const hola='hola'
async function verificar(){
    try{
        const codEst = document.getElementById('codigo').value
        const contra = document.getElementById('contrasena').value
        let info
        await fetch(`${API}/login/${codEst}`)
        .then(response => response.json())
        .then(data => info = data)
        .catch(err => console.log(err))
        console.log(info)
        if (info == undefined || (info[0].contrasena != contra)){
            document.getElementById('alerta').classList.add('alert-activo')
        }
        else {
            document.cookie = "codigo=;max-age=0;"
            document.cookie = `${codEst}; path=student.html;`
            window.location.href = 'student.html'
        }
    }catch{
        document.getElementById('alerta').classList.add('alert-activo')
    }
}

// cerrar mensaje de error
document.getElementById('alert-button').addEventListener('click', (e) => {
    e.preventDefault() // bugaso
    document.getElementById('alerta').classList.remove('alert-activo')
})

