import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";



import { downloadFile, sendFile } from "./routes/handleFile.js";

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://cobblestone-production.up.railway.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.post('/upload', sendFile)
app.post('/download', downloadFile)


app.listen(process.env.PORT, () => console.log('Server listening on port 4000'));