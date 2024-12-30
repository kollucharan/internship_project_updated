// import { Link, useNavigate } from "react-router-dom";
// import Searchbar from "../searchbar/searchbar";
// import Cookies from "js-cookie";
// import "./Header.css";

// import { useSelector } from "react-redux";

// export default function Head({ setSubmittedValue}) {

//   const navigate = useNavigate();

//   //const dispatch=useDispatch();

//   function logout() {
//     Cookies.remove("jwt_token");
//     // Seterror1('false')
//     // dispatch(userlogout());
//     Cookies.remove("user");
//     navigate("/login");
//   }

//   const count=useSelector((state)=>state.count.count);

//   return (
//     // <div className="navbar">
//     //   <div
//     //     style={{ display: "flex", justifyContent: "flex-start" }}
//     //     className="nav-items"
//     //   >
//     //     <Link to="/">
//     //       <div className="nav-item">Home</div>
//     //     </Link>
//     //     <Link to="/contactus">
//     //       <div className="nav-item"> Contact us</div>
//     //     </Link>

//     //     <div>
//     //       <Searchbar setSubmittedValue={setSubmittedValue} />
//     //     </div>

//     //     <Link to="/cart">
//     //       <div className="nav-item">
//     //         <img
//     //           src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
//     //           style={{ height: 35, width: 35 }}
//     //           alt=""
//     //         />
//     //         {count > 0 && <span style={{ color: "red" }}>{count}</span>}
//     //       </div>
//     //     </Link>
//     //     <div className="nav-item" >
//     //       <button onClick={logout} className="logout-button">
//     //         Logout
//     //       </button>
//     //     </div>
//     //   </div>
//     // </div>

// /* <div className="navbar">
//   <div className="nav-items">
//     <div style={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}>
//       <Link to="/">
//         <div className="nav-item">Home</div>
//       </Link>
//       <Link to="/contactus">
//         <div className="nav-item">Contact us</div>
//       </Link>
//     </div>

//     <div style={{ flexGrow: 2, margin: '0 20px' }}>
//       <Searchbar setSubmittedValue={setSubmittedValue} />
//     </div>

//     <div style={{ display: "flex", alignItems: "center" }}>
//       <Link to="/cart">
//         <div className="nav-item">
//           <img
//             src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
//             style={{ height: 35, width: 35 }}
//             alt=""
//           />
//           {count > 0 && <span style={{ color: "red" }}>{count}</span>}
//         </div>
//       </Link>

//       <div className="nav-item">
//         <button onClick={logout} className="logout-button">
//           Logout
//         </button>
//       </div>
//     </div>
//   </div>
// </div> */

// /* <div className="navbar">
//   <div className="nav-items">
//     <div style={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}>
//       <Link to="/">
//         <div className="nav-item">Home</div>
//       </Link>
//       <Link to="/contactus">
//         <div className="nav-item">Contact us</div>
//       </Link>
//     </div>

//     <div style={{ flexGrow: 2, margin: '0 20px' }}>
//       <Searchbar setSubmittedValue={setSubmittedValue} />
//     </div>

//     <div style={{ display: "flex", alignItems: "center" }}>
//       <Link to="/cart">
//         <div className="nav-item">
//           <img
//             src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
//             style={{ height: 35, width: 35 }}
//             alt=""
//           />
//           {count > 0 && <span style={{ color: "red" }}>{count}</span>}
//         </div>
//       </Link>
//     </div>

//     <div style={{ display: "flex", alignItems: "center" }}>
//       <div className="nav-item">
//         <button onClick={logout} className="logout-button">
//           Logout
//         </button>
//       </div>
//     </div>
//   </div>
// </div> */

// <div className="navbar">
//   <div className="nav-items" style={{ display: "flex", width: "100%" }}>
//     {/* Home and Contact Links on the left */}
//     <div style={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}>
//       <Link to="/">
//         <div className="nav-item">Home</div>
//       </Link>
//       <Link to="/contactus">
//         <div className="nav-item">Contact us</div>
//       </Link>
//     </div>

