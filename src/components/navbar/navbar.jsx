import React, {useContext, useState}from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './navbar.css'
import {BiUser } from 'react-icons/bi';
import {BsCart} from 'react-icons/bs'
import { FoodContext } from '../../context/Foodcontext.jsx';
import { FaCentos } from 'react-icons/fa';

const Navbar = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { getCartCount, logout } = useContext(FoodContext);

  const handleNavigation = (path) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false)
      },2000)
      navigate(path)
  }


  return (
    
    <div>
      <nav className="navbar">
        <div>
          <Link to="/">
          <h2>FoodShop</h2>
          </Link>
        </div>
        <div className='search-bar'>
          <input type="text" className='search-input' placeholder="Search for food items" />
          <button className='search-btn'>SEARCH</button>
        </div>
        <div className='icons'>
          <div className='profile-group'>
            <BiUser className='icon' />
          
            <div className="dropdown-menu">
              <Link to="/login"><p className='dropdown-item'>Login/Sign Up</p></Link>
              <Link to="/orders"><p className='dropdown-item'>Orders</p></Link>
              <p onClick={logout} className='dropdown-item'>Logout</p>
            </div>
          </div>      
        
          <button className='cart-icon' onClick={() => navigate('/cart')} >
            <BsCart className='icon' />
            <span className='cart-qty'>{getCartCount()}</span>
          </button>
        </div>  
      </nav>  
    </div>
  )
}

export default Navbar