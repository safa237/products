import React from 'react';

import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import logo from '../.././images/Vita Logo2.png' ;
import lotion from '../.././images/lotion.png';
import { setLanguage ,selectLanguage ,selectTranslations} from '../../rtk/slices/Translate-slice';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { useState } from 'react';
import StarRating from '../rate/StarRating';
import { selectToken } from '../../rtk/slices/Auth-slice';
import './review.css';


const ReviewDialog = ({ isOpen, onCancel , productId  }) => {
    const language = useSelector(selectLanguage);
    const translations = useSelector(selectTranslations);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.id);
    const email = useSelector((state) => state.auth.email);
    const [rating, setRating] = useState(0);
    const bearerToken = useSelector(selectToken);

   
      const handleOverlayClick = (e) => {
        if (e.target.classList.contains('popup')) {
          onCancel();
        }
      };
      const handleViewProductClick = () => {
        onCancel(); 
      };

      const [reviews, setReviews] = useState([]);

      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `https://ecommerce-1-q7jb.onrender.com/api/v1/public/review/product/${productId}`
          );
    
          setReviews(response.data.data.reviews);
          console.log('sucssefuttly fetch reviews ' , response.data.data.reviews);
          console.log('productId is ' , productId);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };
    
      useEffect(() => {
        console.log('review page open');
        if (isOpen && productId) {
          fetchReviews();
        }
      }, [isOpen, productId]);



      const [formData, setFormData] = useState({
        comment: '',
      });

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const apiUrl = 'https://ecommerce-1-q7jb.onrender.com/api/v1/user/review/new';
      
        const requestBody = {
          productId: productId,
          comment: formData.comment,
          rating: rating,
        };
      
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(requestBody),
          });
      
          const responseData = await response.json();
      
          if (response.ok) {
            console.log('Review submitted successfully');
          } else {
            console.error('Failed to submit review:', responseData);
          }
          fetchReviews();
        } catch (error) {
          console.error('Error while submitting review:', error.message);
        }
      };
      
    
      
      
      
    return (
      <div className='review'>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-content">
           
            <div  className="grey-container">
          <div className='header-container  '>
            <div >
              <button style={{backgroundColor: '#3EBF87' , color: 'white' , marginTop:  '3em'}} onClick={handleViewProductClick}>View Product</button>
            </div>

            <div >
                  {reviews.map((review, index) => (
                    <div key={index} className='flexReview'>
                      <div className='onereview'>
                      <div style={{marginRight: '15px'}}><FaUser style={{ fontSize: '50px' }} /></div>
                      <div className='infoComment' style={{ marginLeft: '5px' }}>
                        <div> 
                        <h5>safa mahmoud</h5> {/*<p>2 days ago </p>*/}
                        </div>
                        <div className='stars'>
                            <StarRating
                              initialRating={review.rating} 
                              isClickable={false} 
                            />
                          </div>
                      </div>
                      </div>
                      <p className='reviewcomment'>{review.comment}</p>
                    </div>
                  ))}
                </div>
             
              <div className='commentdiv'>
                <form onSubmit={handleSubmit}>
                  <div className='flexReviewRate'>
                  <div className='reviewdiv'>
                  <label>
                  
                    <textarea
                      placeholder='Write Your Review'
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                    />
                  </label>
                  </div>
                  <div className='stars'>
                  <StarRating
                      initialRating={rating}
                      onRatingChange={(newRating) => setRating(newRating)}
                      isClickable={true}
                    />
                  </div>
                  </div>
                  <button style={{backgroundColor: '#3EBF87' , color: 'white'}} type="submit">Submit</button>
                </form>
              </div>
             
            
          </div> 
        
        </div>

          </div>
          </div>
        )}
      </div>
    );
  };

export default ReviewDialog;