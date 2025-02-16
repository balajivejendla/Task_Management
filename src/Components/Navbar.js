import React, { Component } from 'react'
import {Link} from 'react-router-dom';




function Navbar(){
    return(
        <>
     <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#87c39e" }}>
  <div className="container-fluid">
    <a className="navbar-brand fw-bold text-dark">Task Management</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
  <Link className="nav-link" to="/Features">Features</Link>
</li>

      </ul>
      <span className="navbar-text custom-brand1">
        Helps to do Tasks Easier
      </span>
    </div>
  </div>
</nav>
        </>

    );

}
export default Navbar;