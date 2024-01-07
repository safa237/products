import React from 'react';
import StarRating from '../rate/StarRating';
import { FaMinus  , FaPlus} from 'react-icons/fa';
import { useState } from 'react';
import { addToCart } from "../../rtk/slices/Cart-slice";
import { useDispatch } from 'react-redux';
import './detailsDialog.css';

const DetailsDialog = ({ isOpen, onCancel, product , rating}) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) {
      onCancel();
    }
  };
  const handleAddToCart = (productId, product) => {

    dispatch(addToCart(product));
  };
   
    return (
      <>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-contentDetails">
           <div className='details'>
            <div className='imgdetails'>
            {product.poster && (
                  <img
                    className="productImg"
                    src={`data:image/png;base64,${product.poster}`}
                    alt="Product poster"
                  />
                )}
            </div>
            <div className='infodetails'>
            <h1 >{product.title}</h1>
                    <hr />
                    <p className="lead">
                    Dealing with dry skin is enough to leave anyone 
frustrated, frazzled and, well, flaky. Even worse,
chronic dryness is associated with a disrupted 
skin barrier. “Without an optimal barrier function 
your skin becomes more vulnerable to minor 
trauma and infections, and it will take longer to
heal,” says Dr. Hadley King, a board-certified 

                    </p>

                    <h2 className="my-4">{product.price}$</h2>
                    <div className='rate'>
                         <StarRating rating={rating} />
                    </div>
                    <div>
                   
                
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