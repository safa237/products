import React from 'react';

import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import logo from '../images/Vita Logo2.png' ;
import lotion from '.././images/lotion.png';
import lotion2 from '.././images/lotion2.png';
import blog from '.././images/blog.png';
import { AiOutlineDislike } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { FaHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import product from '../images/product.png' ;
import StarRating from './rate/StarRating';
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import { useSelector , useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';


import './dialogblog.css';

const DialogBlog = ({ isOpen, onCancel}) => {

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
    return (
      <>
        {isOpen && (
          <div className="popup" onClick={handleOverlayClick}>
            <div className="popup-content">
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

            <div  className="green-container">
          <div className='blog-container '>
            <div className='blog-flex '>
                <div className='blogimg'>
                <img src={lotion} alt="lotion" />
                
                </div>
                <div className='infoblog'>
                    <div className='like-share'>
                    <div className='like'>
                        <FaHeart className='icon' />
                        <span> <AiOutlineDislike className='icon' /></span>
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
                </div>
            </div>
          </div>  
          <div className='  bigarticle'>
            <div className='articleInfo'>
                <p>
                “Moisturizers help to keep the skin looking and functioning at its best and help ensure the strength and resilience of the skin barrier,” says Dr. King. She recommends reaching for products that contain hydrating and nourishing ingredients—specifically moisturizing creams or ointments that contain oils such as olive or jojoba. “Shea butter also works well,”she adds. “Other ingredients that help soothe dry skin include lactic acid, urea,hyaluronic acid, dimethicone, glycerin, lanolin,mineral oil and petrolatum.” To best absorb all the hydration your moisturizer contains, she recommends applying immediately after washing.Ready to arm your skin with the protective barrier it needs to remain healthy 
and hydrated? Read on for the best moisturizers that are guaranteed to do the job and leave you with that desirable dewy glow.
 
1-Dermalogica Intensive Moisture Balance
If you’re looking to maintain the delicate hydration balance that prevents your skin from being dry but also ensures that it won’t look greasy and oily, this is a great option. It is formulated with a BioReplenish Complex that contains a combination of key barrier lipids to boost your skin’s natural resiliency and aid in skin barrier recovery. Key ingredients include chlorella algae, a prebiotic complex that helps rebalance the skin’s microbiome, as well as hyaluronic acid, which holds up to 1,000 times its weight in water. Echinacea, centella asiatica and aloe vera are also added to lock in moisture and reduce the appearance of fine lines.

2-SENTÉ Dermal Repair Ultra Nourish
This lipid-replenishing cream nourishes and smooths skin while preventing water loss. It’s uniquely formulated for drier, sensitive skin types and also addresses fine lines, wrinkles and redness with their patented Heparan Sulfate Analog (HSA) technology and a lipid blend. Together, they deeply hydrate, fortify and help restore the skin’s natural barrier.

3-SkinMedica Rejuvenative Moisturizer
Providing continuous hydration throughout the day, this formula from SkinMedica helps smooth and soften dry, rough patches and minimizes the appearance of lines and wrinkles. Featuring sodium hyaluronate, a hyaluronic acid derivative that has the ability to retain up to 40 times its weight in water on the surface of the skin, meaning your skin will remain hydrated and touchably soft throughout the day, it’s also formulated with a slew of antioxidants like vitamin C and E to help brighten and shield your complexion from damaging free radicals.
                </p>
            </div>
            <div className='articleInfo'>
                <p>
                4-PCA SKIN Collagen Hydrator
Ideal for overnight use (when your skin is working its hardest to repair itself) this collagen hydrator can also be used anytime—morning and afternoon, too. It incorporates a nourishing combination of shea butter and hyaluronic acid to rehydrate overly dry skin. It also softens the skin’s texture with a blend of emollients and wheat protein and balances your skin’s natural pH levels with sweet almond oil.

5-Obagi Hydrate Luxe
Although this cream can be used both in the morning and evening, it’s actually formulated to work in tandem with your skin’s natural nightly function to restore and hydrate while you sleep. Shea butter helps soothe and soften the skin, while naturally occurring biomimetic peptides form a barrier that locks in moisture and aids in cellular repair.

6-SkinCeuticals Triple Lipid Restore 2:4:2
Perfect for dry, aging skin to replenish nutrients and bring your skin back to life, SkinCeuticals Triple Lipid Restore 2:4:2 is infused with the essential lipids we lose as we age that leaves our skin looking less full, unevenly textured, and with fine lines and wrinkles. This treatment’s fast-absorbing formula has antioxidants, vitamins and other nutrients to fight free-radical damage and smooth skin texture. The result is an improvement in elasticity, moisture levels and radiance, leaving your skin looking supple, healthy and radiant.

7-Epionce Intensive Nourishing Cream
This unique cream was designed to target and repair damaged areas of the skin with a powerful blend of fruit extracts, namely apple, which contains a high concentration of phenolic compounds and flavonoids, along with anti-aging benefits. Peptides are also in play to stimulate cell regeneration and promote a youthful, more even-toned complexion.

8-iS Clinical Reparative Moisture Emulsion
Utilizing a blend of potent, pharmaceutical-grade botanicals, p
                </p>
            </div>
          </div>

    
          <p>products related the article</p>
          <div className=" header-container card-container">
  
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
  <div className='rate'>
  <StarRating />
  </div>
  <div className='price'>$500</div>
  <button className='proBtn'>details</button>
  </div>
  
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
  <div className='rate'>
   <StarRating />
  </div>
  <div className='price'>$500</div>
  <button className='proBtn'>details</button>
  </div>
  
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
  <div className='rate'>
  <StarRating />
  </div>
  <div className='price'>$500</div>
  <button className='proBtn'>details</button>
  </div>
  
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
  <div className='rate'>
  <StarRating />
  </div>
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>details</button>
  
  </div>
  </div>
 
  
  
          </div>
          <div class="line-with-shadow"></div>



            
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

          </div>
          </div>
        )}
      </>
    );
  };

export default DialogBlog;