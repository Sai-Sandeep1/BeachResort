import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18
import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RoomProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of render

root.render(
  <RoomProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RoomProvider>
);

// Service worker for offline capabilities (optional)
serviceWorker.unregister();
