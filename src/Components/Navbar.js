import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import { FaCheckCircle } from "react-icons/fa";
import { useLoading } from '../Components/LoadingContext';

import LoadingOverlay from './LoadingOverlay';
function Navbar({ completedTasksCount }) {
  const { isLoading, setIsLoading, loadingType, setLoadingType } = useLoading();

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current location
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/"; // Check if we're on home page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage]);
  const handleNavigation = async (path, type) => {
    console.log('Navigation type:', type); // Add this for debugging
    setLoadingType(type); // Set this first
    setIsLoading(true);
    navigate(path);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top"
        style={{
          backgroundColor: isHomePage
            ? isScrolled
              ? "#4A6656"
              : "transparent"
            : "#4A6656",
          transition: "all 0.3s ease-in-out",
          backdropFilter: isScrolled ? "blur(0px)" : "none",
          boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
        }}
      >
        <div className="container-fluid">
          <div
            className="navbar-brand fw-bold"
            style={{
              color: "#FAF3DD",
              fontSize: "1.5rem",
              letterSpacing: "1px",
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase",
              padding: "8px 15px",
              transition: "all 0.3s ease",
            }}
          >
            TaskFlow Pro
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <RouterLink
                  className="nav-link active custom-nav-link"
                  aria-current="page"
                  to="/"
                  style={{ color: "#FAF3DD" }}
                >
                  Home
                </RouterLink>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link custom-nav-link"
                  onClick={() => handleNavigation("/Features", "features")}

                  style={{
                    color: "#FAF3DD",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Features
                </button>
              </li>
              <li className="nav-item custom-nav-link">
                <button
                  className="nav-link"
                  onClick={() => handleNavigation("/Contactus", "contact")}

                  style={{
                    color: "#FAF3DD",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Contact Us
                </button>
              </li>

              <li className="nav-item custom-nav-link">
                <button
                  className="nav-link"
                  onClick={() => handleNavigation("/Tips", "tips")}

                  style={{
                    color: "#FAF3DD",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Learning Tips
                </button>
              </li>
            </ul>
            <div className="nav-item custom-nav-link">
              <ScrollLink
                to="tasks-section" // This ID needs to be added to your tasks section
                smooth={true}
                duration={500}
                offset={-80}
                className="nav-link"
                style={{
                  color: "#FAF3DD",
                  cursor: "pointer",
                  padding: "10px 20px",
                }}
              >
                Tasks
              </ScrollLink>
            </div>
            <div
              className="d-flex justify-content-end"
              style={{ padding: "10px 20px" }}
            >
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
                  cursor: "pointer",
                }}
              >
                📊 View Statistics
              </ScrollLink>
            </div>
            <div className="d-flex align-items-center me-3">
              <div
                className="completed-tasks-indicator d-flex align-items-center"
                style={{
                  backgroundColor: "#FAF3DD",
                  padding: "5px 15px",
                  borderRadius: "20px",
                  border: "2px solid #D4A373",
                }}
              >
                <FaCheckCircle
                  style={{
                    color: "#77BFA3",
                    marginRight: "8px",
                    fontSize: "18px",
                  }}
                />
                <span
                  style={{
                    color: "#4A6656",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Completed: {completedTasksCount}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleNavigation("/signin", "signin")}
              className="btn"
              style={{
                backgroundColor: "#77BFA3",
                color: "#FAF3DD",
                border: "none",
                borderRadius: "20px",
                padding: "8px 20px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.3s ease",
                marginLeft: "10px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#4A6656";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#77BFA3";
                e.target.style.transform = "scale(1)";
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
  {isLoading && <LoadingOverlay type={loadingType} />}
      <br />
    </>
  );
}
export default Navbar;
