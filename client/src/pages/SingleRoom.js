// src/pages/SingleRoom.js
import React, { useContext, useState } from 'react';
import { RoomContext } from '../context';
import { useParams, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Error from './Error';
import BookingModal from '../components/BookingModal';

const SingleRoom = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getRoom, bookRoom } = useContext(RoomContext);
  const room = getRoom(slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!room) {
    return <Error />;
  }

  const { id, name, description, capacity, size, price, extras, images } = room;

  const handleBooking = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check if user is authenticated
    if (!isAuthenticated) {
      alert('You need to log in to book a room.'); // Alert if not logged in
      return; // Prevent further execution
    }
    
    bookRoom(id); // Add to booked rooms in context
    setIsModalOpen(true); // Show modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/booking-list'); // Redirect after closing the modal
  };

  return (
    <>
      <Hero hero="singleRoomHero" />
      <div className="single-room">
        <div className="single-room-images">
          <img src={images[0]} alt={name} /> {/* Show only the main image */}
        </div>
        <div className="single-room-info">
          <h2>{name}</h2>
          <h3>{`Price: ₹${price}`}</h3>
          <p>{description}</p>
          <p>{`Capacity: ${capacity} people`}</p>
          <p>{`Size: ${size} SQFT`}</p>
          <ul>
            
            {extras.map((extra, index) => (
              <li key={index}>{extra}</li>
            ))}
            {/* <h4>Extras</h4> */}
          </ul>
          <button onClick={handleBooking} className="btn-primary">
            Book Now
          </button>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default SingleRoom;
