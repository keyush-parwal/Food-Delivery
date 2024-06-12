import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

    const [cartItems, SetcartItems]=useState({});

    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            SetcartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            SetcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart=(itemId)=>{
        SetcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }

    const contextValue= {
        food_list,
        cartItems,
        SetcartItems,
        addToCart,
        removeFromCart
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;