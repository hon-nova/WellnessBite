import React from "react";

const Navbar = () => {
  return (
    <div>
   <nav className="navbar navbar-expand-lg navbar-light bg-light mx-5">
  <a className="navbar-brand" href="#">WorkoutIcon</a>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Activities</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#">Nutritions</a>
      </li>   
    </ul>
    <ul className="navbar-nav">
    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Email Address
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">My Profile</a>
          <a className="dropdown-item" href="#">Change Password</a>
          <div className="dropdown-divider"></div>
          <form className="form-inline my-2 my-lg-0">     
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
    </form>         
        </div>
      </li>
      <li>      
      </li>
    </ul>   
  </div>
</nav>
    </div>
  );
};

export default Navbar;
