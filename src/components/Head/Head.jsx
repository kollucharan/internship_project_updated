import { Link, useNavigate } from "react-router-dom";
import Searchbar from "../searchbar/searchbar";
import Cookies from "js-cookie";
import "./Header.css";

export default function Head({ setSubmittedValue, SetUser }) {
  const navigate = useNavigate();
  //const dispatch=useDispatch();

  function logout() {
    Cookies.remove("jwt_token");
    // Seterror1('false')
    // dispatch(userlogout());
    Cookies.remove("user");
    navigate("/login");
  }

  return (
    <div className="navbar">
      <div
        style={{ display: "flex", justifyContent: "space-evenly" }}
        className="nav-items"
      >
        <Link to="/">
          <div className="nav-item">Home</div>
        </Link>
        <Link to="/contactus">
          <div className="nav-item"> Contact us</div>
        </Link>

        <div>
          <Searchbar setSubmittedValue={setSubmittedValue} />
        </div>

        <Link to="/cart">
          <div className="nav-item">
            <img
              src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
              style={{ height: 35, width: 35 }}
              alt=""
            />
          </div>
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
