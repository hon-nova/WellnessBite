import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const navigateTo = useNavigate();

  const [token, setToken] = useState("");
  const { isLoggedIn, email, username, loginSuccess, logout } =
    useContext(AuthContext);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    const getToken = async () => {
      try {
        const response = await fetch("http://localhost:8888/login", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`API failed with status code: ${response.status}`);
        }
        const data = response.json();
        console.log("data");
        console.log(data);
        loginSuccess(username, email);
      } catch (err) {
        //  console.error("Failed to get token::",err.message)
      }
    };
    getToken();
    //  console.log("Token:::",storedToken)
  }, [token]);

  const handleLogin = (e) => {
    e.preventDefault();
    navigateTo("/login");
  };
  return (
    <div style={{ backgroundColor: "#E8E8E8" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mx-5">
        <Link className="navbar-brand" to="/">
          <img
            src="/assets/images/workout.jpg"
            alt=""
            width={40}
            height={40}
            style={{ borderRadius: "50px" }}
          />
        </Link>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/activities">
                ACTIVITIES
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/nutritions">
                NUTRITIONS
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {isLoggedIn ? (
              <div className="d-flex">
                <li
                  className="nav-item dropdown"
                  style={{ margin: "0 0 30px 0" }}
                >
                  <Link
                    to="/profile/my-info"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {email}
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/profile/change-password"
                    >
                      Change Password
                    </Link>
                    <div className="dropdown-divider"></div>
                    <form
                      onSubmit={logout}
                      className="form-inline my-2 my-lg-0"
                    >
                      <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                </li>
                <li>
                  <form onSubmit={logout} className="form-inline my-2 my-lg-0">
                    <button
                      className="btn btn-outline-success my-2 my-sm-0"
                      type="submit"
                    >
                      Logout
                    </button>
                  </form>{" "}
                </li>
              </div>
            ) : (
              <form className="form-inline my-2 my-lg-0">
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="btn btn-outline-success my-2 my-sm-0"
                >
                  Log in
                </button>
              </form>
            )}
            <li></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
