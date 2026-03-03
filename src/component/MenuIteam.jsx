import React, { memo } from 'react';
import { GiRainbowStar } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { addIteam, minusQuantity } from "../utils/cartSlice";

const MenuIteam = ({ itemCards, IMG_URL }) => {

    const dispatch = useDispatch()

    const handleCartBtn = (iteam) => {
        dispatch(addIteam(iteam))
    }

    const handleMinusQuantity = (id) => {
        dispatch(minusQuantity(id))
    }

    const cartIteam = useSelector((store) => store.cart.iteams)
    console.log('menu iteam'); 
    return (
        <>
            {itemCards.map((card) => {
                const item = card?.card?.info;
                const cartItem = cartIteam.find(ci => ci.id === item.id)
                return (<div key={item.id} className="flex gap-4">
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
                                <h4 className=" font-semibold text-gray-800 text-lg mb-1 dark:text-slate-100">
                                    {item.name}
                                    {item.isBestseller && <span className="ml-2 font-semibold text-yellow-400 text-sm mb-1 dark:text-slate-100">
                                        <GiRainbowStar />Best Seller
                                    </span>}
                                </h4>
                                <p className="font-semibold text-gray-700 mb-2 dark:text-slate-200">
                                    Rs {item?.price / 100 || item?.defaultPrice / 100}
                                </p>
                                <p className="text-sm text-gray-500 leading-relaxed dark:text-slate-400">
                                    {item.description}
                                </p>
                            </div >
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative shrink-0">
                        <img
                            src={IMG_URL + item.imageId}
                            alt={item.name}
                            className="w-36 h-36 object-cover rounded-xl"
                        />

                        {
                            
                            cartItem ?

                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold py-2 rounded-lg  shadow-md border border-gray-200 uppercase text-sm  flex gap-2 dark:bg-slate-800 dark:border-slate-600">
                                    <button onClick={() => handleCartBtn(item)} className="px-4 hover:bg-gray-300 cursor-pointer">
                                        +
                                    </button>
                                    <div>
                                        {cartItem.quantity}
                                    </div>
                                    <button onClick={() => handleMinusQuantity(item?.id)} className="px-4 hover:bg-gray-300 cursor-pointer">
                                        -
                                    </button>
                                </div> :

                                <button onClick={() => handleCartBtn(item)} className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-green-600 font-bold px-8 py-2 rounded-lg cursor-pointer shadow-md border border-gray-200 uppercase text-sm hover:bg-gray-300 dark:bg-slate-800 dark:border-slate-600">
                                    ADD
                                </button>
                        }

                    </div>
                </div>)
            })}
        </>
    )
}
export default memo(MenuIteam);