import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [greeting, setGreeting] = useState("");
  const [sayHello, setSayHello] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors,setErrors] =useState({
    username:"",
    email:"",
    password:""
  })

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

  const saveUser = async () => {
    try {
      const response = await fetch("http://localhost:8888/graphql", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation CreateUser($username: String!, $email: String!, $password: String!) {
              createUser(username: $username, email: $email, password: $password)
            }
          `,
          variables: {
            username,
            email,
            password,
          },
        }),
      });

      const respondBody = await response.json();
      console.log(respondBody);

      // Reset form fields after successful submission
      setUsername("");
      setEmail("");
      setPassword("");
      setMessage("User created successfully!");
      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadGreetingAndSayHello(name);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    saveUser();
  };

  return (
    <div className="App">
      <h1>Hello from Frontend</h1>
      {message && (
        <p
          className="alert alert-success mx-auto d-block"
          style={{ width: "400px" }}
        >
          <b>{message}</b>
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        {/* email */}
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {/* password */}
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
