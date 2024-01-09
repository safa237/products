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
import './review.css';


const ReviewDialog = ({ isOpen, onCancel}) => {

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
    return (
      <div className='review'>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-content">
            <div   className="header-container">
          {/* Header */}
          <header className="myheader">
            <div className="left-section">
            <img src={logo} alt="Logo" />
            </div>
            <div className="center-section">

            </div>
            <div className="right-section">
                
            <select value="english" >
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="arabic">Arabic</option>
             </select>
             
        
            </div>
    
          </header>
    
          {/* Line with Text */}
          <div className="text-line">
          <Link to="/home">home</Link>
        <Link to="/store">store</Link>
        <Link to="/about">about</Link>
        <Link to="/brand">brand</Link>
        <Link to="/blog">blog</Link>
        <Link to="/contact">contact</Link>
          </div>
            </div>

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
             
            
          </div> 
        
        </div>

          </div>
          </div>
        )}
      </div>
    );
  };

export default ReviewDialog;