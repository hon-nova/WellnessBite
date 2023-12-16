const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

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



app.listen(port,()=>{
   console.info(`Graphql Server on port ${port}`)
})