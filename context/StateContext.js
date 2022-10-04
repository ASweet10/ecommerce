import React, {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast'; //pop-up notifications

const Context = createContext();

export const StateContext =  ({ children }) => {
    const [showCart, setShowCart] = useState(false); //Don't show cart at first
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setQty] = useState(1); //Initialize Quantity to 1

    //Increase cart item qty
    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    //Decrease cart item qty
    const decQty = () => {
        setQty((prevQty) => {
            //If qty < 1, return 1. Else, decrement qty
            if(prevQty -1 < 1) return 1;

            return prevQty - 1;
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
            }}
        > {children} </Context.Provider>
    )
}

//Allows to use state like a hook
export const useStateContext = () => useContext(Context);
