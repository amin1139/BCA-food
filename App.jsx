import React from "react";
import { Outlet } from "react-router";
import Navbar from "./src/component/Header";


function App() {
  
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
        <div><Navbar/></div>
        <Outlet/> 
    </div>
  );
}

export default App;
