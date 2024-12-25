// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// // import { Navigate, Route } from "react-router-dom";
//  const Protectedroute = ({ element }) => {
//   const navigate=useNavigate()
//   let token = Cookies.get("jwt_token");
  
//   if (token === undefined) {
//    navigate('/login')
//   }

//   return element;
// };
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Protected route component
const Protectedroute = ({ element }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let token = Cookies.get("jwt_token");

    // If no token, navigate to login page
    if (!token) {
      navigate("/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // If still checking authentication, render nothing or loading
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Render the protected route if authenticated
  return isAuthenticated ? element : null;
};

export default Protectedroute;

// export default Protectedroute;