const User=require("../model/user")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const signup=async(req,res)=>{
    try {
        console.log(req.body);
        const user=new User({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            mobileno:req.body.mobileno
        })
        user.password=await bcrypt.hash(user.password,10)
        const savedUserData=await user.save();
        // console.log(savedUserData);
        res.status(200).json({
            success:true
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            error:error,
        })
    }
}

const log= async(req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password

        const user=await User.findOne({email:email})
        console.log(user);
        if(user){
            const validpassword= await bcrypt.compare(password, user.password)
            console.log(validpassword);
            if(validpassword){
                const accessToken=jwt.sign(
                    {email:user.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: "1d"}
                );
                const refreshToken =jwt.sign(
                    {email:user.email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: "1y"}
                )
                //Saving refresh Token with current user
                const u1= await User.findByIdAndUpdate(user._id,{refreshToken:refreshToken})
                console.log(u1);
                const u2=await User.findByIdAndUpdate(user._id);
                res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge:24*60*60*1000});
                res.json({accessToken,u2});
                
            }else{
                return res.send("Incorrect")
            }
        }
        else{
            return res.status(404).send("User not found")
        }

    }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getuser=async(req,res)=>{
    try {
        const user=await User.find()
        console.log(user);
        
        res.json(user)
    } catch (error) {
        res.send("Error while fetching users")
    }
}
const deluser=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id)
        const u1=await user.deleteOne()
        res.send("User deleted successfully")
    } catch (error) {
        res.status(500).send("Error in deleting user")
    }
}
const updateuser=async(req,res)=>{
    try {
        console.log(req.body);
        // const user=await User.findByIdAndUpdate(req.user._id,req.body,{ new: true })
        const user=await User.findOneAndUpdate({email:req.body.formData1.email},req.body.formData1,{new:true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json("Upadation not done")
    }
}
const getUserByEmail = async (req, res) => {
    try {
        console.log(req.body.email);
        const user = await User.findOne({email:req.body.email});
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports={
    signup,
    log,getuser,deluser,updateuser,getUserByEmail,getUserById
}