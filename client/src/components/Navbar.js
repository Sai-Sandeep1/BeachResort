import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import logo from "../images/logo.svg";
import CallButton from "./CallButton"; // Updated import
import "../Navbar.css"; // Import the CSS for styling adjustments

const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCallMe = () => {
    setIsModalOpen(true); // Open modal when 'Call Me' is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/auth");
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} alt="Beach Resort" />
            </Link>
            <button type="button" className="nav-btn" onClick={handleToggle}>
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/booking-list">Bookings</Link>
            </li>
            <li>
              <button className="call-me-btn" onClick={handleCallMe}>
                Call Me
              </button>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {isModalOpen && <CallButton onClose={closeModal} />} {/* Updated component */}
    </>
  );
};

export default Navbar;
