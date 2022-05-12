import User from "../models/UserModel.js";
import Searches from "../models/SearchModel.js";
//const mongoose = require('mongoose');
//import db from "../config/Database.js"
//import bcrypt from "bcrypt";
import mongoose from "mongoose"
import jwt from "jsonwebtoken";
//const User = require("../models/UserModel")
//var Searches= mongoose.model('Searches');

export const getUsers = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { name, email } = req.body;
    // if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    //const salt = await bcrypt.genSalt();
    //const hashPassword = await bcrypt.hash(password, salt);
    const dbUser= new User({
        name:name,
        email:email,
        refresh_token: ""
    })    
    try {
        // await User.save({
        //     name: name,
        //     email: email,
        // });
        dbUser.save();
        res.json({msg: "Registration Successful"});
        
    } catch (error) {
        console.log(error);
    }
}
 

export const Login = async(req, res) => {
    try {
        
        const email= req.body.email;
        await User.findOne({email:email}).then(
            dbUser=>{
                const payload={
                    userId: dbUser._id,
                    name: dbUser.name,
                    email: dbUser.email,
                    refresh_token:dbUser.refresh_token
                }
                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: '15s'
                });
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn: '1d'
                });
                //const filter = { _id: payload.userId };
                //const update = { refresh_token: refreshToken };
                User.findByIdAndUpdate(payload.userId, { refresh_token: refreshToken }, function(err, data){
                    if(err){

                    }
                    else{

                    }
                });
                
                res.cookie('refreshToken', refreshToken,{
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.json({ accessToken });
            }
        )
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({refresh_token: refreshToken});
    if(!user) return res.sendStatus(204);
    const userId = user._id;
    await User.findByIdAndUpdate(userId, {refresh_token: ""});
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const AddAsin= async(req, res)=>{
    const asin = req.body.asin;
    let ts = Date.now();
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    User.findOne({refresh_token: refreshToken}).then(
        dbSearch=>{
            const payload={
                userId: dbSearch._id,
                name: dbSearch.name,
                email: dbSearch.email
            }
            const email=payload.email;
            const dbSearch1= new Searches({
                email: email,
                asin:asin,
                time: ts
            }) 
            try {
                dbSearch1.save();
                res.json({msg: "Added Successful"});
                
            } catch (error) {
                console.log(error);
            }
        }
    );
    //const email=payload.email;
    // const dbSearch= new Searches({
    //     email: email,
    //     asin:asin,
    //     time: ts
    // }) 
    // try {
    //     dbSearch.save();
    //     res.json({msg: "Added Successful"});
        
    // } catch (error) {
    //     console.log(error);
    // }
}