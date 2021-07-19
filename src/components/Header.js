import React, { useContext } from "react";
import { withRouter, NavLink } from 'react-router-dom';
import { FirebaseContext } from "../firebase";


function Header(props) {

  const { user, firebase } = useContext(FirebaseContext);


  function handleLogout() {
    firebase.logout();
    props.history.push("/login");
  }

  return <header>

    <NavLink to="/" >
      <img src="/iconARC.png" alt="AP Icon" height={70} width="auto" />
    </NavLink>

    {user
      ? (<>
        <button type="button" className="logOutBtn" onClick={handleLogout}>
          <img src="/logOut.png" alt="Logout" height={40} width="auto" />
        </button>
        <NavLink to="/account" className="header-link" >
          <img src="/user.png" alt="Account" height={40} width="auto" />
        </NavLink>
      </>)
      : <NavLink to="/login" className="header-link" >Login</NavLink>}

    <NavLink to="/explore" className="header-link">Explore</NavLink>
    <NavLink to="/examples" className="header-link">Examples</NavLink>

  </header>;
}

export default withRouter(Header);
