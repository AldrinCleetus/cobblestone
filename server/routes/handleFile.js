import { downloadFileFromFirebase, uploadFiletoFirebase } from "../controllers/firebase.js"


export const sendFile = (req,res)=>{

    const newFileCode = uploadFiletoFirebase(req.files.file.data,req.files.file.name,req.files.file.mimetype)
    res.json({
        data:newFileCode
    })
}

export const downloadFile = async(req,res)=>{
    const url = await downloadFileFromFirebase(req.body.code)

    if(url === '404'){
        console.log("File missing")
        res.sendStatus(404)
    }else{
        res.json({
            data: url
        })
    }
}