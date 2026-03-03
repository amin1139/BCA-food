import React, { useState } from 'react';
import {ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useParams } from 'react-router';
import { MenuShimmer } from './Shimmer';
import { IMG_URL } from '../utils/constant';
import { RES_MENU_URL } from "../utils/constant"
import useFetchData from '../utils/useFetchData';
import MenuSection from './MenuSection';

export default function RestaurantPage() {

  const { resId } = useParams();

  const { resData, loading, error } = useFetchData(RES_MENU_URL + resId);

  const resName = resData?.data?.cards[0]?.card?.card?.text;
  const resInfo = resData?.data?.cards[2]?.card?.card?.info;
  const dealInfo = resData?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || [];
  const menuList =
    resData?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      ?.map((item) => item?.card?.card)
      ?.filter((card) => card?.itemCards || card?.categories) || [];

  console.log('res menu');

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
            <span className="uppercase tracking-wider font-serif font-style:italic">MENU</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-slate-700"></div>
          </div>
        </div>

        <div className="space-y-4">
        <MenuSection menuList={menuList} />
        </div>
      </div>
    </div>
  );
}