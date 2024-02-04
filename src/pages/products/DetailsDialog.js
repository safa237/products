import React from 'react';
import StarRating from '../rate/StarRating';
import { FaMinus  , FaPlus} from 'react-icons/fa';
import { useState } from 'react';
import { addToCart } from "../../rtk/slices/Cart-slice";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { selectToken } from '../../rtk/slices/Auth-slice';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './detailsDialog.css';

const DetailsDialog = ({ isOpen, onCancel, product , rating}) => {
  const dispatch = useDispatch();
  
  const bearerToken = useSelector(selectToken);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onCancel();
    }
  };

  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const [addToCartResult, setAddToCartResult] = useState(null);

  const handleAddToCart = async (productId, product) => {
    
  
    const cartItem = {
      productId: productId,
      quantity: quantity, 
    };
  
    try {
      const response = await axios.put(
        'https://ecommerce-1-q7jb.onrender.com/api/v1/user/cart/update',
        cartItem,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Product added to cart:', response.data);
      setQuantity(0);
      setTotalPrice(0);
      
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  };


   
    return (
      <>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-contentDetails">
           <div className='details'>
            <div  className='imgdetails'>
          
                  <img
                   
                    src={product.pictureUrl}
                    alt="Product poster"
                  />
              
            </div>
            <div className='infodetails'>
            <h1 >{product.name}</h1>
                    <hr />
                    <p className="lead">
                    {product.description}

                    </p>

                    
                    <div className='rate'>
                    <StarRating
                           initialRating={product.rate}
                          isClickable={false}
                        />
                    </div>

                    <div className='counter-flex'>
                  <h1>{product.price * quantity} $</h1>
               
                <div className="counter">
                  <button onClick={handleDecrement}>
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
                <div className="review">
                <button onClick={() => handleAddToCart(product.productId, product)}>Add to Cart</button>
              </div>
                </div>
            </div>
           </div>

            
          </div>
          </div>
        )}
      </>
    );
  };

export default DetailsDialog;