import React from "react";
import { withRouter, NavLink } from 'react-router-dom';

function Header() {
  return <header>

    <NavLink to="/" >
      <img src="/iconARC.png" alt="AP Icon" height={70} width="auto" />
    </NavLink>

    <NavLink to="/login" className="header-link" >Login</NavLink>
    <NavLink to="/explore" className="header-link">Explore</NavLink>
    <NavLink to="/examples" className="header-link">Examples</NavLink>

  </header>;
}

export default withRouter(Header);
