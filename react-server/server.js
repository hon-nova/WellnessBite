const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const port = process.env.PORT || 8888;
const app = express();

const fs = require("fs");
const typeDefs = fs.readFileSync("./schema.graphql", { encoding: "utf-8" });
const resolvers = require("./resolvers");

const { makeExecutableSchema } = require("@graphql-tools/schema");

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors(), bodyParser.json());

const { graphqlHTTP } = require("express-graphql");
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.get("/username-exists/:user_name", async (req, res) => {
  const user_name = req.params;
  //read users
  const result = await pool.query("SELECT * FROM users WHERE username=$1", [
    user_name,
  ]);

  if (result.rows.length > 0) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
});
app.get("/all-activities", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM activities");
    if (response.rows.length > 0) {
      res.status(200).json({
        data: response.rows,
        successBackend: "SUCCESSSFULLY retrieved activities",
      });
    } else {
      if (response.status === 400) {
        res.json({ errorBackend: "FAILED to retrieve activities" });
      }
    }
  } catch (error) {
    console.log("BACKEND ERROR: ", error.message);
  }
});
app.get("/email-exists/:email", async (req, res) => {
  const e_mail = req.params;
  //read users
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    e_mail,
  ]);
  if (result.rows.length > 0) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
});
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Username, Email and Password are required");
  }
  const password_h = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      "INSERT INTO users(username,email,password) VALUES ($1,$2,$3)",
      [username, email, password_h]
    );

    console.log("query result.rows-->", result.rows);
    if (result.rowCount > 0) {
      res.status(201).json({
        dataReturn: result.rows[0],
        successBackend: "Successfully registered.",
      });
    }
  } catch (error) {
    if (error.code === "23505") {
      // Unique constraint violation (username or email already exists)
      return res
        .status(400)
        .json({ errorBackend: "Username or email already exists." });
    } else {
      return res.status(500).json({ errorBackend: "REGISTER FAILED BACKEND." });
    }
  }
});

// http://localhost:8888/login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    //1 read
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    const user = await result.rows[0];
    if (!user) {
      return res
        .status(400)
        .json({ errorBackend: "No records found. Try again." });
    }
    //2 compare
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ errorBackend: "Password is incorrect. Please try again." });
    }
    //3 take & save JWT
    const authorKey = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      authorKey,
      { expiresIn: "48h" }
    );

    return res.status(201).json({
      successBackend: "Successfully Logged In.",
      token: token,
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.log("Failed to login, ", err.message);
    return res.status(400).json({ errorBackend: err.message });
  }
});

app.get('/read-saved-activities',async(req,res)=>{
  try {
    const stm=`select * from activities 
    join user_activities on activities.activity_id=user_activities.activity_id 
    join users on user_activities.user_id=users.user_id
    where users.user_id=47 `
    const response = await pool.query(stm)
    // console.log("response")
    // console.log(response)
    if(response.rows.length>0){
      res.status(200).json({
        data:response.rows,
        successBackend: "READ successfully saved activities."
      })
    }
  } catch(err){
    console.log('Failed to read saved activities, reasons: ',err.message)
  }
})
app.post("/change-password", async (req, res, next) => {
  //get this user token, then exert its email
  const bearerToken = req.headers["authorization"];
  const token = bearerToken && bearerToken.split(" ")[1];
  if (!token) {
    return res.status(403).json({ error403: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        error500: `Failed to authenticate token, reason:: ${err.message}`,
      });
    }
    req.userId = decoded.user_id;
    req.email = decoded.email;
    next();
  });
  const { password } = req.body;
  try {
    const password_h = bcrypt.hash(password, 10);
    const response = await pool.query("SELECT * from users WHERE user_id=$1", [
      req.userId,
    ]);
    if (response.rows.length) {
      //update
      try {
        const responseUpdate = await pool.query(
          "UPDATE users SET password=$1 WHERE user_id=$2 RETURNING *",
          [password_h, req.userId]
        );
        //check if success
        if (responseUpdate.rowCount > 0) {
          return res.status(200).json({
            successBackend: `Successfuly Updated password to the email user: ${email}`,
          });
        } else {
          return res.status(500).json({
            error500: `Unsuccessfully Updated password to user with email ${email}`,
          });
        }
      } catch (err) {
        console.error("Unable to find user backend.");
      }
    } else {
      return res
        .status(404)
        .json({ error404: `No record found attached to email ${email}` });
    }
  } catch (err) {
    console.err("Failed to check user password backend.");
  }
});

app.post("/save-activity/:activity_id", async (req, res, next) => {
  const { activity_id } = req.params;
  const { user_id } = req.body;
  // console.log("user_id-->", user_id);
  try {
    //step 1: check user
    const response0 = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );
    if (response0.rowCount == 0) {
      return res.status(404).json({
        error: "User not found. Please log in to access this feature.",
      });
    }

    const savedActivitiesResponse = await pool.query(
      "SELECT * FROM user_activities WHERE user_id = $1",
      [user_id]
    );

    const numSavedActivities = savedActivitiesResponse.rows.length;
    if (numSavedActivities < 5) {
      const existingActivityResponse = await pool.query(
        "SELECT * FROM user_activities WHERE user_id = $1 AND activity_id = $2",
        [user_id, activity_id]
      );

      if (existingActivityResponse.rowCount === 0) {
        const insertResponse = await pool.query(
          "INSERT INTO user_activities(user_id, activity_id) VALUES ($1, $2)",
          [user_id, activity_id]
        );

        if (insertResponse.rowCount > 0) {
          console.log("BACKEND new activity record");
          console.log(insertResponse.rows[0]);
          res.json({
            data: insertResponse.rows[0],
            successBackend: "Activity saved SUCCESSFULLY",
          });
        } 
      } else {
        console.log("The activity already exists. Out. Do nothing!");
        res.status(400).json({        
          errorBackend: "The activity already exists",
        });
      }
    } else {
      console.log("Exceeded the maximum limit of saved activities (5).");
      res.status(400).json({
        errorBackend: "Exceeded the maximum limit of saved activities (5).",
      });
    }
  } catch (err) {
    console.log("ERROR backend, reason-> ", err.message);
  }
});
app.post("/remove-activity/:removed_id",async(req,res)=>{
  const {removed_id}=req.params
  const {user_id}= req.body
  try {
    const response = await pool.query('DELETE FROM user_activities WHERE user_id=$1 AND activity_id=$2',[user_id,removed_id])
    if(response.rowCount>0){
    res.status(200).json({
      successBackend: "BACKEND removed activity."
    })
    } else {
      res.status(400).json({errorBackend:"BACKEND failed to remove activity."})
    }
  } catch(err){
    res.status(500).json({errorBackend:"NETWORK ERROR"})
  }  
})

app.listen(port, () => {
  console.info(`Node Postgres Server on port ${port}`);
});
