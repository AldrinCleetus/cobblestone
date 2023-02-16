import axios from 'axios'



const download =  'https://cobblestone-production.up.railway.app/download' 
const upload = 'https://cobblestone-production.up.railway.app/upload'

console.log(download)

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
    }).catch(err => {
        console.log(err)
    })
}

