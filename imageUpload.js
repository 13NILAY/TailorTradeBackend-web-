import axios from "axios"
import path from "path"
import fs from "fs"
import { User } from "../models/user.js";
import multer from "multer";
import { upload } from "../middlewares/multer.js";
import { uploadOnCloudinary,deleteOnCloudinary } from "../utils/cloudinary.js";



const uploadFiles=async(req,res)=>{
    
        try{
            
            const {email} =req.body;
            const user=await User.findOne({email:email});
             if(user.role===2001){
                const response=await uploadOnCloudinary(req.files?.NewFile[0]?.path);
            
                const newFile=[{
                    fileName:response.original_filename,
                    fileURL:response.secure_url,
                    publicID:response.public_id,
                    userId:user._id,
                    department: user.department,
                    size:response.bytes
                }];
                File.insertMany(newFile).then((res)=>{console.log(res);});
                res.status(200).json("File Successfully Uploaded")
            }
    }
    catch(err){
            console.log(err);
            res.status(500).json(err);
        }
    }  


export {uploadFiles};