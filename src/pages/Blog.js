import React from 'react';
import './stylehome.css';
import './blog.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import logo from '../images/Vita Logo2.png' ;
import lotion from '.././images/lotion.png';
import lotion2 from '.././images/lotion2.png';
import blog from '.././images/blog.png';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineDislike } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import DialogBlog from './DialogBlog';

function Blog() {
    const handleDetailsClick = (selectedProduct) => {
        
        setDetailsOpen(true);
      };
    
      const handleCancelDetails = () => {
        setDetailsOpen(false);
      };
    const [detailsOpen, setDetailsOpen] = useState(false);

    const language = useSelector(selectLanguage);
    const translations = useSelector(selectTranslations);
    const dispatch = useDispatch();


    useEffect(() => {
      }, [language]);
    
    
      const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        dispatch(setLanguage(selectedLanguage));
      };


    return (
        <div className="page-container">
        {/* Header Container */}
        <div   className="header-container">
          {/* Header */}
          <header className="myheader">
            <div className="left-section">
              {/* Search */}
              <div  className="search-container">
                  <input type="text" style={{background: 'white'}} placeholder="Search" className="search-input" />
                  <FaSearch className="search-icon" />
                </div>
            </div>
            <div className="center-section">
              {/* Logo */}
              <img src={logo} alt="Logo" />
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
    
        {/* Green Container */}
        <div className="green-containerr">
          <div className='blog-container '>
            <div className='blog-flex '>
                <div className='blogimg'>
                <img src={lotion} alt="lotion" />
                
                </div>
                <div className='infoblog'>
                    <div className='like-share'>
                    <div className='like'>
                        <FaHeart className='icon' />
                         <AiOutlineDislike className='icon' />
                    </div>
                    <div className='share'>
                        <IoMdShare style={{fontSize: '40px'}} className='icon'/>
                       
                    </div>
                    </div>
                    <p>
                    Dealing with dry skin is enough to leave anyone 
frustrated, frazzled and, well, flaky. Even worse,
chronic dryness is associated with a disrupted 
skin barrier. “Without an optimal barrier function 
your skin becomes more vulnerable to minor 
trauma and infections, and it will take longer to
heal,” says Dr. Hadley King, a board-certified 
dermatologist and clinical instructor of 
dermatology at the Weill Medical College of 
Cornell University in New York. The best remedy
to restore your skin’s barrier—and keep your 
complexion smooth and supple—is, without a 
doubt, a moisturizer made to nourish dry skin 
types.
                    </p>
                    <div className='like read'>
                        <button onClick={() => handleDetailsClick()} className='read'> read article</button>
                    </div>
                </div>
            </div>
          </div>  
          <div className='card-blog header-container'>
                <div className='card1'>
                <img src={blog} alt="lotion" />
                <p>
                6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It
                </p>
                <div className='buttons'>
                <div className='like'>
                        <FaHeart className='icon' />
                         <AiOutlineDislike className='icon' />
                    </div>
                    <div className='like read'>
                        <button className='read'> read article</button>
                    </div>
                </div>
                </div>

                <div className='card1'>
                <img src={blog} alt="lotion" />
                <p>
                6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It
                </p>
                <div className='buttons'>
                <div className='like'>
                        <FaHeart className='icon' />
                         <AiOutlineDislike className='icon' />
                    </div>
                    <div className='like read'>
                        <button className='read'> read article</button>
                    </div>
                </div>
                </div>

                <div className='card1'>
                <img src={blog} alt="lotion" />
                <p>
                6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It
                </p>
                <div className='buttons'>
                <div className='like'>
                        <FaHeart className='icon' />
                         <AiOutlineDislike className='icon' />
                    </div>
                    <div className='like read'>
                        <button className='read'> read article</button>
                    </div>
                </div>
                </div>   
            </div>
            
           <div className='header-container publicBlogs'> <p>Blogues les plus populaires</p> </div>
          <div className='publicBlogs header-container card-blog'>
            <div className='card2'>
                <img src={lotion2} alt="lotion" />
                <p>
                6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It
                </p>
                </div>

                <div className='card2'>
                <img src={lotion2} alt="lotion" />
                <p>
                6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It
                </p>
                
                </div>

                <div className='card2'>
                <img src={lotion2} alt="lotion2" />
                <p>
                6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It
                </p>
                
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

        <DialogBlog
          isOpen={detailsOpen}
          onCancel={handleCancelDetails}
       />
      </div>
      );
}
export default Blog;