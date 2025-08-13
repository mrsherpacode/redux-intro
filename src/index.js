import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// importing store.js file cuz i'm using redux's createStore for learning purpose.
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* provider is from react-redux which connects react to redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
