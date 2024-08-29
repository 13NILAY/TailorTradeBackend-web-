const {signup}=require('../controller/user')
const{log,getuser,deluser,updateuser,getUserByEmail,getUserById}=require('../controller/user')
const authenticatetoken=require('../middleware/authenticate')
const {handleRefreshTokenUser} =require('../controller/authC');
const express = require('express')
const router = express.Router()

router.post('/signup',signup);
router.post('/login',log);
router.get('/refreshToken',handleRefreshTokenUser);
router.get('/get',getuser);
router.post('/getUser',getUserByEmail);
router.get("/:id",getUserById);
router.delete('/delete',authenticatetoken,deluser);
router.put('/update',updateuser);

module.exports=router