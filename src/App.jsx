import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/cart/cart";
import Contactus from "./components/contactus/Contactus";
import Protectedroute from "./components/protectedroute/protected";
import Login from "./components/Login/Logincomponent";
import Productdetails from "./components/Productdetails/Productdetails";

function App() {
  // const [count, setCount] = useState(0)
 
  return (
    <div>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} /> */}
        {/* <Route exact path="/contactus" element={<Contactus />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/product/:id" element={<Productdetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} /> */}

<Route path="/login"
          element={<Login  />}
        />
      <Route path="/contactus"
          element={<Protectedroute element={<Contactus />} />}
        />
        <Route path="/cart"
          element={<Protectedroute element={<Cart />} />}
        />
         <Route path="/"
          element={<Protectedroute element={<Home />} />}
        />
       
        <Route  path="/product/:id" element={<Protectedroute element={<Productdetails />} />} />
        
      </Routes>
    </div>
  );
}

export default App;
