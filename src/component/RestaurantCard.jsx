import React from 'react';

const RestaurantCard = ({ 
  image, 
  name, 
  rating, 
  deliveryTime, 
  cuisines, 
  location,
  offer 
}) => {
  return (
    <div className="w-full max-w-sm rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {offer && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-bold text-xl">{offer}</p>
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
            <span className="text-sm font-semibold text-gray-800">{rating}</span>
          </div>
          <span className="text-gray-800 font-semibold">•</span>
          <span className="text-sm font-semibold text-gray-800">{deliveryTime}</span>
        </div>

        {/* Cuisines */}
        <p className="text-sm text-gray-500 truncate mb-1">
          {cuisines}
        </p>

        {/* Location */}
        <p className="text-sm text-gray-500 truncate">
          {location}
        </p>
      </div>
    </div>
  );
};

// Example usage with sample data
const RestaurantCardDemo = () => {
  const restaurants = [
    {
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/1/9/40408979-8937-40d6-9ca9-d9af67a23391_253769.JPG",
      name: "McDonald's",
      rating: "4.4",
      deliveryTime: "30-35 mins",
      cuisines: "American",
      location: "Civil Lines",
      offer: "ITEMS AT ₹117"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Restaurants Near You</h1>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} {...restaurant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardDemo;