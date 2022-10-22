const shareArea = document.querySelector('.share')
const input = shareArea.querySelector('input')
const button = shareArea.querySelector('button')

button.onclick = ()=>{
    input.click()
}

// input.addEventListener('change',()=>{
//     console.log('huh')
// })

shareArea.addEventListener('dragover', e=>{
    e.preventDefault();
    shareArea.classList.add("active")

})

shareArea.addEventListener('dragleave', e=>{
    e.preventDefault();
    shareArea.classList.remove("active")

})

shareArea.addEventListener('drop', e =>{
    e.preventDefault();
    console.log("file added")
})