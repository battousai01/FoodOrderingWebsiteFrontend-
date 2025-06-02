import React, {useContext, useState} from 'react'
import './checkout.css'
import strip from '../../assets/stripe_logo.png'
import CartTotal from '../../components/carttotal/cartTotal'
import { FoodContext } from '../../context/Foodcontext'
import axios from 'axios'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'

const checkout = () => {

  const [method, setMethod] = useState("cod")

  const {cartItems, setCartItems, getCartAmount, deliverly_fee, token, navigate, products} = useContext(FoodContext )

  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      zipcode: "",
      state: "",
      phone: "",
      country: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({
      ...data,
      [name]: value
    }))
  }

  const  onSubmitHandler = async (event) => {
      event.preventDefault();

      try{
        let orderItems = [];

        for (const productId in cartItems) {
          if (cartItems[productId] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => String(product.id) === String(productId))
            );
            if (itemInfo) {
              itemInfo.quantity = cartItems[productId];
              orderItems.push(itemInfo);
            }
          }
        }
        console.log("orderItems:", orderItems);
        console.log("cartItems:", cartItems);//log check cartItems

        let orderData = {
          address: formData,
          items:  orderItems,
          amount: getCartAmount() + deliverly_fee
        }

        switch (method) {
          case "cod":
            console.log("token sent to backend:", token);//log check token that sent in request
            const response = await axios.post(
              `${backendUrl}/api/orders/place`,
              orderData,
              { headers: { token } }
            );
            if(response.data.success){
              setCartItems({})
              navigate("/orders")
            }else{
              toast.error(response.data.message)
            }
            break;
        
            case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/orders/stripe', 
              orderData, { headers: { token } }
            );
            if(responseStripe.data){
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
            break;

          default:
            break;
        }
      }catch(error){
        console.log(error);
        toast.error(error.message)
      }
  }
  return (
    <div>
      <form className='form-container' onSubmit={onSubmitHandler}>
        <div className="form-left">
          <fieldset className='payment-method'>
            <legend>Payment Options</legend>
            <div className="payment-options">
              <div onClick={() => setMethod("stripe")} className={`payment-option ${method === "stripe" ? "selected" : ""}`}>
                <img src={strip} alt="stripe" className='payment-logo'/>
              </div>
              <div onClick={() => setMethod("cod")} className={`payment-option ${method === "cod" ? "selected" : ""}`}>
                <span className="payment-text">CASH ON DELIVERY</span>
              </div>
            </div>
          </fieldset>  

           <div className='form-title'>
              <h2>Shipping Address</h2>
           </div>
           <div className="form-row">
            <input type="text" name='firstName' value = {formData.firstName} onChange={onChangeHandler} className='form-input' placeholder='First Name'/>
            <input type="text" name='lastName' value = {formData.lastName} onChange={onChangeHandler} className='form-input'placeholder='Last Name'/>
           </div>
           <input type='email' name='email' value = {formData.email} onChange={onChangeHandler} className='form-input' placeholder='Email Address'/>
           <input type='text' name='phone' value = {formData.phone} onChange={onChangeHandler} className='form-input' placeholder='Phone Number'/>
           <input type='text' name='street' value = {formData.street} onChange={onChangeHandler} className='form-input' placeholder='Street Address'/>
           <div className="form-row">
            <input type="text" name='city' value = {formData.city} onChange={onChangeHandler} className='form-input' placeholder='City'/>
            <input type="text" name='state' value = {formData.state} onChange={onChangeHandler} className='form-input' placeholder='State'/>
           </div>
           <div className="form-row">
            <input type="text" name='zipcode' value = {formData.zipcode} onChange={onChangeHandler} className='form-input' placeholder='Zipcode'/>
            <input type="text" name='country' value = {formData.country} onChange={onChangeHandler} className='form-input' placeholder='Country'/>
           </div>
        </div>

        <div className="form-right">
          <CartTotal/> 
          <div className="form-summnit">
            <button type='submit' className='submit-button'>PLACE ORDER</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default checkout