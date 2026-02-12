import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useParams } from 'react-router';
import { MenuShimmer } from './Shimmer';
import { IMG_URL } from '../utils/constant';
import { RES_MENU_URL } from "../utils/constant"
import useFetchData from '../utils/useFetchData';

export default function RestaurantPage() {

  const [expandedCategories, setExpandedCategories] = useState({});

  const { resId } = useParams();

  const { resData, loading, error } = useFetchData(RES_MENU_URL + resId);

  console.log(resData)
  console.log(loading)
  console.log(error)

  const resName = resData?.data?.cards[0]?.card?.card?.text;
  const resInfo = resData?.data?.cards[2]?.card?.card?.info;
  const dealInfo = resData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || [];
  const menuList =
    resData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      ?.map((item) => item?.card?.card)
      ?.filter((card) => card?.itemCards) || [];

  const getUniqueItems = (itemCards) => {
    return [
      ...new Map(
        itemCards.map((item) => [
          item.card.info.id,
          item.card.info
        ])
      ).values()
    ];
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => (
      {
        ...prev,
        [categoryId]: !prev[categoryId],
      }
    ));
  };

  const scrollDeals = (direction) => {
    const container = document.getElementById('deals-container');
    const scrollAmount = 300;
    if (!container) {
      return;
    }

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  if (loading) {
    return (<MenuShimmer />);
  }

  if (error) return <h1>Error...</h1>

  return (
    <div className="min-h-screen bg-gray-50 transition-colors dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Restaurant Name */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6 dark:text-slate-100">{resName}</h1>

        {/* Restaurant Info Box */}
        <div className="bg-linear-to-b from-white to-gray-50 rounded-2xl shadow-sm border border-gray-200 p-5 mb-8 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
              <Star size={14} fill="white" />
              <span className="text-sm font-semibold">{resInfo?.avgRatingString}</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-slate-300">
              ({resInfo?.totalRatingsString} ratings)
            </span>
            <span className="text-gray-400 dark:text-slate-500">|</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-slate-200">{resInfo?.costForTwoMessage}</span>
          </div>

          <div className="text-orange-500 text-sm font-semibold mb-3 underline cursor-pointer">
            {resInfo?.cuisines.join(', ')}
          </div>

          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-slate-500"></div>
              <div className="w-0.5 h-6 bg-gray-300 dark:bg-slate-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-slate-500"></div>
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <span className="font-semibold text-gray-800 dark:text-slate-100">Outlet</span>
                <span className="text-gray-600 ml-3 dark:text-slate-300">{resInfo?.areaName}</span>
              </div>
              <div className="font-semibold text-gray-800 dark:text-slate-100">{resInfo?.sla?.slaString}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold text-lg">one</span>
              <span className="text-sm text-gray-700 dark:text-slate-200">
                Free delivery on orders above <span className="font-semibold">Rs 199</span>
              </span>
            </div>
          </div>
        </div>

        {/* Deals for you */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">Deals for you</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollDeals('left')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <ChevronLeft size={20} className="text-gray-600 dark:text-slate-300" />
              </button>
              <button
                onClick={() => scrollDeals('right')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <ChevronRight size={20} className="text-gray-600 dark:text-slate-300" />
              </button>
            </div>
          </div>

          <div
            id="deals-container"
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {dealInfo.map((deal) => (
              <div
                key={deal?.info?.offerIds[0]}
                className="shrink-0 w-60 border-2 border-gray-200 rounded-xl p-2 hover:shadow-md transition-shadow cursor-pointer dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-black/30"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <img src={IMG_URL + deal?.info?.offerLogo} alt="offer" className="h-15 object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg dark:text-slate-100">{deal?.info?.header}</div>
                    <div className="text-gray-500 text-xs dark:text-slate-400">{deal?.info?.primaryDescription || ''}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm dark:text-slate-500">
            <div className="h-px w-12 bg-gray-300 dark:bg-slate-700"></div>
            <span className="uppercase tracking-wider">MENU</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-slate-700"></div>
          </div>
        </div>

        <div className="space-y-4">
          {menuList.map((menu) => {
            const uniqueItems = getUniqueItems(menu.itemCards);
            return (
              <div key={menu?.categoryId} className="border-b border-gray-200 last:border-b-0 dark:border-slate-700">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(menu?.categoryId)}
                  className="w-full flex items-center justify-between py-5 hover:bg-gray-50 transition-colors dark:hover:bg-slate-800"
                >
                  <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                    {menu?.title} ({menu.itemCards.length})
                  </h3>

                  <ChevronDown
                    className={`text-gray-700 dark:text-slate-300 transition-transform duration-300 ${expandedCategories[menu?.categoryId] ? 'rotate-180' : ''
                      }`}
                    size={24}
                  />

                </button>

                {/* Category Items */}
                <div
                  className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${expandedCategories[menu.categoryId]
                      ? 'max-h-250 opacity-100 translate-y-0'
                      : 'max-h-0 opacity-0 -translate-y-2'}
                `}
                >
                  <div className="pt-4 pb-6 space-y-6">
                    {uniqueItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        {/* Item Details */}
                        <div className="flex-1">
                          <div className="flex items-start gap-2 mb-2">
                            <div
                              className={`w-4 h-4 border-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'
                                } flex items-center justify-center mt-1`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'
                                  }`}
                              ></div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg mb-1 dark:text-slate-100">
                                {item.name}
                              </h4>
                              <p className="font-semibold text-gray-700 mb-2 dark:text-slate-200">
                                Rs {item?.price / 100 || item?.defaultPrice / 100}
                              </p>
                              <p className="text-sm text-gray-500 leading-relaxed dark:text-slate-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative shrink-0">
                          <img
                            src={IMG_URL + item.imageId}
                            alt={item.name}
                            className="w-36 h-36 object-cover rounded-xl"
                          />
                          <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold px-8 py-2 rounded-lg shadow-md border border-gray-200 uppercase text-sm dark:bg-slate-800 dark:border-slate-600">
                            ADD
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
