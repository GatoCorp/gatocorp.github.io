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