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

app.listen(port,()=>{
   console.info(`Graphql Server on port ${port}`)
})