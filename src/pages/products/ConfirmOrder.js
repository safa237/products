import React from "react";
import {  useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setLanguage , selectLanguage , selectTranslations } from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart , FaSearch } from 'react-icons/fa';
import logo from '../../images/Vita Logo2.png' ;
import { FaTrash } from "react-icons/fa";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import product from '../../images/product.png';
import './confirmOrder.css';

function ConfirmOrder() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const cart = useSelector(state => state.cart);


  useEffect(() => {
  }, [language]);


  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };


  const totalprice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  useEffect(() => {
    console.log("Cart:", cart);
  }, [cart]);

  

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };
  

  return(
    <div className="confirmPage">
      <div className="header-container">
        {/* Header */}
        <header className="myheader">
          <div className="left-section">
           
            
          </div>
          <div className="center-section">
            {/* Logo */}
            <img src={logo} alt="Logo" />
          </div>
          <div className="right-section">
              
          <select value={language} onChange={handleLanguageChange}>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="arabic">Arabic</option>
      </select>
             <Link to="/wishlist" className="cart-link"> 
              <FaHeart className="cart-icon" />
             </Link>
             <Link to="/cart" className="cart-link"> 
              
                 <div>
                  <FaShoppingCart className="cart-icon" />
                  <span>{cart.length}</span> 
                  </div>
             </Link>
              
              

          </div>
  
        </header>
  
        {/* Line with Text */}
        <div className="text-line">
        <Link to="/home">{translations[language]?.home}</Link>
      <Link to="/store">{translations[language]?.store}</Link>
      <Link to="/about">{translations[language]?.about}</Link>
      <Link to="/brand">{translations[language]?.brand}</Link>
      <Link to="/blog">{translations[language]?.blog}</Link>
      <Link to="/contact">{translations[language]?.contact}</Link>
        </div>
      </div>

      <div className="green-containerr  ">
        <div className="header-container ">
          <div className="flexContainerCart">
          <div className="flexcart">
            <div className="formOrder">
            <form>
        <div className="flexInput" >
          <input className="name"
            type="text"
            placeholder="First Name"
            
          />
          <input className="name"
            type="text"
            placeholder="Last Name"
            
          />
        </div>
        <input className=""
            type="text"
            placeholder="Country"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input className=""
            type="text"
            placeholder="Street"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="City"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Region"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="Postal Code / Zip"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="phone"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            type="text"
            placeholder="email"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input className="note"
            type="text"
            placeholder="Additional Information (Optional)"
            style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
      </form>
            </div>
           
          </div>
          <div className="total">
              <h4>Total Price : {totalprice.toFixed(2)}</h4>
              <h6>Paiement when recieving</h6>

             <p > <input
        type="checkbox"
        id="myCheckbox"
      /> i agree to conditions and privacy policy</p>  
              <button className="confirmbtn">Confirm</button>
            </div>
        </div>

        <div className='popular'>
          <h3>{translations[language]?.interested}</h3>
          </div>
          <div className="card-container">
  
  <div className="card">
  <div className="card-body">
  <div className="card-icons">
    <FaHeart className="favorite-icon" />
    <FaShoppingCart className="cart-iconPro" />
  </div>
  <div className="card-img">
    <img src={product} alt="product" />
  </div>
  <div className='card-info'>
  <h2>Title</h2>
  
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
  </div>
  </div>
  <div className="card">
  <div className="card-body">
  <div className="card-icons">
  <FaHeart className="favorite-icon" />
  <FaShoppingCart className="cart-iconPro" />
  </div>
  <div className="card-img">
    <img src={product} alt="product" />
  </div>
  <div className='card-info'>
  <h2>Title</h2>
  
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
  </div>
  </div>
  
  <div className="card">
  <div className="card-body">
  <div className="card-icons">
    <FaHeart className="favorite-icon" />
    <FaShoppingCart className="cart-iconPro" />
  </div>
  <div className="card-img">
    <img src={product} alt="product" />
  </div>
  <div className='card-info'>
  <h2>Title</h2>
  
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
  </div>
  </div>
  <div className="card">
  <div className="card-body">
  <div className="card-icons">
    <FaHeart className="favorite-icon" />
    <FaShoppingCart className="cart-iconPro" />
  </div>
  <div className="card-img">
    <img src={product} alt="product" />
  </div>
  <div className='card-info'>
  <h2>Title</h2>
  
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
  </div>
  </div>
  
  
          </div>
  
          <div className='marks'>
           <p style={{textAlign: 'start'}}>{translations[language]?.brand}</p> 
           <div className='flex-marks'>
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           </div>
          </div>
  
        </div>
        <div className='footerr'>
          <div className=' header-container flex-footer'>
            <div className='footer-info'>
              <p>{translations[language]?.links}</p>
              <p>{translations[language]?.shipping} </p>
            </div>
            <div className='footer-info'>
              <p>{translations[language]?.private} </p>
              <p>{translations[language]?.cookies} </p>
  
            </div>
            <div className='footer-info'>
              <p>{translations[language]?.info}</p>
              <p>{translations[language]?.contactP}</p>
            </div>
            <div className='footer-info'>
              <p>{translations[language]?.subscribe}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmOrder;