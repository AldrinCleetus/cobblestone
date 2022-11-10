import * as dotenv from 'dotenv' 
dotenv.config()

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes,getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { generateUID } from './uniqueId.js';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECT_id,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSAGING_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

const deleteEverything = ()=>{
  const storageRef = ref(storage,'/')
    listAll(storageRef).then((listResults) => {
    const promises = listResults.items.map((item) => {
      return deleteObject(item)
    });
    Promise.all(promises);
  });
}


export const uploadFiletoFirebase = (file,name,filetype)=>{
    const metadata = {
        contentType: filetype,
      };

      const newName = generateUID()
    const storageRef = ref(storage,newName);
    uploadBytes(storageRef, file,metadata).then((snapshot) => {
  }).catch(e =>{
    switch (e.code) {
      case 'storage/unauthorized':
        console.log("Interesting")
        break;
      case 'storage/quota-exceeded':
        deleteEverything()
        break;
      default:
        break;
    }
  })

  return newName
}

export const downloadFileFromFirebase = async (code)=>{
    
    let downloadableURL = ''
    const storageRef = ref(storage,code)
    await getDownloadURL(storageRef)
    .then((url) => {
        downloadableURL = url
  })
  .catch((error) => {
    downloadableURL = '404'
  });

  return downloadableURL

  

}