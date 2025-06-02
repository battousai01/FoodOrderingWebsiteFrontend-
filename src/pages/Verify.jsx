/*import React,{useContext} from "react};
import { FoodContext } from "../context/Foodcontext";
import { useSearchParams } from "react-router-dom";
import { backendUrl } from "../App";
import { use } from "react";
import { useEffect } from "react";
const Verify = () => {
    const {navigate,token,setCartItems} = useContext(FoodContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const  success = searchParams.get("success");
    const  orderId = searchParams.get("orderId");

    const verifyPayment = async () => {
        try{
            if(!token){
                
                return null;
            }   
            const response = await axios.post(backendUrl + "/api/orders/verifyStripe",
                {success, orderId}, {headers: {token} }
            ); 
            if(response.data.success){
                setCartItems({});
                navigate('/orders');
                toast.success('Orer Placed Successfully');
            }
            else{
                navigate('/cart');
                toast.error('Order Failed');
            }
        }catch (error){
            console.log(error);
            toast.error('Something went wrong while verifying payment');
    }
    };
     useEffect(()=>{
        verifyPayment()
     },[token])
    return(
        <div>Verify</div>
    )
}*/
// Example: frontend/src/pages/Verify.jsx
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { FoodContext } from "../context/Foodcontext";

const Verify = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const success = params.get("success");
  const orderId = params.get("orderId");
  const { userId, token } = useContext(FoodContext);

  useEffect(() => {
    if (orderId && success && token) {
      axios.post(
        `${backendUrl}/api/orders/verifyStripe`,
        { orderId, success, userId },
        { headers: { token } }
      );
    }
  }, [orderId, success, userId, token]);

  return (
    <div>
      {success === "true" ? "Payment successful!" : "Payment failed or canceled."}
    </div>
  );
};

export default Verify;