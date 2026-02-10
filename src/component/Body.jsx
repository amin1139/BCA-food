import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react"; 
import { getResData } from "../api/restaurantData";
import FilterBtn from "./FilterBtn";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('')
  const [searchText, setSearchText] = useState ('')
  const status = useOnlineStatus()

  useEffect(() => {
    fetchRestaurants();
    console.log('fetch');
  }, [])

  


  const fetchRestaurants = async () => {
    const data = await getResData();
    console.log(data);
    
    const resList = data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    setRestaurants(resList);
    setFilteredRestaurants(resList);
    setHeaderTitle(data?.data?.cards[1]?.card?.card?.header?.title)
    console.log(resList);
  }

  const searchFilter = () => {
    const searchRes = restaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase().trim()))
    setFilteredRestaurants(searchRes)
    setSearchText('')
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

  if(!status){
    return <div className=" text-3xl font-bold">NO INTERNET</div>
  }

  if (restaurants.length === 0) {
    return <div className="mt-6"><Shimmer /></div>
  }

  if (filteredRestaurants.length === 0) {
    return <div className="min-h-screen flex items-center">
      <div className=" text-3xl font-bold">OPPs!!! NOT FOUND</div>
      <button onClick={()=>setFilteredRestaurants(restaurants)}> BACK </button>
    </div>
  }

  

  return (

    <div className="min-h-screen bg-gray-30 p-6">
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{headerTitle}</h1>

        <div className="mb-5">
          <input className="outline-1" type="text" value={searchText} onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchFilter();
            }
          }} onChange={(e) => setSearchText(e.target.value)} />
          <button onClick={searchFilter} className="outline-1">Search</button>
        </div>

        <div className="flex gap-2 items-center font-bold text-lg mb-8">
          <h2>Filter By :</h2>
          
          {filtertitle.map((e) => (
            <FilterBtn key={e.type} title={e.title} isActive={activeFilter === e.type} onClick={() => applyFilter(e.type, e.fn)} all={reset} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((res) => (
            <Link key={res.info.id} to={'restaurants/'+res.info.id}> <RestaurantCard key={res.info.id} resData={res.info} /> </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RestaurantList