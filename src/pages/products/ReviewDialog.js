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


const ReviewDialog = ({ isOpen, onCancel , productId }) => {

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
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const postData = {
          UserId: 1, 
          productId: 2, 
          ...formData,
        };
    
        fetch('https://mostafaben.bsite.net/api/Reviwes/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Review submitted successfully:', data);
            // You can handle the response as needed
          })
          .catch(error => {
            console.error('Error submitting review:', error);
            // Handle error appropriately
          });
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
            <div className='flexReview'>
              <FaUser style={{fontSize: '50px'}}/>
               <div style={{marginLeft:'5px'}}>
                <p >name</p>
                <p>my review is product is very goof , thak you very much</p>
               </div>
              </div>
              <div className='flexReview'>
              <FaUser style={{fontSize: '50px'}}/>
               <div style={{marginLeft:'5px'}}>
                <p >name</p>
                <p>my review is product is very goof , thak you very much</p>
               </div>
              </div>
              <div className='flexReview'>
              <FaUser style={{fontSize: '50px'}}/>
               <div style={{marginLeft:'5px'}}>
                <p >name</p>
                <p>my review is product is very goof , thak you very much</p>
               </div>
              </div>

            {/**  <form onSubmit={handleSubmit}>
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
    </form> */} 
             
            
          </div> 
        
        </div>

          </div>
          </div>
        )}
      </div>
    );
  };

export default ReviewDialog;