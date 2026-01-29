import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { getResData } from "../api/restaurantData";

export const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [headerTitle, setHeaderTitle] = useState('')

    useEffect (() => {
        fetchRestaurants();
    },[])

    const fetchRestaurants = async ( ) => {
        const data = await getResData();
        const resList = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setRestaurants(resList);
        setHeaderTitle(data?.data?.cards[1]?.card?.card?.header?.title)
    }

  return (
    
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{headerTitle}</h1>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((res) => (
            <RestaurantCard key={res.info.id} resData = {res.info} />
          ))}
        </div>
      </div>
    </div>
  );
};