import express from "express";
import bodyParser from "body-parser";

import { uploadFile } from "./controllers/firebase.js";

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/',(req,res)=>{
    res.send("hello")
})

app.post('/upload', uploadFile)


app.listen(4000, () => console.log('Server listening on port 4000'));