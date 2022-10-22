const shareArea = document.querySelector('.share')
const input = shareArea.querySelector('input')
const button = shareArea.querySelector('button')

let uploadedFile;


const acceptedFileFormat= ['application/pdf',
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

const isAccepted = ()=>{
    const fileType = uploadedFile.type

    if( acceptedFileFormat.includes(fileType)){
        return true
    }
    else{
        return false
    }
}

button.onclick = ()=>{
    input.click()
}

input.addEventListener('change',()=>{
    uploadedFile = this.files[0]

    console.log(uploadedFile)
})

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
    uploadedFile = e.dataTransfer.files[0]

    
    if(isAccepted()){
        console.log('file uplaoded')
    }else{
        console.log('file denied')
    }
    
})