import { downloadFileFromServer, uploadFileToServer } from "./api/fileHandle";
import "./styles.css";

const shareArea = document.querySelector('.share')
const input = shareArea.querySelector('#fileInput')
const browseButton = shareArea.querySelector('#browseButton')
const shareButton = shareArea.querySelector('#shareButton')
const removeButton = shareArea.querySelector('#removeButton')
const downloadButton = document.querySelector('#downloadButton')
const downloadInput = document.querySelector('#UID')
const shareText = shareArea.querySelector('h4')
const fileIcon = shareArea.querySelector('.fileIcon')
const link = document.querySelector("#downloadlink")
const fileContainer = shareArea.querySelector('.fileContainer')
const fileName = fileContainer.querySelector('.fileName')
const fileSize = fileContainer.querySelector('.fileSize')
const fileCode = document.querySelector('.filecode')
const mainCode = document.querySelector('#main-code')
const shareSpinner = document.querySelector('.sharespinner')
const downloadSpinner = document.querySelector('.downloadspinner')

const modal = document.querySelector('.modal')

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
    const currentFileSize = uploadedFile.size


    if( acceptedFileFormat.includes(fileType) && currentFileSize < 9999999){
        return true
    }
    else{
        return false
    }
}

const displayFileCode = (code)=>{
    mainCode.textContent = code
    shareButton.classList.add('hidden')
    fileCode.classList.remove("hidden")
}

const showModal = (timer,message)=>{
    modal.textContent = message
    modal.classList.add("active")
    setTimeout(() => {
        modal.classList.remove("active")
    }, timer);
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
    fileCode.classList.add("hidden")

}

const verifyAndUpdate = ()=>{
    if(isAccepted()){
        console.log('file uploaded')
        hasFile = true
        displayFile()
        
    }else{
        uploadedFile = []
        hasFile = false
        showModal(5000,"Unsupported file type or File too large. Max (10 MB)")
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

shareButton.onclick = async ()=>{
    shareSpinner.classList.remove('hidden')
    let formData = new FormData();
    let data = uploadedFile
    formData.append("file", data);
    uploadFileToServer(formData).then((code)=>{
        shareSpinner.classList.add('hidden')
        displayFileCode(code)
    })
   
}

downloadButton.onclick = async ()=>{
    if(downloadInput.value.length < 6){
        return
    }
    downloadSpinner.classList.remove('hidden')

    downloadFileFromServer(downloadInput.value).then((url)=>{
        downloadSpinner.classList.add('hidden')
        link.href = url
        link.download = "file"
        link.click()
    }).catch(err =>{
        showModal(5000,"File not found!")
        console.log(err)
    })
    

    
    
    
    

    
}

