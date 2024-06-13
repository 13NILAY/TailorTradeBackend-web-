const mongoose=require('mongoose');
const Schema=mongoose.Schema

const orderSchema=new Schema({
    outfit_type:{
        type:String,
        enum:["Dress","Blouse","Skirt","Pants","Other"],
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    product_name:{
        type:String
    },
    height:{
        type:Number
    },
    width:{
        type:Number
    },
    instructions:{
        type:String
    },
    urgent:{
        type:Boolean
    },
    delivery_date:{
        type:Date
    },
    trial_date:{
        type:Date
    },
    cloth_images:{
        type:[String]
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client'
    },
    tailor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tailor'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    total_amount: {
        type: Number,
        required: true
    },
    status:{
        type:String,
        default:"Pending"
    }
    // advance_amount: {
    //     type: Number,
    //     // required: true
    //  },
    // balance_due: {
    //     type: Number,
    //     // required: true
    // }
}, {
    timestamps: true,
});

module.exports=mongoose.model('Order',orderSchema)