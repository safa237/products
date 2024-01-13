import React from "react";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import NavHeader from "../../components/NavHeader";
import {  useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { setLanguage , selectLanguage , selectTranslations } from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart , FaSearch } from 'react-icons/fa';
import logo from '../../images/Vita Logo2.png' ;
import { FaTrash } from "react-icons/fa";
import { setSearchTerm } from "../../rtk/slices/Search-slice";
import './cart.css';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const cart = useSelector(state => state.cart);

  const [searchTerm, setSearchTerm] = useState('');
  const allProducts = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.cart);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

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
  

  const handleConfirmClick = () => {
    navigate('/order/confirm');
  };
 
  return(
    <div>
       <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
      />

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