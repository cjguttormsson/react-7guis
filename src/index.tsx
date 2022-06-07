import React from "react";
import ReactDOM from "react-dom/client";
import Launcher from "./components/Launcher";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Launcher location={decodeURIComponent(window.location.hash.replace(/^#/, ""))} />
  </React.StrictMode>
);
