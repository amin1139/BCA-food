import { useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import { RiCoupon2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { IMG_URL } from "../utils/constant";
import { addIteam, minusQuantity } from "../utils/cartSlice";

const Cart = () => {

    const dispatch = useDispatch()
    
    const handleAddBtn = (iteam)=>{
        dispatch(addIteam(iteam))
    }

    const handleMinusQuantity = (id) => {
        dispatch(minusQuantity(id))
    }

    const cartIteam = useSelector((store)=> store.cart.iteams)

    const itemTotal = cartIteam.reduce((total, item) => {
        return total + (Math.round(item?.price / 100) * item.quantity);
    }, 0);

    if (cartIteam.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-xl font-semibold">Your cart is empty</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-120 bg-white rounded-2xl shadow-xl overflow-hidden font-sans">

                {/* Header */}
                <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        {/* Restaurant name */}
                        <div>
                            <h2 className="text-base font-bold text-gray-900 leading-tight">Restaurant Name</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Civil Lines</p>
                            {/* Underline accent */}
                            <div className="w-8 h-0.5 bg-red-500 mt-1.5 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto max-h-130 no-scrollbar">

                    {/* Cart Item */}
                    
                    {cartIteam.map((iteam)=>{

                        return(<div key={iteam.id} className="px-5 py-4 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-3">
                            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-yellow-50 border border-gray-100 shadow-sm">
                                <img
                                    src={IMG_URL + iteam?.imageId}
                                    alt="dish image"
                                    className="w-full h-full object-contain p-1"
                                />
                            </div>

                            <div className="flex items-start gap-2.5 flex-1">
                                {/* Veg indicator */}
                                <div className="mt-0.5 w-4 h-4 border-2 border-green-600 rounded-sm shrink-0 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{iteam?.name}</p>
                                    <button className="flex items-center gap-0.5 text-xs text-orange-500 font-medium mt-0.5 hover:text-orange-600 transition-colors">
                                        Customize {'>'}
                                    </button>
                                </div>
                            </div>

                            {/* Price + Qty */}
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 line-through leading-none">₹{iteam?.price/100}</p>
                                    <p className="text-sm font-bold text-gray-900">₹{iteam?.price/100}</p>
                                </div>
                                {/* Quantity stepper */}
                                <div className="flex items-center gap-0 border-2 border-green-600 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => handleMinusQuantity(iteam.id)}
                                        className="w-7 h-7 flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-7 h-7 flex items-center justify-center text-sm font-bold text-green-700 border-x-2 border-green-600">
                                        {iteam.quantity}
                                    </span>
                                    <button
                                        onClick={() => handleAddBtn(iteam)}
                                        className="w-7 h-7 flex items-center justify-center text-green-700 hover:bg-green-50 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>)})}

                    {/* Apply Coupon */}
                    <div className="px-5 py-4 border-b border-gray-100">
                        <button className="w-full flex items-center gap-3 border border-dashed border-gray-300 rounded-xl px-4 py-3 hover:border-orange-400 hover:bg-orange-50 transition-all group">
                            <RiCoupon2Line />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                                Apply Coupon
                            </span>
                            {'>'}
                        </button>
                    </div>

                    {/* Bill Details */}
                    <div className="px-5 py-4">
                        <h3 className="text-sm font-bold text-gray-900 mb-3">Bill Details</h3>
                        <div className="space-y-2.5">

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Item Total</span>
                                <span className="text-sm text-gray-800 font-medium">₹{itemTotal}</span>
                            </div>

                           
                        </div>
                    </div>
                </div>

                {/* TO PAY footer */}
                <div className="border-t-2 border-gray-200 px-5 py-4 flex items-center justify-between bg-white">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">TO PAY</span>
                <span className="text-lg font-extrabold text-gray-900">₹{itemTotal}</span>
                </div>

            </div>
        </div>
    );
}

export default Cart
