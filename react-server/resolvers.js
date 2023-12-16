const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const {v4: uuidv4}= require('uuid')

const saltValue= 10

const usersFilePath = path.join(__dirname,'db','users.json')

const Query = {
   greeting: ()=>`Greeting from 'resolvers' Backend. 'RESOLVERS' implemented graphql interface.`,
   sayHello: (root,args,context,info)=> `Hi ${args.name}, Graphql resolvers says HI to you.`
}
const Mutation = {
   createUser: async(root,args,context,info)=>{

      try {
               //open the file
      const usersData = fs.readFileSync(usersFilePath,'utf-8')
      const users = JSON.parse(usersData)

      //prep a new user
      const user_id=uuidv4()
      const password_h = await bcrypt.hash(args.password,saltValue)

      const newUser = {
         user_id,
         username: args.username,
         email: args.email,
         password: password_h
      }
      users.push(newUser)
      //write back to the file
      fs.writeFileSync(usersFilePath,JSON.stringify(users,null,2),'utf-8')

      return `User ${newUser.username} created successfully.`

      } catch(err){
         console.error('Failed to CREATE new user: ',err.message)
         throw new Error('Failed to CREATE new user')
      }

   }
}
module.exports ={Query,Mutation}