import React from 'react'
import {FaFacebook, FaInstagram, FaYoutube} from 'react-icons/fa'
import './footer.css'
const footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-top">
          <h2>Need Update on Latest Offers?</h2>
          <p>Subscribe to our newsletter to get frequent update</p>
          <div className="input-footer">
            <input type='email' placeholder='Enter your email address' />
            <button>Join Now</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-left">
            <h2>Foodspot</h2>
            <div className='socials'>
              <FaFacebook className='social-icon'/>
              <FaInstagram className='social-icon'/>
              <FaYoutube className='social-icon'/>
            </div>
          </div>
          <div className="footer-right">
            <ul>
              <li>Home</li>
              <li>Services</li>
              <li>About Us</li>
              <li>Provacy policy</li>
            </ul>
          </div>
        </div>
        <p className="copy">90 2024 FoodSpot. All rights reserved.</p>
      </div>
    </div>
  )
}

export default footer