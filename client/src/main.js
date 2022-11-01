import "./styles.css";

const shareArea = document.querySelector('.share')
const input = shareArea.querySelector('#fileInput')
const browseButton = shareArea.querySelector('#browseButton')
const shareButton = shareArea.querySelector('#shareButton')
const removeButton = shareArea.querySelector('#removeButton')
const shareText = shareArea.querySelector('h4')
const fileIcon = shareArea.querySelector('.fileIcon')

const fileContainer = shareArea.querySelector('.fileContainer')
const fileName = fileContainer.querySelector('.fileName')
const fileSize = fileContainer.querySelector('.fileSize')


let uploadedFile;
let hasFile = false



const acceptedFileFormat= ['application/pdf',
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

const formatBytes = (bytes, decimals = 2)=> {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const isAccepted = ()=>{
    const fileType = uploadedFile.type

    if( acceptedFileFormat.includes(fileType)){
        return true
    }
    else{
        return false
    }
}

const displayFile = ()=>{
    hasFile = true
    shareArea.classList.add("active")
    shareText.classList.add('hidden')
    shareButton.classList.remove('hidden')
    removeButton.classList.remove('hidden')
    browseButton.classList.add('hidden')
    fileIcon.classList.add('fa-beat')
    fileContainer.classList.remove('hidden')
    fileName.textContent = uploadedFile.name
    fileSize.textContent = formatBytes(uploadedFile.size)

}

const cancelFile = ()=>{
    hasFile = false
    shareText.classList.remove('hidden')
    shareButton.classList.add('hidden')
    removeButton.classList.add('hidden')
    browseButton.classList.remove('hidden')
    fileIcon.classList.remove('fa-beat')
    fileContainer.classList.add('hidden')

}

const verifyAndUpdate = ()=>{
    if(isAccepted()){
        console.log('file uploaded')
        hasFile = true
        displayFile()
        
    }else{
        uploadedFile = []
        hasFile = false
        console.log('file denied')
        shareArea.classList.remove("active")
    }
}

browseButton.onclick = ()=>{
    input.click()
}

removeButton.onclick = cancelFile

input.addEventListener('change',()=>{
    uploadedFile = input.files[0]
    verifyAndUpdate()

    
})

shareArea.addEventListener('dragover', e=>{
    e.preventDefault();
    shareArea.classList.add("active")
    fileIcon.classList.add('fa-bounce')


})

shareArea.addEventListener('dragleave', e=>{
    e.preventDefault();
    shareArea.classList.remove("active")
    fileIcon.classList.remove('fa-bounce')

})

shareArea.addEventListener('drop', e =>{
    e.preventDefault();
    uploadedFile = e.dataTransfer.files[0]
    verifyAndUpdate()
    
})