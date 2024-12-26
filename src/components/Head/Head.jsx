import { Link, useNavigate } from "react-router-dom"
import Searchbar from "../searchbar/searchbar"
import Cookies from "js-cookie"

 export default function Head({setSubmittedValue,Seterror1}){
     const navigate =useNavigate();
    function logout(){
        Cookies.remove('jwt_token')
        // Seterror1('false')
        navigate('/login')

    }
    
    return(
        <div>
         <div style={{display:"flex" ,justifyContent:"space-evenly"}}>
       <Link to='/'> <div>Home</div></Link>

       <Link to='/contactus'> <div> Contact us</div></Link> 

       <Link to='/cart'>  <div> <img src="https://cdn-icons-png.freepik.com/512/7835/7835563.png" style={{height:35,width:35}} alt=""/></div> </Link> 
       <div><button onClick={logout}>Logout</button></div>
         <div> <Searchbar setSubmittedValue={setSubmittedValue}/> </div>
         </div>

        </div>
    )
}