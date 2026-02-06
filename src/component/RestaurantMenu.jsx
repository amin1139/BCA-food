import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useParams } from 'react-router';
import { getResMenuData } from '../api/restaurantData';


export default function RestaurantPage() {

  const [resName, setResName] = useState('')
  const [resInfo, setResInfo] = useState()
  const [dealInfo, setDealInfo] = useState([])
  const [menuList, setMenuList] = useState([])
  const [expandedCategories, setExpandedCategories] = useState({});
  const [scrollPosition, setScrollPosition] = useState(0);
  const { resId } = useParams()
  const offerImgUrl = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/'



  useEffect(() => {
    fetchMenuData();
  }, [])

  const fetchMenuData = async () => {
    const data = await getResMenuData(resId);
    setResName(data.data.cards[0].card.card.text)
    setResInfo(data.data.cards[2].card.card.info)
    setDealInfo(data.data.cards[3].card.card.gridElements.infoWithStyle.offers)
    const onlyFoodCategories = data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards.map(item => item?.card?.card)
      .filter(card => card?.itemCards);
    setMenuList(onlyFoodCategories)
    console.log(menuList);
  };
  console.log(menuList);
  console.log(expandedCategories);

  const getUniqueItems = (itemCards) => {
    return [
      ...new Map(
        itemCards.map(item => [
          item.card.info.id,
          item.card.info
        ])
      ).values()
    ];
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => (
      {
        ...prev,
        [categoryId]: !prev[categoryId],
      }
    ));
  };

  const scrollDeals = (direction) => {
    const container = document.getElementById('deals-container');
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft - scrollAmount);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Restaurant Name */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{resName}</h1>

        {/* Restaurant Info Box */}
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-sm border border-gray-200 p-5 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
              <Star size={14} fill="white" />
              <span className="text-sm font-semibold">{resInfo?.avgRatingString}</span>
            </div>
            <span className="text-sm text-gray-600">
              ({resInfo?.totalRatingsString} ratings)
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-sm font-semibold text-gray-700">{resInfo?.costForTwoMessage}</span>
          </div>

          <div className="text-orange-500 text-sm font-semibold mb-3 underline cursor-pointer">
            {resInfo?.cuisines.join(", ")}
          </div>

          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center mt-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-0.5 h-6 bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
            <div className="flex-1">
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Outlet</span>
                <span className="text-gray-600 ml-3">{resInfo?.areaName}</span>
              </div>
              <div className="font-semibold text-gray-800">{resInfo?.sla?.slaString}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-bold text-lg">one</span>
              <span className="text-sm text-gray-700">
                Free delivery on orders above <span className="font-semibold">₹199</span>
              </span>
            </div>
          </div>
        </div>

        {/* Deals for you */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Deals for you</h2>
            <div className="flex gap-2">
              <button
                onClick={() => scrollDeals('left')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() => scrollDeals('right')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
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
                className="flex-shrink-0 w-60 border-2 border-gray-200 rounded-xl p-2 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div >
                    <img src={offerImgUrl + deal?.info?.offerLogo} alt="offer" className="h-15 object-contain" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">{deal?.info?.header}</div>
                    <div className="text-gray-500 text-xs">{deal?.info?.primaryDescription || ''}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <div className="h-px w-12 bg-gray-300"></div>
            <span className="uppercase tracking-wider">MENU</span>
            <div className="h-px w-12 bg-gray-300"></div>
          </div>
        </div>

        <div className="space-y-4">
          {menuList.map((menu) => {
          const uniqueItems = getUniqueItems(menu.itemCards);
          return(
            <div key={menu?.categoryId} className="border-b border-gray-200 last:border-b-0">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(menu?.categoryId)}
                className="w-full flex items-center justify-between py-5 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-800">
                  {menu?.title} ({menu.itemCards.length})
                </h3>

                <ChevronDown
                  className={`transition-transform duration-300 ${expandedCategories[menu?.categoryId] ? "rotate-180" : ""
                    }`}
                  size={24}
                />

              </button>

              {/* Category Items */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${expandedCategories[menu.categoryId]
                    ? "max-h-[1000px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2"}
                `}
              >
                <div className="pt-4 pb-6 space-y-6">
                  {uniqueItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <div
                            className={`w-4 h-4 border-2 ${item.isVeg ? "border-green-600" : "border-red-600"
                              } flex items-center justify-center mt-1`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"
                                }`}
                            ></div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg mb-1">
                              {item.name}
                            </h4>
                            <p className="font-semibold text-gray-700 mb-2">
                              ₹{item?.price/100 || item?.defaultPrice/100}
                            </p>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={offerImgUrl+item.imageId}
                          alt={item.name}
                          className="w-36 h-36 object-cover rounded-xl"
                        />
                        <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold px-8 py-2 rounded-lg shadow-md border border-gray-200 uppercase text-sm">
                          ADD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )})}
        </div>
      </div>
    </div>
  );
}