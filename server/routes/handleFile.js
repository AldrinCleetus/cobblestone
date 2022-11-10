

export const sendFile = (req,res)=>{
    console.log(req.files.file)
    res.sendStatus(200)
}

export const downloadFile = (req,res)=>{
    res.sendStatus(200).json({
        message: "File Downloading"
    })
}