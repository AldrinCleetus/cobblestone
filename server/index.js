import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";



import { downloadFile, sendFile } from "./routes/handleFile.js";

const app = express()

app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/upload', sendFile)
app.get('/download', downloadFile)


app.listen(4000, () => console.log('Server listening on port 4000'));