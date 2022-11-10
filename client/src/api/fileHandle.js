import axios from 'axios'

const download = 'http://localhost:4000/download'
const upload = 'http://localhost:4000/upload'

export const downloadFileFromServer = async (UID)=>{

    let url = ''
    return axios.post(download,{
        code: UID
    })
  .then((response)=>{
    // handle success
    url = response.data.data
    return url
}).catch(e=>{
    throw 404
})

  
}

export const uploadFileToServer = (data)=>{

    return axios.post(upload,data,{
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    }).then((response)=>{
        return response.data.data
    })
}

