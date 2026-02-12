import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react"; 
import FilterBtn from "./FilterBtn";
import { Link } from "react-router";
import { RES_LIST_URL } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";
import useFetchData from "../utils/useFetchData";

const RestaurantList = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [searchText, setSearchText] = useState ('')
  const status = useOnlineStatus()
  const {resData, loading, error} = useFetchData(RES_LIST_URL)

  const restaurants = resData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
  const headerTitle = resData?.data?.cards[1]?.card?.card?.header?.title


  useEffect(()=>{
    if(restaurants.length > 0) {setFilteredRestaurants(restaurants)};
  },[restaurants])

  const searchFilter = () => {
    const searchRes = restaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase().trim()))
    setFilteredRestaurants(searchRes)
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
    return <div className="px-6 py-10 text-3xl font-bold text-gray-800 dark:text-slate-100">NO INTERNET</div>
  }
  
  if (loading) {
    return <div className="mt-6"><Shimmer /></div>
  }

  if(error){
    return <><h1>OOPs!!! </h1> <br /> <h1> SOMETHING WENT WRONG </h1> <h2>{error.status}</h2></>
  }
  console.log(error);
  

  if (filteredRestaurants?.length === 0) {
    return <div className="min-h-screen flex flex-col justify-center items-center gap-4 px-6">
      <div className="text-3xl font-bold text-gray-800 dark:text-slate-100">OPPs!!! NOT FOUND "{searchText}"</div>
      <button
        onClick={()=>{
          setFilteredRestaurants(restaurants)
          setActiveFilter(false)
          setSearchText('')
        }}
        className="rounded-md border border-gray-300 px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        BACK
      </button>
    </div>
  }

  
  return (

    <div className="min-h-screen bg-gray-50 p-6 transition-colors dark:bg-slate-900">
      
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 dark:text-slate-100">{headerTitle}</h1>

        <div className="mb-5">
          <input
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-800 outline-none focus:ring-2 focus:ring-blue-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-sky-500"
            type="text"
            value={searchText}
            onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchFilter();
            }
          }} onChange={(e) => setSearchText(e.target.value)} />
          <button
            onClick={searchFilter}
            className="ml-2 rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Search
          </button>
        </div>

        <div className="flex gap-2 items-center font-bold text-lg mb-8 text-gray-800 dark:text-slate-100">
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
