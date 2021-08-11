import App from "./components/App";
import { TrackerProvider } from "./components/TrackerContext";
import React from "react";
import ReactDOM from "react-dom";
import CurrentUserProvider from "./components/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <TrackerProvider>
        <App />
      </TrackerProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
