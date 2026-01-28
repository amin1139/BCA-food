import React from "react";
import Navbar from "./src/component/Header";
import RestaurantCardDemo from "./src/component/RestaurantCard";

function App() {
  return (
    <div>
        <div><Navbar/></div>
        <RestaurantCardDemo/>
      <h1>Hello React 🚀</h1>
      <p>React is working with Parcel!</p>
    </div>
  );
}

export default App;
