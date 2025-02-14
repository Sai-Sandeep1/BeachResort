// src/context/index.js
import React, { createContext, useState } from 'react';

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [bookedRooms, setBookedRooms] = useState([]); // Array of room IDs
  const [rooms, setRooms] = useState([]); // Array of room details

  const removeBooking = (roomId) => {
    setBookedRooms((prevBookedRooms) => prevBookedRooms.filter((id) => id !== roomId));
  };

  // ... any additional logic to fetch or manage rooms

  return (
    <RoomContext.Provider value={{ bookedRooms, rooms, removeBooking }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
