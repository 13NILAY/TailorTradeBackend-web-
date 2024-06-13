const mongoose=require('mongoose');
const Schema=mongoose.Schema

const clientSchema=new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },email:{
        type:String
    },
    phoneno:{
        type:Number,
        // unique:true,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    pic:{
        type:[String]
    }
});

module.exports=mongoose.model('Client',clientSchema)