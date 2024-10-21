import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.min.css";
import { AuthProvaider } from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <AuthProvaider>
          <App />
        </AuthProvaider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
