import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// importing store.js file cuz i'm using redux's createStore for learning purpose.
import "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
