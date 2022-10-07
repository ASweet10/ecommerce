import React, {createContext, useContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast'; //pop-up notifications

const Context = createContext();

export const StateContext =  ({ children }) => {
    const [showCart, setShowCart] = useState(false); //Don't show cart at first
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1); //Initialize Quantity to 1

    let foundProduct;
    let index;

    //Increase cart item qty
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    //Decrease cart item qty
    const decQty = () => {
        setQty((prevQty) => {
            //If qty < 1, return 1. Else, decrement qty
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }
    const toggleCartItemQuantity = (id, value) => {
        //Change item quantity with same id as prop
        foundProduct = cartItems.find( (item) => item._id === id);
        //Use filter instead of splice to not mutate the state
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'inc') {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
        }
        else if(value === 'dec') {
            if(foundProduct.quantity > 1) {
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
            }
        }
    }

    const onAdd = (product, quantity) => {
        //Checking cartItems state & looping through all items
        // Is the item already in the cart?
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        //Increase total price
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        //Increase item quantity
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        //If item already in cart,
        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart`);
    }

    const onRemove = (product) => {
        //Change item quantity with same id as prop
        foundProduct = cartItems.find( (item) => item._id === product._id);
        //Use filter instead of splice to not mutate the state
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                toggleCartItemQuantity,
                onRemove
            }}
        >
        {children} 
        </Context.Provider>
    )
}

//Allows to use state like a hook
export const useStateContext = () => useContext(Context);
