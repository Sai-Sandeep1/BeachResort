// src/context.js
import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
    bookedRooms: JSON.parse(localStorage.getItem('bookedRooms')) || [], // Initialize from localStorage
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    const room = this.state.rooms.find(room => room.slug === slug);
    return room;
  };

  bookRoom = (roomId) => {
    this.setState(prevState => {
      const updatedBookedRooms = [...prevState.bookedRooms, roomId];
      localStorage.setItem('bookedRooms', JSON.stringify(updatedBookedRooms)); // Save to localStorage
      return { bookedRooms: updatedBookedRooms };
    });
  };

  removeBooking = (roomId) => {
    this.setState(prevState => {
      const updatedBookedRooms = prevState.bookedRooms.filter((id) => id !== roomId);
      localStorage.setItem('bookedRooms', JSON.stringify(updatedBookedRooms)); // Update localStorage
      return { bookedRooms: updatedBookedRooms };
    });
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      { [name]: value },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;
    let tempRooms = [...rooms];

    capacity = parseInt(capacity, 10);
    price = parseInt(price, 10);

    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }

    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }

    tempRooms = tempRooms.filter(room => room.price <= price);
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    this.setState({
      sortedRooms: tempRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          bookRoom: this.bookRoom,
          removeBooking: this.removeBooking, // Make removeBooking available
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
