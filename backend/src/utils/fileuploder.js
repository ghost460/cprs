import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
cloudinary.config({ 
    cloud_name: process.env.CLOUDY_COLUD_NAME, 
    api_key: process.env.CLOUDY_API_KEY, 
    api_secret: process.env.CLOUDY_API_SECTET
});

const uploadoncloud=async(filepath)=>{
    try{
        if(!filepath) return"file path could not found"
        //file uploader
       const responce =await cloudinary.uploader.upload(filepath,{
        resource_type:"auto"
       })
       //file upload successfully
       console.log("file upload successfully",responce.url)
       return responce;


    } catch(error){
        fs.unlinkSync(filepath) // remove local file form server if upload fail
        return null;

    }
}
export {uploadoncloud}