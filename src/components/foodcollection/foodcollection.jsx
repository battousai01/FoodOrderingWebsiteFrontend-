import React, { useState, useContext } from 'react'
import './foodcollection.css'
import { categoryItem } from '../../assets/assets'
import { FoodContext } from '../../context/Foodcontext.jsx'

const foodcollection = () => {


    const {products , addToCart} = useContext(FoodContext)



    const [category, setCategory] = useState("All")

    const categoryTitles = categoryItem.map(item => item.category_title);
    const uniqueCategoryTitles = new Set(categoryTitles);
    if (categoryTitles.length !== uniqueCategoryTitles.size) {
      console.warn('Duplicate category_title found:', categoryTitles);
    }
    
    const productIds = products.map(product => product.id);
    const uniqueProductIds = new Set(productIds);
    if (productIds.length !== uniqueProductIds.size) {
      console.warn('Duplicate product.id found:', productIds);
    }
  
  return (
    <div>
        <div className="food_container">
            <div className='header_section'> 
                <h1>Discover Our Menu</h1>
                <hr className='divider'/>
            </div>

            <div className='display_container'> 
                <div className='category_section'>
                    <h1>Explore Our Categories</h1>
                    <ul className='category_list'>
                        {
                        categoryItem.map((item) => {
                            console.log('category key:', item.category_title);
                            return (
                            <li key={item.category_title} 
                            onClick={()=>setCategory((prev) => (prev === item.category_title ? "All" : item.category_title))}
                            className={category === item.category_title ? "active" : ""}
                            >
                                {item.category_title}
                            </li> 
                      );  
                        })}

                    </ul>
                </div>
                <div className='grid_display'>
                    {
                        products.length > 0 ? (
                          products.filter((product)=> category === "All" || category === product.category).map((product) => {
                            console.log('product key:', product.id);
                            return (
                            <div key = {product.id} className='product_card'> 
                                <div className="product-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <h3>{product.name}</h3>
                                <div className="price-add">
                                    <p> ${product.price}</p>
                                    <button onClick={()=> addToCart(product.id)}>Add To Cart</button>
                                </div>
                            </div>
                            );
                        }) ) : (
                            <p>No products available</p>
                        )

                    }
                </div>

            </div>
        </div>
    </div>
  )
}

export default foodcollection