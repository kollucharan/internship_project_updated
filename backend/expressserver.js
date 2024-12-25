// express server for authentication
//  const jwt =require('jsonwebtoken');
//   const express =require('express')
import jwt from "jsonwebtoken";
import cors from "cors";
const secret = "my_secret_key";
import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const HASURA_GRAPHQL_URL = "https://coherent-skink-69.hasura.app/v1/graphql";
const HASURA_ADMIN_SECRET =
  "mPCN2znKe29oVkgGUzMTNMxzLY5bxwuaJYgo1pZ6M8JaQHmCAD72uJTC9IW53Vjf";

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      "https://coherent-skink-69.hasura.app/v1/graphql",
      {
        query: `
          query GetUserByEmail($email: String!) {
            users(where: {email: {_eq: $email}}) {
              id
              email
              password
             
            }
          }
        `,
        variables: { email }, //email to query
      },
      {
        headers: {
          "x-hasura-admin-secret": HASURA_ADMIN_SECRET, // Authentication header for Hasura
          "Content-Type": "application/json", 
        },
      }
    );

    const user = response.data.data.users[0];

    if (!user) {
      res.json({ userinvalid: true });
      return;
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      //console.log("inside block");
      res.status(400).json({ passworderror: true });
      return;
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "secret" // Secret key for signing the JWT token
      
    );

    
    res.json({ token });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Server error" });
  }
});
app.listen(3000, () => {
  console.log("Back end server started");
});
