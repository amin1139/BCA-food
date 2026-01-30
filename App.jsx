import React from "react";
import Navbar from "./src/component/Header";
import RestaurantList  from "./src/component/Body";


function App() {
  
  return (
    <div>
        <div><Navbar/></div>
        <RestaurantList/>
      <h1>Hello React 🚀</h1>
      <p>React is working with Parcel!</p>
    </div>
  );
}

export default App;
