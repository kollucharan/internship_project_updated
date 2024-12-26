import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

// import { Navigate, Route } from "react-router-dom";
 const Protectedroutes = ({ element }) => {
  // const navigate=useNavigate()
  let token = Cookies.get("jwt_token");
  

  if(!token)
    return <Navigate to="/login" />;

  return <> <Outlet/></>
};


 export default Protectedroutes;

// // export default Protectedroute;