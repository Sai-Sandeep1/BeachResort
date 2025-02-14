// src/pages/BookingList.js
import React, { useContext } from 'react';
import { RoomContext } from '../context';
import { Link } from 'react-router-dom';
import './BookingList.css';

const BookingList = () => {
  const { bookedRooms, rooms, removeBooking } = useContext(RoomContext); // Ensure removeBooking is being destructured here

  const bookedRoomDetails = bookedRooms
    .map((roomId) => rooms.find((room) => room.id === roomId))
    .filter((room) => room !== undefined);

  const handleDeleteBooking = (roomId) => {
    if (removeBooking) { // Check if removeBooking is defined
      removeBooking(roomId); // Call the removeBooking function
    } else {
      console.error('removeBooking is not a function');
    }
  };

  if (bookedRoomDetails.length === 0) {
    return <p>No rooms booked yet.</p>;
  }

  return (
    <div className="booking-list">
      <h2>Your Bookings</h2>
      <div className="booking-items">
        {bookedRoomDetails.map((room, index) => (
          <div key={`${room.id}-${index}`} className="booking-item"> {/* Unique key */}
            <Link to={`/rooms/${room.slug}`} className="booking-item-link">
              <img src={room.images[0]} alt={room.name} className="room-image" />
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{`Capacity: ${room.capacity} guests`}</p>
              </div>
            </Link>
            <button onClick={() => handleDeleteBooking(room.id)} className="delete-booking-btn">
              Delete Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
