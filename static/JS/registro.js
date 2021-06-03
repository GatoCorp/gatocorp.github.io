const carreras = "https://gatocorpapi.herokuapp.com/carreras"
const est = "https://gatocorpapi.herokuapp.com/estudiantes"
document.addEventListener('DOMContentLoaded',function(){
    fetch(carreras,{method : 'GET'})
    .then(response => response.json())
    .then(data => {
        let res = document.querySelector('#carrera');
        res.innerHTML='';
        for(let item of data){
            res.innerHTML +=`
                <option>${item.nombre_completo}</option>
            `
        }
    }).catch(err=>console.log(err));

    document.getElementById('semestre').setAttribute('value','1')

})
const  defaultBtn = document.querySelector("#default-btn")
const img = document.querySelector("img")
defaultBtn.addEventListener("change",function(){
    const file = this.files[0]
    if(file){
        const reader = new FileReader()
        reader.onload = function(){
            const result = reader.result
            img.src = result
            document.querySelector(".wrapper").classList.add("active")
        }
        reader.readAsDataURL(file)
    }
})

const btnenviar = document.querySelector("#btnenviar")
btnenviar.addEventListener('click',async function(){
    async function fetchCodigos(){
        const response = await fetch(est,{method : 'GET'})
        const datos = await response.json()
        return datos
    }
    let data = await fetchCodigos()
    const codigo = generarcodigo(data)
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const ci = document.getElementById('ci').value
    const correo = document.getElementById('correo').value
    const carrera = document.getElementById('carrera').value
    const semestre = document.getElementById('semestre').value
    data = {
        codigo : codigo,
        nombre : nombre,
        apellido : apellido,
        ci : parseInt(ci,10),
        correo : correo,
        carrera : carrera,
        semestre : parseInt(semestre,10)
    }
    fetch(est,{method : 'POST',  headers:{
        'Content-Type': 'application/json'
      },body : JSON.stringify(data)})
    .then(response => response.json())
    .then(data => {
            console.log(data)
        }
    ).catch(err=>console.log(err));
})

function generarcodigo(data) {
    const cod1 = Math.floor((Math.random() * (9000 - 7000 + 1)) + 7000)
    const cod2 = Math.floor((Math.random() * (9 - 1 + 1)) + 1)
    const codigo = `S${cod1}-${cod2}` 
    for (i in data){
        if(i.codigo == codigo)
            return generarcodigo(data)
    }
    return codigo
}
