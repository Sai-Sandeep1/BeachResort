// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust if needed

export const fetchRooms = async () => {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
};

export const createRoom = async (roomData) => {
    const response = await axios.post(`${API_URL}/rooms`, roomData);
    return response.data;
};

export const fetchUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
};

export const fetchBookings = async () => {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
};
