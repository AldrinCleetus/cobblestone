import axios from 'axios'

const download = 'http://localhost:4000/download'
const upload = 'http://localhost:4000/upload'

export const downloadFileFromServer = ()=>{
    axios.get(download)
  .then((response)=>{
    // handle success
    console.log(response);
  })
}

export const uploadFileToServer = (data)=>{
    console.log('sending file')

    axios.post(upload,data,{
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    })
}