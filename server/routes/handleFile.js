import { uploadTest } from "../controllers/firebase.js"


export const sendFile = (req,res)=>{
    uploadTest(req.files.file.data,req.files.file.name)
    res.sendStatus(200)
}

export const downloadFile = (req,res)=>{
    res.sendStatus(200).json({
        message: "File Downloading"
    })
}