//     {/* Search Bar in the center */}
//     <div style={{ flexGrow: 2, margin: '0 20px' }}>
//       <Searchbar setSubmittedValue={setSubmittedValue} />
//     </div>

//     {/* Cart Icon in the center-right */}
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <Link to="/cart">
//         <div className="nav-item">
//           <img
//             src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
//             style={{ height: 35, width: 35 }}
//             alt=""
//           />
//           {count > 0 && <span style={{ color: "red" }}>{count}</span>}
//         </div>
//       </Link>
//     </div>

//     {/* Logout button at the end */}
//     <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
//       <div className="nav-item">
//         <button onClick={logout} className="logout-button">
//           Logout
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// }
// import { Link, useNavigate } from "react-router-dom";
// import Searchbar from "../searchbar/searchbar";
// import Cookies from "js-cookie";
// import "./Header.css";

// import { useSelector } from "react-redux";
// import { useState } from "react";

// export default function Head({ setSubmittedValue }) {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   function logout() {
//     Cookies.remove("jwt_token");
//     Cookies.remove("user");
//     navigate("/login");
//   }

//   const count = useSelector((state) => state.count.count);

//   return (
//     <div className="navbar">
//       <div className="nav-items" style={{ display: "flex", width: "100%" }}>
//         {/* Hamburger Icon for Mobile */}
//         <div
//           className="hamburger-menu"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <div className="bar"></div>
//           <div className="bar"></div>
//           <div className="bar"></div>
//         </div>

//         {/* Home and Contact Links on the left */}
//         <div
//           className={`nav-links ${isMenuOpen ? "active" : ""}`}
//           style={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}
//         >
//           <Link to="/">
//             <div className="nav-item">Home</div>
//           </Link>
//           <Link to="/contactus">
//             <div className="nav-item">Contact us</div>
//           </Link>
//         </div>

//         {/* Search Bar in the center */}
//         <div style={{ flexGrow: 2, margin: "0 20px" }}>
//           <Searchbar setSubmittedValue={setSubmittedValue} />
//         </div>

//         {/* Cart Icon in the center-right */}
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <Link to="/cart">
//             <div className="nav-item">
//               <img
//                 src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
//                 style={{ height: 35, width: 35 }}
//                 alt=""
//               />
//               {count > 0 && <span style={{ color: "red" }}>{count}</span>}
//             </div>
//           </Link>
//         </div>

//         {/* Logout button at the end */}
//         <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
//           <div className="nav-item">
//             <button onClick={logout} className="logout-button">
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../searchbar/searchbar";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import "./Header.css";
import { useState } from "react";

export default function Head({ setSubmittedValue }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const count = useSelector((state) => state.count.count);

  function logout() {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="nav-items desc">
        {/* Home and Contact Links on the left */}
        <div
          style={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}
        >
          <Link to="/">
            <div className="nav-item">Home</div>
          </Link>
          <Link to="/contactus">
            <div className="nav-item">Contact us</div>
          </Link>
        </div>

        {/* Search Bar in the center */}
        <div className="nav-links" style={{ flexGrow: 2, margin: "0 20px" }}>
          <Searchbar setSubmittedValue={setSubmittedValue} />
        </div>

        {/* Cart Icon in the center-right */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/cart">
            <div className="nav-item">
              <img
                src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
                style={{ height: 35, width: 35 }}
                alt=""
              />
              {count > 0 && <span style={{ color: "red" }}>{count}</span>}
            </div>
          </Link>
        </div>

        {/* Logout button at the end */}
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <div className="nav-item">
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuOpen ? "active" : ""}`}></div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">
          <div className="nav-item">Home</div>
        </Link>
        <Link to="/contactus">
          <div className="nav-item">Contact us</div>
        </Link>
        <div className="" style={{ flexGrow: 2, margin: "0 10px" }}>
          <Searchbar setSubmittedValue={setSubmittedValue} />
        </div>
        <div className="nav-item">
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
