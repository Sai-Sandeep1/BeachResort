// src/components/RoomsFilter.js
import React, { useContext } from "react";
import { RoomContext } from "../context";
import Title from "./Title";

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;

  let types = getUnique(rooms, "type");
  types = ["all", ...types];
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* Room Type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select name="type" id="type" onChange={handleChange} className="form-control" value={type}>
            {types}
          </select>
        </div>

        {/* Guests */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select name="capacity" id="capacity" onChange={handleChange} className="form-control" value={capacity}>
            {people}
          </select>
        </div>

        {/* Room Price */}
        <div className="form-group">
          <label htmlFor="price">room price ₹{price}</label>
          <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control" />
        </div>

        {/* Room Size */}
        <div className="form-group">
          <label htmlFor="price">room size </label>
          <div className="size-inputs">
            <input type="number" name="minSize" value={minSize} onChange={handleChange} className="size-input" />
            <input type="number" name="maxSize" value={maxSize} onChange={handleChange} className="size-input" />
          </div>
        </div>

        {/* Extras */}
        <div className="form-group">
          <div className="single-extra">
            <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input type="checkbox" name="pets" checked={pets} onChange={handleChange} />
            <label htmlFor="breakfast">pets</label>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RoomsFilter;
