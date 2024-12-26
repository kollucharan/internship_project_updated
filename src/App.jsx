import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/cart/cart";
import Contactus from "./components/contactus/Contactus";
import Protectedroutes from "./components/protectedroutes/protected";
import Login from "./components/Login/Logincomponent";
import Productdetails from "./components/Productdetails/Productdetails";

function App() {
  // const [count, setCount] = useState(0)
  return (
    <div>
      <Routes>
       
        <Route element={<Protectedroutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/contactus" element={<Contactus />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
