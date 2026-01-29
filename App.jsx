import React from "react";
// import { useEffect } from "react";
import Navbar from "./src/component/Header";
import { RestaurantList } from "./src/component/Body";

function App() {

  // useEffect(() => {
  //     getResData();
  // }, [])
  
  // const getResData = async () => {
  //     const rawdata = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.4281881&lng=81.8019227&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
  
  //     const data = await rawdata.json();
  //     console.log(data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  // }
  
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
