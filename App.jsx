import React from "react";
import { Outlet } from "react-router";
import Navbar from "./src/component/Header";


function App() {
  
  return (
    <div>
        <div><Navbar/></div>
        <Outlet/> 
    </div>
  );
}

export default App;
