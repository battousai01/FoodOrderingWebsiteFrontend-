import React, { createContext,useEffect,useState } from "react";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {product} from "../assets/assets";
//import { backendUrl } from "../App";
import axios from 'axios'

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const FoodContext = createContext();

const FoodContextProvider = ({ children }) => {


    const deliverly_fee = 12;
    const currency = '$'

    //const [products, setProducts] = useState(product);
    const [products, setProducts] = useState([]); // Start with an empty array
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('')

    const navigate = useNavigate();

    const addToCart = async (itemId) => {
        const updateCart = {...cartItems};
        updateCart[itemId] = (updateCart[itemId] || 0) + 1;
        setCartItems(updateCart);

        console.log(`${itemId} added to cart`); 

        toast.success('Add to cart');

        if(token){
            try{
                await axios.post(`${backendUrl}/api/cart/add`,{itemId},{headers: {token}})
            }catch(error){
                console.log(error);
                toast.error(error.message)
            }
        }
    }    


    const getCartCount = () => {
        if (!cartItems || typeof cartItems !== 'object') return 0;
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    }

    const updateQuantity = async(itemId, quantity) => {
        let cartData = {...cartItems};
        cartData[itemId] = quantity;
        setCartItems(cartData);  

        if(token){
            try{
                await axios.post(`${backendUrl}/api/cart/update`,{itemId,quantity},{headers: {token}})
            }catch(error){
                console.log(error);
                toast.error(error.message)
            }
        }

    }    

    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, quantity]) => {
            const itemInfo = products.find(product => product.id === Number(itemId));
            return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount;
        }, 0);
    }    

    const getProductsData = async() => {
        try{
            const response = await axios.get(`${backendUrl}/api/product/list`)
            console.log(response.data)

            if(response.data.success){
                setProducts(response.data.products)
                 console.log('products from API:', response.data.products); //Log the products after fetching
            }else{
                toast.error(response.data.message)
            }

        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }


    const getUserCart = async(token) => {
        try{
            const response = await axios.post(`${backendUrl}/api/cart/get`,{},{headers: {token}})
            
            if(response.data.success && Array.isArray(response.data.cartData)){
                const cartObj = {};
                response.data.cartData.forEach(item => {
                    cartObj[item.productId] = item.quantity;
                });
                setCartItems(cartObj);
            } else {
                setCartItems({});
            }
        }catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        getProductsData()
    },[])

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    useEffect(() => {
        if(token){
            getUserCart(token);
        }
    }, [token]);

    // Add the resetCart function
    const resetCart = () => {
        setCartItems({});
    };
    
    const logout = async () => {
        if(token){
            await axios.post(`${backendUrl}/api/cart/clear`, {}, { headers: { token } });
        }
        setCartItems({});
        setToken('');
        localStorage.removeItem('token');
        navigate('/login');
        
    };

    return (
        <FoodContext.Provider value={{products,cartItems,setCartItems,getUserCart,navigate,currency,getCartAmount,addToCart,deliverly_fee,getCartCount,updateQuantity , token , setToken, logout }}>
            {children}
        </FoodContext.Provider>
    )   

}

export default FoodContextProvider;