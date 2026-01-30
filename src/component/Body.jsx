import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import { getResData } from "../api/restaurantData";
import FilterBtn from "./FilterBtn";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('')

  useEffect(() => {
    fetchRestaurants();
  }, [])

  const fetchRestaurants = async () => {
    const data = await getResData();
    const resList = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    setRestaurants(resList);
    setFilteredRestaurants(resList);
    setHeaderTitle(data?.data?.cards[1]?.card?.card?.header?.title)
  }

  const applyFilter = (type, fn) => {
    setActiveFilter(type);
    fn();
  };

  const filterTopRated = () => {
    const topRated = restaurants.filter(
      (res) => res.info.avgRating >= 4.5
    );
    setFilteredRestaurants(topRated);
  };

  const filterVeg = () => {
    const vegRes = restaurants.filter(
      (res) => res.info.veg === true
    );
    setFilteredRestaurants(vegRes);
  };

  const filterFastDelivery = () => {
    const fast = restaurants.filter(
      (res) => res.info.sla.deliveryTime <= 25
    );
    setFilteredRestaurants(fast);
  };


  const reset = () => {
    setFilteredRestaurants(restaurants);
    setActiveFilter(false)
  }

  const filtertitle = [
      {title: 'Rating 4.5+',
        fn: filterTopRated,
        type: 'RATING'
      },
      {title: 'Veg',
        fn: filterVeg,
        type: 'VEG'
      },
      {title: 'Delivery in 25 min',
        fn: filterFastDelivery,
        type: 'DELIVERY'
      },
  ]

  if (restaurants.length === 0) {
    return <div className="mt-6"><Shimmer /></div>
  }

  return (

    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{headerTitle}</h1>
        <div className="flex gap-2 items-center font-bold text-lg mb-8">
          <h2>Filter By :</h2>
          {filtertitle.map((e) => (
            <FilterBtn key={e.type} title={e.title} isActive={activeFilter === e.type} onClick={() => applyFilter(e.type, e.fn)} all={reset} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((res) => (
            <RestaurantCard key={res.info.id} resData={res.info} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default RestaurantList