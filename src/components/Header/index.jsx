import React from 'react';
import './style.css';
import { Link, NavLink } from "react-router-dom";

export class Header extends React.Component {

  isRouteCurrent(isActive){
    let stateStyle = isActive ? 'active' : 'default';
    return `nav-link navlink_cl_${stateStyle}`;
  }

  render() {
    return (
      <header className="header-page">
          <h1 className="text-logo"><Link to="/">JSONPlaceholderAPI</Link></h1>
          <nav className="navbar"> 
            <NavLink 
              className={({ isActive }) => this.isRouteCurrent(isActive)} 
              to="/"
            >Home</NavLink>
            <NavLink 
              className={({ isActive }) => this.isRouteCurrent(isActive)} 
              to="/profile"
            >Profile</NavLink>
          </nav>
      </header>
    );
  }
}
