import React from 'react';

const RestaurantCard = ({ resData }) => {

  const {
    name,
    cuisines,
    avgRating,
    areaName,
    cloudinaryImageId,
    sla,
    aggregatedDiscountInfoV3
  } = resData;


  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <img 
          src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' + cloudinaryImageId} 
          alt={name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {aggregatedDiscountInfoV3 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-bold text-xl">{aggregatedDiscountInfoV3?.header +' ' + aggregatedDiscountInfoV3?.subHeader}</p>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="pt-3">
        {/* Restaurant Name */}
        <h3 className="text-lg font-bold text-gray-800 truncate mb-1">
          {name}
        </h3>

        {/* Rating and Delivery Time */}
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1">
            <div className="bg-green-600 rounded-full p-0.5">
              <svg 
                className="w-3 h-3 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">{avgRating}</span>
          </div>
          <span className="text-gray-800 font-semibold">•</span>
          <span className="text-sm font-semibold text-gray-800">{sla?.slaString}</span>
        </div>

        {/* Cuisines */}
        <p className="text-sm text-gray-500 truncate mb-1">
          {cuisines.join(", ")}
        </p>

        {/* Location */}
        <p className="text-sm text-gray-500 truncate">
          {areaName}
        </p>
      </div>
    </div>
  );
};

// Example usage with sample data


export default RestaurantCard;