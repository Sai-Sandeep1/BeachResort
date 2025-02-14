// src/components/CallButton.js
import React from "react";
import "./CallButton.css"; // Update the CSS import

const CallButton = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Thanks for using our website!</h2>
        <p>We will ping you in a few minutes.</p>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CallButton;
