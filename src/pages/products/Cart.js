import React from "react";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";

/*function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
  
  
  return (
    <Container>
      <h1 className="py-5"></h1>
      <h5>Total Price: {totalprice.toFixed(2)}</h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={`${product.id}-${product.productId}`}>
              <td>
                <Image
                  src={`data:image/png;base64,${product.poster}`}
                  alt="Product poster"
                  style={{ width: "100px", height: "100px" }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>{product.price * product.quantity}</td>
              <td>
              <Button variant="danger" 
              onClick={() => {
                console.log('Deleting product:', product);
                dispatch(deleteFromCart(product));
              }}
              >delete</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Cart;*/

import {  useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setLanguage , selectLanguage , selectTranslations } from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart , FaSearch } from 'react-icons/fa';
import logo from '../../images/Vita Logo2.png' ;
import { FaTrash } from "react-icons/fa";
import './cart.css';

function Cart() {
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
  
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate('/order/confirm');
  };

  return(
    <div>
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

      <div className="green-containerr cartGreen ">
        <div className="header-container">
          <div className="flexContainerCart">
          <div className="flexcart">
          {cart.map((product) => (<div className="productcart">
              <div className="flexOnecart">
                <div className="imgcart">
                <Image
                  src={`data:image/png;base64,${product.poster}`}
                  alt="Product poster"
                  style={{ width: "100px", height: "100px" }}
                />
                </div>
                <div className="infocartone">
                  <div className="namecart" ><h4>{product.title}</h4></div>
                  <h5>{product.price * product.quantity} $</h5>
                </div>
                <div className="infocarttwo">
                  <div className="namecart" >
                  
              <FaTrash style={{color: 'red'}} onClick={() => {
                console.log('Deleting product:', product);
                dispatch(deleteFromCart(product));
              }}/>
                  </div>
                  <h6>{product.quantity}</h6>
                </div>
              </div>
            </div> ))}
          </div>
          <div className="total">
              <h4>Total Price : {totalprice.toFixed(2)}</h4>
              <h6>Add Promo Code</h6>
              <div className="input"> <input /> </div>
              <button className="confirmbtn" onClick={handleConfirmClick}>Confirm</button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;