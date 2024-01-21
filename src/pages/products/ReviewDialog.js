import React from 'react';

import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

import logo from '../.././images/Vita Logo2.png' ;
import lotion from '../.././images/lotion.png';
import StarRating from '../rate/StarRating';
import { setLanguage ,selectLanguage ,selectTranslations} from '../../rtk/slices/Translate-slice';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { useState } from 'react';
import './review.css';


const ReviewDialog = ({ isOpen, onCancel , productId  }) => {

    const language = useSelector(selectLanguage);
    const translations = useSelector(selectTranslations);
    const dispatch = useDispatch();


    useEffect(() => {
      }, [language]);
   
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
            'https://mostafaben.bsite.net/api/Reviwes/pendingReviews'
          );
    
          setReviews(response.data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
          // Handle error appropriately
        }
      };
    
      useEffect(() => {
        if (isOpen) {
          fetchReviews();
        }
      }, [isOpen]);



      const [formData, setFormData] = useState({
        name: '',
        commentText: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        const postData = {
          name: formData.name,
          commentText: formData.commentText,
        };
      
        const url = `https://mostafaben.bsite.net/api/Reviwes/addReview?userId=14&productId=${productId}`;
      
        try {
          const response = await axios.post(url, postData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          console.log('Review submitted successfully:', response.data);
          fetchReviews();
          // Additional handling if needed
        } catch (error) {
          console.error('Error submitting review:', error);
          // Handle error appropriately
        }
      };
      
      
      
      
    return (
      <div className='review'>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-content">
           
            <div  className="grey-container">
          <div className='header-container  '>
            <div>
              <button style={{marginTop: '3em'}} onClick={handleViewProductClick}>View Product</button>
            </div>

            <div >
                  {reviews.map((review, index) => (
                    <div key={index} className='flexReview'>
                      <div className='onereview'>
                      <div style={{marginRight: '15px'}}><FaUser style={{ fontSize: '50px' }} /></div>
                      <div style={{ marginLeft: '5px' }}>
                        <p>{review.name}</p>
                        <p>{review.commentText}</p>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
             

              <form onSubmit={handleSubmit}>
  <label>
    Name:
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
    />
  </label>
  <br />
  <label>
    Comment:
    <textarea
      name="commentText"
      value={formData.commentText}
      onChange={handleChange}
    />
  </label>
  <br />
  <button type="submit">Submit</button>
</form>

             
            
          </div> 
        
        </div>

          </div>
          </div>
        )}
      </div>
    );
  };

export default ReviewDialog;