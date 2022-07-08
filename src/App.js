import React, { useState } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
// import { UserContext } from "./context/UserContext";

export default function App() {
  const [sideBar, setSideBar] = useState(true);

  return (
    <div className="w-full">
      <Navbar sideBar={sideBar} setSideBar={setSideBar} />
      <Home sideBar={sideBar} setSideBar={setSideBar} />
    </div>
  );
}
