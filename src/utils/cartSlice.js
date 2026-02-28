import { createSlice } from "@reduxjs/toolkit";
import { ActivityIcon } from "lucide-react";
import { BiAddToQueue } from "react-icons/bi";

const cartSlice = createSlice(
    {
        name: 'cart',
        initialState:{
            iteams:[],
        },
        reducers:{
            addIteam:(state, action)=>{
                const existingIteam = state.iteams.find(item => item.id === action.payload.id);
                if(existingIteam){
                    existingIteam.quantity += 1;
                }else{
                    state.iteams.push({
                        ...action.payload,
                        quantity: 1
                    })
                }
            },
            minusQuantity:(state, action)=>{
                const existingItem = state.iteams.find(item => item.id === action.payload);
                if(existingItem.quantity > 1){
                    existingItem.quantity -= 1;
                }else{
                    state.iteams = state.iteams.filter(item => item.id !== action.payload);
                }
            }
        }
    }
)

export const {addIteam, minusQuantity} = cartSlice.actions
export default cartSlice.reducer