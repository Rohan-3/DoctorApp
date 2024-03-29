const User = require('../models/user-registration-schema')
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req,res)=>{
    try {

       const {userName, email, phone, password} = req.body;

       const userData = await User.findOne({email});

       if (!userData) {

        const hashed_passowrd = await bcrypt.hash(password,10);

      await User.create({
            userName,
            email,
            phone,
            password:hashed_passowrd
        })

        const token = jwt.sign({
            userId:this._id,
            userName:userName,
            email: email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "1d"
        })

        const response = {
            msg:"USER ADDED",
            token
        };

        res.status(200).json(response);
       }else{
        res.status(400).json("USER ALREADY Exists !")
       }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {userRegister}