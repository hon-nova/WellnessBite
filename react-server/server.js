const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const {Pool} = require("pg")
const bcrypt =require('bcrypt')
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const port = process.env.PORT || 8888
const app = express()

const fs = require('fs')
const typeDefs = fs.readFileSync('./schema.graphql',{encoding: 'utf-8'})
const resolvers = require('./resolvers')

const {makeExecutableSchema} = require('@graphql-tools/schema')

const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(),bodyParser.json())

const {graphqlHTTP} = require("express-graphql")
app.use('/graphql',graphqlHTTP({schema,graphiql:true}))

app.get('/username-exists/:user_name',async(req,res)=>{
   const user_name=req.params
   //read users
   const result = await pool.query("SELECT * FROM users WHERE username=$1",[user_name])

   if(result.rows.length >0){
      return res.json({exists: true})
   } else {
      return res.json({exists: false})
   }
})
app.get('/email-exists/:email',async(req,res)=>{
   const e_mail = req.params
   //read users
   const result = await pool.query("SELECT * FROM users WHERE email=$1",[e_mail])
   if(result.rows.length >0){
      return res.json({exists:true})
   } else {
      return res.json({exists:false})
   }
})
app.post('/register', async(req,res)=>{
   const {username,email,password} = req.body

   if(!username || !email || !password){
      return res.status(400).send("Username, Email and Password are required")
   }
   const password_h = await bcrypt.hash(password,10)
   try {
      const result = await pool.query("INSERT INTO users(username,email,password) VALUES ($1,$2,$3)",[username,email,password_h])

      console.log('query result.rows-->',result.rows)
      if (result.rowCount >0){       
         res.status(201).json({
            dataReturn: result.rows[0],
            successBackend: "Successfully registered."
         })
      }
   } catch(error){     
       
      if (error.code === '23505') {
         // Unique constraint violation (username or email already exists)
         return res.status(400).json({ errorBackend: 'Username or email already exists.' });
      } else {
         return res.status(500).json({ errorBackend: 'REGISTER FAILED BACKEND.' });
      }      
}})

app.post('/login', async(req,res)=>{
   const {username,password} = req.body
   try {
      //1 read
      const result = await pool.query("SELECT * FROM users WHERE username=$1",[username])

      const user = await result.rows[0]
      if(!user){
         return res.status(400).json({errorBackend: "No records found. Try again."})
      } 
      //2 compare
      const isPasswordValid = await bcrypt.compare(password,user.password)

      if(!isPasswordValid){
         return res.status(401).json({errorBackend:"Password is incorrect. Please try again."})
      }
      //3 take & save JWT
      const authorKey = process.env.JWT_SECRET
      const token = jwt.sign({
         user_id: user.user_id,
         username: user.username,
         email: user.email,
         role: user.role
      }, authorKey, {expiresIn: "48h"})

      return res.status(201).json({successBackend: "Successfully Logged In.",token: token,user_id:user.user_id,username: user.username,email:user.email})

   } catch(err){
      console.log('Failed to login, ',err.message)
      return res.status(400).json({errorBackend: err.message})
   }
})
app.post("/change-password", async(req,res,next)=>{
   //get this user token, then exert its email
   const bearerToken =req.headers['authorization']
   const token =bearerToken && bearerToken.split(" ")[1]
   if(!token){
      return res.status(403).json({error403: "No token provided."})
   }

   jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
      if(err){
         return res.status(500).json({error500: `Failed to authenticate token, reason:: ${err.message}`})
      }
      req.userId =decoded.user_id
      req.email=decoded.email
      next()
   })
   const {password} = req.body
   try {
      const password_h =bcrypt.hash(password,10)
      const response = await pool.query("SELECT * from users WHERE user_id=$1",[req.userId])
      if (response.rows.length){
         //update
         try {
            const responseUpdate= await pool.query("UPDATE users SET password=$1 WHERE user_id=$2 RETURNING *",[password_h,req.userId])
            //check if success
            if(responseUpdate.rowCount>0){
               return res.status(200).json({successBackend: `Successfuly Updated password to the email user: ${email}`})
            } else {
               return res.status(500).json({error500:`Unsuccessfully Updated password to user with email ${email}`})
            }
         } catch(err){
            console.error("Unable to find user backend.")
         }
      } else {
         return res.status(404).json({error404:`No record found attached to email ${email}`})
      }

   } catch(err){
      console.err("Failed to check user password backend.")
   }
})

app.listen(port,()=>{
   console.info(`Node Postgres Server on port ${port}`)
})