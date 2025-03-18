import React, { Component } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

import { FaCheckCircle } from 'react-icons/fa';



function Navbar({completedTasksCount}){
    return(
        <>
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#4A6656" }}>
          
                <div className="container-fluid">
                    <div className="navbar-brand fw-bold " style={{color:"#FAF3DD"}}>Task Management</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarText">
                    
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <RouterLink className="nav-link active" aria-current="page" to="/" style={{color:"#FAF3DD"}}>Home</RouterLink>
                            </li>
                            <li className="nav-item">
                                <RouterLink className="nav-link" to="/Features" style={{color:"#FAF3DD"}}>Features</RouterLink>
                            </li>
                            <li className="nav-item">
                                <RouterLink className="nav-link" to="/Contactus" style={{color:"#FAF3DD"}}>Contact Us</RouterLink>
                            </li>

                            <li className="nav-item">
                                <RouterLink className="nav-link" to="/Tips" style={{color:"#FAF3DD"}}>Learning Tips</RouterLink>
                            </li>


                        </ul>
                        <div className="d-flex justify-content-end" style={{ padding: "10px 20px" }}>
  <ScrollLink
    to="statistics-section"
    smooth={true}
    duration={200}
    offset={-100} 
    className="btn"
    style={{
      backgroundColor: "#77BFA3",
      color: "#FAF3DD",
      border: "none",
      borderRadius: "20px",
      padding: "8px 15px",
      cursor: "pointer"
    }}
  >
    📊 View Statistics
  </ScrollLink>
</div>
                        <div className="d-flex align-items-center me-3">
                            <div className="completed-tasks-indicator d-flex align-items-center" 
                                style={{ 
                                    backgroundColor: "#FAF3DD",
                                    padding: "5px 15px",
                                    borderRadius: "20px",
                                    border: "2px solid #D4A373"
                                }}>
                                <FaCheckCircle style={{ 
                                    color: "#77BFA3", 
                                    marginRight: "8px", 
                                    fontSize: "18px" 
                                }}/>
                                <span style={{ 
                                    color: "#4A6656", 
                                    fontWeight: "500",
                                    fontSize: "14px"
                                }}>
                                    Completed: {completedTasksCount}
                                </span>
                            </div>
                        </div>

                        <span className="navbar-text custom-brand1" style={{color:"#FAF3DD"}}>
                            Helps to do Tasks Easier
                        </span>
                    </div>
                </div>
    
            </nav>
            <br/>
            

        </>

    );

}
export default Navbar;