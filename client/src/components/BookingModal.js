// src/components/BookingModal.js
import React from 'react';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Booked Successfully</h2>
        <button onClick={onClose} className="btn-primary">Close</button>
      </div>
    </div>
  );
};

export default BookingModal;
