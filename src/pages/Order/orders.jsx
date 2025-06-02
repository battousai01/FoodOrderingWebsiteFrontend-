import React, { use, useContext, useState, useEffect } from 'react'
import { FoodContext } from '../../context/Foodcontext'
import { backendUrl } from '../../App'
import axios, { all } from 'axios'
import './order.css'

const Order = () => {

  const { token, currency } = useContext(FoodContext)

  const [orderData, setOrderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(`${backendUrl}/api/orders/userorders`, {}, { headers: { token } })
      console.log('API response:', response.data);
      if (response.data.success) {
        let allOrdersItem = []

        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;

            allOrdersItem.push(item)

          })   
        })
        setOrderData(allOrdersItem);
      }
    } catch (error) {
      console.log(error);

    }
  }


  //log to check orderData is loaded
 useEffect(() => {
  console.log('orderData:', orderData);
}, [orderData]);

  useEffect(() => {
    loadOrderData()
  }, [token])
  
  
  return (
    <div>
      <div className="orders-container">
        <div className="order-title">
          <h1>My Orders</h1>
        </div>
        <div>
          {
            orderData.map((item, index) => {
               console.log('Order item:', item); // check if item.image is defined
              return (
              <div className='order-item-container' key={index}>
                <div className="order-item-details">
                  <img src={item.image} alt="" className='order-item-image' />
                  <div>
                    <p className="order-item-name">{item.name}</p>
                    <div className="order-item-info">
                      <p>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className='order-item-date'>Date: <span>{new Date(item.date).toLocaleString()}</span></p>
                    <p className='order-item-payment'>Payment: <span>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className="order-item-status-container">
                  <div className="order-item-status">
                    <p className="status-indicator"></p>
                    <p>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='track-order-btn'>Track Order</button>
                </div>
                
              </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Order