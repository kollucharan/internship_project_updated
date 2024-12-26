// express server for authentication
//  const jwt =require('jsonwebtoken');
//   const express =require('express')
import jwt from "jsonwebtoken";
import cors from "cors";
const secret = "mySuperSecretKey1234567890abcdefg";
import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());
app.use(cors());
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
      // res.status(400).json({ userinvalid: true });
      res.status(400).send("user");
      return;
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      //console.log("inside block");
      // res.status(401).json({ passworderror: true });
       res.status(401).send("Password");
       return 
    }
  //   const claims = {
  //     'https://hasura.io/jwt/claims':{
  //         "x-hasura-default-role": "customer",
  //         'x-hasura-allowed-roles': ['customer','admin'],
  //         'X-Hasura-user-id': user.id,
  //         'x-hasura-user-name':user.name
          
  //     }
  // }

// const claims = {
//     'https://hasura.io/jwt/claims':{
//         "x-hasura-default-role": "customer",
//         'x-hasura-allowed-roles': ['customer','admin'],
//         'X-Hasura-user-id': user.id,
//         'x-hasura-user-name':user.name,
//         // 'x-hasura-admin-secret':'hasura-secret'
//     }
// }  
const claims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "customer",
    "x-hasura-allowed-roles": ["customer", "admin"],
    "x-hasura-user-id":  `${user.id}`,
    "x-hasura-user-name": user.name,
     // 'x-hasura-admin-secret':'hasura-secret'
  }
};


    const token = jwt.sign(
      { userId: user.id, 

        ...claims
      },
      secret// Secret key for signing the JWT token,  
    );

    res.status(200).json({ token });
  } catch (error) { 
    console.error(error);

    res.status(500).json({ error: "Server error" });
  }
});
app.listen(3000, () => {
  console.log("Back end server started");
});
 