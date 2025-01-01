
import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../searchbar/searchbar";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { useQuery,gql } from "@apollo/client";
import "./Header.css";
import { useState ,useEffect} from "react";
import {setCartCount, incrementCartCount, decrementCartCount } from '../../Slices/countslice'

const GET_CART_ITEMS = gql`
  query GetCartItems($user_id: Int!) {
    cart(where: { user_id: { _eq: $user_id }, is_deleted: { _eq: false } }) {
      id
      quantity
    }
  }
`;

export default function Head({ setSubmittedValue }) {
  const dispatch =useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.count.cartCount);

     const stringifyUser = Cookies.get("user");
      const user = JSON.parse(stringifyUser);

  // const count = useSelector((state) => state.count.count);
  const { data, loading, error,refetch } = useQuery(GET_CART_ITEMS, {
    variables: { user_id: user.id },
    context: {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt_token")}`, // Add JWT token here
          },
        },

  });

  // Calculate total items in the cart
  // const cartCount = data?.cart.reduce((total, item) => total + item.quantity, 0) || 0;
  useEffect(() => {
    if (data) {
      const totalItems = data.cart.reduce((total, item) => total + item.quantity, 0);
      dispatch(setCartCount(totalItems)); // Update the cart count in Redux store
    }
  }, [data, dispatch]);

   
  useEffect(() => {
    if (data) {
      refetch(); // Refetch data to update the cart count when navigating back
    }
  }, [data, refetch]);



  function logout() {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div className="nav-items desc">
       
        <div
          style={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}
        >
          <Link to="/">
            <div className="nav-item">Home</div>
          </Link>
          {/* <Link to="/contactus">
            <div className="nav-item">Contact us</div>
          </Link> */}
        </div>

        
        <div className="nav-links" style={{ flexGrow: 2, margin: "0 20px" }}>
          <Searchbar setSubmittedValue={setSubmittedValue} />
        </div>

      
        <div style={{ display: "flex", alignItems: "center" }}>

        <Link to="/contactus">
            <div className="nav-item">Contact us</div>
          </Link>


          <Link to="/cart">
            <div className="nav-item">
              <img
                src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
                style={{ height: 35, width: 35 }}
                alt=""
              />
              {/* {count > 0 && <span style={{ color: "red" }}>{count}</span>} */}
              {/* {cartCount > 0 && <span style={{ color: "red" }}>{cartCount}</span>} */}
              {cartCount > 0 && <span style={{ color: 'red' }}>{cartCount}</span>}
            </div>
          </Link>
        </div>

       
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
        {/* <Link to="/contactus">
          <div className="nav-item">Contact us</div>
        </Link> */}
        <div className="" style={{ flexGrow: 2, margin: "0 10px" }}>
          <Searchbar setSubmittedValue={setSubmittedValue} />
        </div>
        <Link to="/cart">
            <div className="nav-item">
              <img
                src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
                style={{ height: 35, width: 35 }}
                alt=""
              />
             {/* {cartCount > 0 && <span style={{ color: "red" }}>{cartCount}</span>} */}
             {cartCount > 0 && <span style={{ color: 'red' }}>{cartCount}</span>}
            </div>
          </Link>


        <Link to="/contactus">
          <div className="nav-item">Contact us</div>
        </Link>
       
        <div className="nav-item">
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
