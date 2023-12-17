const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const {Pool} = require("pg")
const bcrypt =require('bcrypt')

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

      if (result.rowCount >0){
         res.status(201).json({
            dataReturn: result.rows[0],
            successBackend: "Successflly registered."
         })
      }

   } catch(error){

      console.log('Failed to register user, ',error.message)
      return res.status(500).json({errorBackend: error.message})
   }
})

app.post('/login', async(req,res)=>{
   const {username,password} = req.body
   try {


   } catch(err){
      console.log('Failed to login, ',err.message)
      return res.status(401).json({errorBackend: err.message})
   }
})

app.listen(port,()=>{
   console.info(`Graphql Server on port ${port}`)
})