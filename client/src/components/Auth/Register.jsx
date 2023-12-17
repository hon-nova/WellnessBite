import React,{ useState } from 'react'


const Register = () => {
  const initialForm ={
    username:"",
    email:"",
    password:""
  }
  const [greeting, setGreeting] = useState("");
  const [sayHello, setSayHello] = useState("");
  const [formData,setFormData] = useState(initialForm)
  const [name, setName] = useState("");
  
  const [success, setSuccess] = useState("");
  const [errors,setErrors] =useState({
    username:"",
    email:"",
    password:"",
    errorBackend:""
  })
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const loadGreetingAndSayHello = async (name) => {
    const response = await fetch("http://localhost:8888/graphql", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query FetchGreetingAndSayHello($name: String!) {
            greeting
            sayHello(name: $name)
          }
        `,
        variables: {
          name: name,
        },
      }),
    });

    const respondBody = await response.json();
    console.log(respondBody);

    const data = respondBody.data;
    setGreeting(data.greeting);
    setSayHello(data.sayHello);

    console.log(data);
    return data;
  };

  // const saveUser = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8888/graphql", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: `
  //           mutation CreateUser($username: String!, $email: String!, $password: String!) {
  //             createUser(username: $username, email: $email, password: $password)
  //           }
  //         `,
  //         variables: {
  //           username,
  //           email,
  //           password,
  //         },
  //       }),
  //     });

  //     const respondBody = await response.json();
  //     console.log(respondBody);

  //     // Reset form fields after successful submission
  //     setFormData(initialForm)
      
  //     setMessage("User created successfully!");
  //     console.log("User created successfully!");
  //   } catch (error) {
  //     console.error("Error creating user:", error.message);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadGreetingAndSayHello(name);
  };

  const checkUsernameExists =async(user_name)=>{
    try {
      const result = await fetch(`http://localhost:8888/username-exists/${user_name}`)
      const dataReturn = await result.json()
      console.log("Username::")
      console.log(dataReturn)
      if (dataReturn.exists==true){
        //set error
        setErrors((prevErrors)=>({
          ...prevErrors,
          username:"This username is already taken. Please choose another name or log in instead."
        }))
      }
    } catch(err){
      console.err('Failed to check username exists')
    }
  }
  const checkEmailExists = async(e_mail)=>{
    // /email-exists/:email
    try {
      const result = await fetch(`http://localhost:8888/email-exists/${e_mail}`)
      const dataReturn = await result.json()
      console.log("Email::")
      console.log(dataReturn)
      if (dataReturn.exists == true){
        setErrors((prevErrors)=>({
          ...prevErrors,
          email:"The email already exists. Please provide another email."
        }))
      }
    } catch(err){
      console.err('Failed to check email exists')
    }
  }
  const registerUser = async()=>{
    setErrors("")
    //validate user
    if(!formData.username){
      setErrors((prevErrors)=>({
        ...prevErrors,
        username: "username is required."
      }))
    } else checkUsernameExists(formData.username)

    if (!formData.email){
      setErrors((prevErrors)=>({
        ...prevErrors,
        email:"Email is required."
      }))
    } else if(emailRegex.test(formData.email) === false){
      setErrors((prevErrors)=>({
        ...prevErrors,
        email:"Incorrect email format. Please provide a valid email."
      }))
    } else await checkEmailExists(formData.email)

    if(!formData.password){
      setErrors((prevErrors)=>({
        ...prevErrors,
        password: "password is required."
      }))
    }
    //convert errors object to an array with Object.key(ErrorsObject)
    if(Object.keys(errors).length === 0){

      try {        
  
        const result = fetch(`http://localhost:8888/register`,{
          method:"POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username:formData.username,
            email:formData.email,
            password: formData.password //name: value pair in the form
          })  
        })
        if (result.status === 201){
          const dataReturn = await result.json()
          setSuccess(dataReturn.successBackend)
          setTimeout(()=>{
            setSuccess("")
          },3000)
          setFormData(initialForm)

        }
      } catch(err){
        console.error('Failed registered Frontend')
      }
    }
   
  }
  const handleInputChange = (e)=>{
    const {name,value}= e.target
    setFormData((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  const handleRegister = (e) => {
    e.preventDefault();
    // saveUser();
    registerUser()
  };

  return (
    <div className="App">
    <h1>Hello from Frontend</h1>
    {success && (
      <p
        className="alert alert-success mx-auto d-block"
        style={{ width: "400px" }}
      >
        <b>{success}</b>
      </p>
    )}
    <p>{greeting}</p>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Set Name</button>
    </form>
    <h1>{sayHello}</h1>
    <h1>CREATE AN ACCOUNT</h1>
    <form onSubmit={handleRegister}>
      {/* username */}
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <br />
      {/* email */}
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <br />
      {/* password */}
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
    <div>Not registered yet? Please click <a href="/register">here</a> to create one.</div>
  </div>
  )
}

export default Register
