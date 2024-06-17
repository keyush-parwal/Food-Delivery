import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{

    const [cartItems, SetcartItems]=useState({});
    const url="http://localhost:4000";
    const [token,setToken]=useState('');
    const [food_list,setFoodList]=useState([]);

    const addToCart=async (itemId)=>{
        if(!cartItems[itemId]){
            SetcartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            SetcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }

        if(token){
            await axios.post(url+'/api/cart/add',{itemId},{headers:{token}})
        }
    }

    const removeFromCart= async (itemId)=>{
        SetcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;

            for(const item in cartItems){
                if(cartItems[item]>0){
                    let itemInfo=food_list.find((product)=>product._id===item);
                    totalAmount+=itemInfo.price*cartItems[item];
                }
            }

            return totalAmount;

    }

    const fetchFoodList=async()=>{
        const response=await axios.get(url+'/api/food/list');
        setFoodList(response.data.data);
    }



    // if we refresh the page then also we want to keep the cart items in the cart
    const loadCartData = async (token) => {
        const response=await axios.post(url+'/api/cart/get',{},{headers:{token}});
        SetcartItems(response.data.cartData);
    }

    // If we relaod the page so we don't get logout , we want to keep the token in the local storage
    useEffect(()=>{

        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem('token'));
            }
        }

        loadData();
    },[])

    const contextValue= {
        food_list,
        cartItems,
        SetcartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;