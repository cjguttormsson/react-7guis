import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Launcher from "./components/Launcher";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Launcher />
  </React.StrictMode>
);
