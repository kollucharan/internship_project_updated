import { useState } from "react"
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate =useNavigate();
    const [userinvalid,Setuserinvalid]=useState(null)
    const [passworderror,Setpassworderror]=useState(null)
    const [invalid,Setinvalid]=useState(false);
    const [email,Setemail] =useState('');
    const [password,Setpassword] =useState('');
   
     async function login(){
      Setinvalid(false);
      Setuserinvalid(false);  // Reset error states
      Setpassworderror(false);
      try{
      const response=await axios.post('http://localhost:3000/login',{
        email:email,
        password:password
      });  
      // console.log(response.data.e);
      const {userinvalid,passworderror} =response.data ;
      // const {invalidpassword}=response.data;
      // console.log(response.data);
     
      // if(invalidpassword){
      //   Setinvalid(true);
      //   return 
      // }

      if(userinvalid){
        Setuserinvalid(true)
        Setinvalid(true)
        return
      }
      if(passworderror){
        Setpassworderror(true);
        Setinvalid(true)
       
        return 
      }

      const { token } = response.data;
      Cookies.set('jwt_token',token)
      navigate('/');
     
    }
    catch(error){
      console.log("error is" , error)
      Setinvalid(true)

    }
  }
    return (
    
    <div>
    
      <form >

       {/* <input type=""/> */}
       <label htmlFor="email">Email id:</label>
       <input type="email" name="email" id="email"  required  onChange={(e)=>Setemail(e.target.value)}/>

       <label htmlFor="password">Password:</label>
       <input type="text" name="password" id="password" onChange={(e)=>Setpassword(e.target.value)} required/>

          <button type="button"  onClick={login}>Submit</button>

      </form>
     {/* {(userinvalid||passworderror)&&<div>invalid credentials</div>} */}
     
     {invalid&&<div>invalid credentials</div>}
      

    </div> )
}