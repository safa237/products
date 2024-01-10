import React, { useState, useRef, useEffect } from 'react';
import './stylehome.css';
import './blog.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { AiOutlineDislike } from 'react-icons/ai';
import { IoMdShare } from 'react-icons/io';
import logo from '../images/Vita Logo2.png';
import lotion2 from '../images/lotion2.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DialogBlog from './DialogBlog';
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import { useDispatch } from 'react-redux';

function Blog() {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [dialogBlogContent, setDialogBlogContent] = useState(null); 

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const pageLinkRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };


  const handleDetailsClick = () => {
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };

  const handleCopyLink = () => {
    pageLinkRef.current.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://mostafaben.bsite.net/api/Blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  
  const handleBlogClick = async (clickedBlog) => {
    try {
      const response = await axios.get(`https://mostafaben.bsite.net/api/Blogs/${clickedBlog.id}`);
      setDetailsOpen(true);
      setDialogBlogContent(response.data);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
    finally {
      setLoading(false); 
    }
  };

  return (
    <div className="page-container">
      <div className="header-container">
      <header className="myheader">
          <div className="left-section">
          <img src={logo} alt="Logo" />
          </div>
          <div className="center-section">
            
          </div>
          <div className="right-section">
            
          </div>
        </header>
        <div className="text-line">
        <Link to="/home">{translations[language]?.home}</Link>
      <Link to="/store">{translations[language]?.store}</Link>
      <Link to="/about">{translations[language]?.about}</Link>
      <Link to="/brand">{translations[language]?.brand}</Link>
      <Link to="/blog">{translations[language]?.blog}</Link>
      <Link to="/contact">{translations[language]?.contact}</Link>
        </div>
      </div>
      <div className="green-containerr">
        <div className='testtt'>
      {loading && (
      <div className="loading-spinner" style={{width: '50px' , height: '50px' , marginTop: '10em'}}>
      </div>
    )}
     {!loading && (
        <div className='blog-container'>
          {blogs.length > 0 && (
            <div >
              <div className='blogContent'>
              <div className='blog-flex'>
                <div className='blogimg'>
                  <img
                    src={`data:image/png;base64,${selectedBlog ? selectedBlog.poster : blogs[0].poster}`}
                    alt="Blog poster"
                  />
                </div>
                <div className='infoblog'>
                  <h5>{selectedBlog ? selectedBlog.title : blogs[0].title}</h5>
                  <div className='share'>
                    <input
                      ref={pageLinkRef}
                      type="text"
                      readOnly
                      value={window.location.href}
                      style={{ position: 'absolute', left: '-9999px' }}
                    />
                    <IoMdShare
                      style={{ fontSize: '40px', cursor: 'pointer' }}
                      className='icon'
                      onClick={handleCopyLink}
                    />
                    {isCopied && <span style={{ marginLeft: '5px', color: '#3A7E89' }}>Link copied!</span>}
                  </div>
                  <h6>{selectedBlog ? selectedBlog.descreption : blogs[0].descreption.substring(0, 525)}...</h6>
                  <div className='readArticle'>
                       <button onClick={() => handleBlogClick(blogs[0])} className='read'> read article </button>
                 </div>
                </div>
              </div>
              </div>
              <div className='card-blog header-container'>
                
                {blogs.slice(1).map((blog) => (
                  <div className='card1 card1blog' key={blog.id}>
                    <img 
                      src={`data:image/png;base64,${blog.poster}`}
                      alt="Blog poster"
                    />
                    <p>{blog.descreption.substring(0, 125)}...</p>
                    
                    <div className='buttons'>
                      
                      <div className='readArticle'>
                          <button onClick={() => handleBlogClick(blog)} className='read'> read article </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) }
        </div>
     )}
     </div>

       {/* <div className='header-container publicBlogs'> <p className='publicBlogs'>Blogues les plus populaires</p> </div>
      <div className='publicBlogs header-container card-blog'>
        <div className='card2'>
          <img src={lotion2} alt="lotion" />
          <p>6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It</p>
        </div>
        <div className='card2'>
          <img src={lotion2} alt="lotion" />
          <p>6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It</p>
        </div>
        <div className='card2'>
          <img src={lotion2} alt="lotion2" />
          <p>6 Ways the Holidays Can Wreak Havoc on Your Skin And What You Can Do About It</p>
        </div>
      </div>*/}
      <div className='footerr blogfooter'>
        <div className=' header-container flex-footer'>
          <div className='footer-info'>
            <Link to={translations[language]?.links} className="footer-link">{translations[language]?.links}</Link>
            <Link to={translations[language]?.shipping} className="footer-link">{translations[language]?.shipping}</Link>
          </div>
          <div className='footer-info'>
            <Link to={translations[language]?.private} className="footer-link">{translations[language]?.private}</Link>
            <Link to={translations[language]?.cookies} className="footer-link">{translations[language]?.cookies}</Link>
          </div>
          <div className='footer-info'>
            <Link to={translations[language]?.info} className="footer-link">{translations[language]?.info}</Link>
            <Link to={translations[language]?.contactP} className="footer-link">{translations[language]?.contactP}</Link>
          </div>
          <div className='footer-info'>
            <Link to={translations[language]?.subscribe} className="footer-link">{translations[language]?.subscribe}</Link>
          </div>
        </div>
      </div>
      <DialogBlog isOpen={detailsOpen} onCancel={handleCancelDetails} blogContent={dialogBlogContent} />
    </div>
      </div>
  
  );
}

export default Blog;
