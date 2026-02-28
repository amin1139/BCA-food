import React from "react";
import { Outlet } from "react-router";
import Navbar from "./src/component/Header";
import { Provider } from "react-redux";
import appStore from "./src/utils/appStore";

function App() {
  
  return (
    <Provider store={appStore}>
      <div className="min-h-screen bg-white text-gray-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
          <div><Navbar/></div>
          <Outlet/> 
      </div>
    </Provider>
  );
}

export default App;
