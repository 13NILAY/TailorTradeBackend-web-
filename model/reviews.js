const mongoose=require("mongoose");
const Schema =mongoose.Schema;

const reviewSchema =new Schema({
    name:{
        type:String,
    },
    date:{
        type:Date
    },
    description:{
        type:String
    },
    stars:{
        type:Number,
        max:5
    }
})

module.exports=mongoose.model('Review',reviewSchema);