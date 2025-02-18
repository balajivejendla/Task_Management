import React, { Component } from 'react'
import {Link} from 'react-router-dom';




function Navbar(){
    return(
        <>
     <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#4A6656" }}>
  <div className="container-fluid">
    <div className="navbar-brand fw-bold " style={{color:"#FAF3DD"}}>Task Management</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/" style={{color:"#FAF3DD"}}>Home</Link>
        </li>
        <li className="nav-item">
  <Link className="nav-link" to="/Features" style={{color:"#FAF3DD"}}>Features</Link>
</li>

      </ul>
      <span className="navbar-text custom-brand1" style={{color:"#FAF3DD"}}>
        Helps to do Tasks Easier
      </span>
    </div>
  </div>
</nav>

        </>

    );

}
export default Navbar;