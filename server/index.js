const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Usermodel = require('./models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const nodemailer = require('nodemailer');
const env = require("dotenv")

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methds:["GET","POST"],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)

app.post('/register',(req,res)=>{
    const{name,email,password}= req.body;
    bcrypt.hash(password,10)
    .then(hash => {
        Usermodel.create({name,email,password:hash})
        .then(user1=>res.json(user1))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))
})

app.post('/login',(req,res)=>{
    const{email,password}= req.body;
    Usermodel.findOne({email:email})
    .then(user => {
        if(user){
            const token = jwt.sign({email: user.email},"jwt-secret-key",{expiresIn : "1d"})
            res.cookie("token",token);
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    res.json("Sucess")
                }else{
                    res.json("the password is incorrect")
                }
            })
        } else {
            res.json("Account can't found")
        }
    })
})
const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    //console.log(token);
    if(!token){
        return res.json("No token found")
    }else{
        jwt.verify(token,"jwt-secret-key",(err,decode)=>{
            if(err) return res.json("Token is wrong");
            next();
        })
    }
}
app.get('/home',verifyUser,(req,res)=>{
    return res.json("Sucess")
})

app.post('/forgot',(req,res)=>{
    const {email} = req.body;
    Usermodel.findOne({email:email})
    .then(user => {
        if(!user){
            return res.send({Status : "User not found"})
        }
        const token = jwt.sign({id : user._id},"jwt-secret-key",{expiresIn : "1d"});
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'your email',
              pass: 'your password'
            }
          });
          
          var mailOptions = {
            from: 'your email',
            to: 'your email',
            subject: 'Reset password',
            text: `http://localhost:5173/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.send({Status : "Sucess"})
            }
          });
    })

})

app.listen(3005, ()=>{
    console.log("server started");
})