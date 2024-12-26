import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [invalid, SetInvalid] = useState("");
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  useEffect(() => {
    const token = Cookies.get("jwt_token")
  
    if(token){
      navigate('/')
    }
  },[])

  async function login() {
 
    const options ={
      method:'POST',
      body:JSON.stringify({email:email,password:password}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
    }
      const response = await fetch("http://localhost:3000/login", options);
    if (response.status === 200) {
      const data = await response.json()
      const { token } = data;
      console.log(token);
      Cookies.set("jwt_token", token);
      navigate("/");
      return;
    } 
    else if (response.status === 400) {
      SetInvalid("user not found");
    } else {
      SetInvalid("Password Error");
    }
  }
  return (
    <div>
      <form>
        {/* <input type=""/> */}
        <label htmlFor="email">Email id:</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => Setemail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          id="password"
          onChange={(e) => Setpassword(e.target.value)}
          required
        />

        <button type="button" onClick={login}>
          Submit
        </button>
      </form>

      <div>{invalid}</div>
    </div>
  );
}
