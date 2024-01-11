import React from 'react';
import './stylehome.css'; 
import logo from '../images/Vita Logo2.png' ;
import product from '../images/product.png' ;
import { FaSearch } from 'react-icons/fa';
import { FaHeart, FaShoppingCart , FaEye } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import Slider from './slider/Slider';
import StarRating from './rate/StarRating';
import axios from 'axios';
import { useEffect , useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import { fetchProducts } from '../rtk/slices/Product-slice';
import { addToWishlist , removeFromWishlist  } from '../rtk/slices/Wishlist-slice';
import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import DetailsDialog from './products/DetailsDialog';
import { addToCart } from '../rtk/slices/Cart-slice';
import { CiStar } from "react-icons/ci";
import NavHeader from '../components/NavHeader';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import './store.css';


function Store  ()  {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector(state => state.cart);

  const navigate = useNavigate();
  /*const [products, setProducts] = useState([]);*/
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');

  
  

  const handleDetailsClick = (selectedProduct) => {
    if (!isLoggedIn) {
      
      alert('Please sign in to view product.');
      return;
    }
    setSelectedProduct(selectedProduct);
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
        checkLoggedInStatus();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);


  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const checkLoggedInStatus = () => {
    const userToken = localStorage.getItem('token');
    setIsLoggedIn(!!userToken);

    // Load wishlist from localStorage
    if (userToken) {
      const storedWishlist = localStorage.getItem('wishlist');
      const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      // Dispatch the addToWishlist action to update the store
      parsedWishlist.forEach((productId) => {
        dispatch(addToWishlist(productId));
      });
    }
  };


  
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
   
    setIsLoggedIn(false); // Update the login status
    setIsDropdownOpen(false); // Close the dropdown after logout
   
  };

  const rating = product.rate;

  const handleRatingChange = async (productId, newRating) => {
    if (!isLoggedIn) {
      // Display a message indicating that the user needs to sign in
      alert('Please sign in first.');
      return;
    }

    try {
      await axios.post('https://mostafaben.bsite.net/api/Products', {
        id: productId,
        newRating: newRating,
      });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleAddToCart = (productId, product) => {
    if (!isLoggedIn) {
      // Display a message indicating that the user needs to sign in
      alert('Please sign in to add to cart.');
      return;
    }
    dispatch(addToCart(product));
  };
 

  const handleAddToFavorites = (productId) => {
    if (!isLoggedIn) {
      alert('Please sign in to add to favorites.');
      return;
    }

    // Check if the product is already in the wishlist
    const isProductInWishlist = wishlist.includes(productId);

    if (isProductInWishlist) {
      // Remove the product from the wishlist
      dispatch(removeFromWishlist(productId));
    } else {
      // Add the product to the wishlist
      dispatch(addToWishlist(productId));
    }
  };

  const detailsBtn = () => {
    if (!isLoggedIn) {
      alert('Please sign in to view details.');
      return;
    }
    
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;

    return matchesSearch && matchesCategory;
  });


  
    return (
      <div className="page-container">
      {/* Header Container */}
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand>
      <img src={logo} alt="Logo" />
    </Navbar.Brand>
    <div className="left-section">
      {/* Search */}

    </div>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto"></Nav>
      <Nav>
        
        <div className="text-line">
          <Link to="/home">{translations[language]?.home}</Link>
          <Link to="/store">{translations[language]?.store}</Link>
          <Link to="/about">{translations[language]?.about}</Link>
          <Link to="/blog">{translations[language]?.blog}</Link>
        </div>
        <Link to="/wishlist" className="cart-link">
          {isLoggedIn && <FaHeart className="cart-icon" />}
        </Link>
        <Link to="/cart" className="cart-link">
          {isLoggedIn && (
            <div>
              <FaShoppingCart className="cart-icon" />
              <span>{cart.length}</span>
            </div>
          )}
        </Link>
        
        {/*<div className="dropdown" onClick={toggleDropdown}>
          <FaUser className="user-icon" title={isLoggedIn ? 'Logout' : 'Login'} />
          {isDropdownOpen && (
            <div className="dropdown-content">
              {isLoggedIn ? (
                <span onClick={handleLogout}>Logout</span>
              ) : (
                <Link to="/authentication">Login</Link>
              )}
            </div>
          )}
        </div> */}

        <select className='selectLang' value={language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="arabic">Arabic</option>
        </select>
        <div className='text-line'>
        {isLoggedIn ? (
              <Link onClick={handleLogout}>logout</Link>
            ) : (
              <Link to="/authentication">login</Link>
            )}
            </div>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  
      {/* Green Container */}
      <div className="green-containerr">
       
        <div className='home-containerr'>
        <div  className="search-container searchStore">
                <input type="text" style={{background: 'white'}} placeholder="Search" className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div>

         <div className='store-flex'>
         {loading && (
      <div className="loading-spinner" style={{width: '50px' , height: '50px' , marginTop: '10px'}}>
      
      </div>
    )}
    {!loading && (
          <div className="card-store">
        {filteredProducts.map((product) => (
          <div className="cards " key={product.id}>
            <div className="card-body">
            <div className="card-icons">
           
            {isLoggedIn && <FaHeart
                      className={`favorite-icon ${wishlist.includes(product.id) ? 'favorite-icon-active' : ''}`}
                      onClick={() => handleAddToFavorites(product.id)}
                    /> }
           {isLoggedIn && <FaShoppingCart
                  className="cart-iconPro"
                  onClick={() => handleAddToCart(product.id, product)}
                /> }

           {isLoggedIn && <FaEye className="cart-iconPro"
                 onClick={() => handleDetailsClick(product)}
               /> }
                              

              </div>
              <div className="card-imgstore" >
              <img
        src={`data:image/png;base64,${product.poster}`}
        alt="Product poster"
      />
              </div>
              <div className='card-info card-infoStore'>
                <h2>{product.title}</h2>
                <div className='rate'>
  
  
                
                {isLoggedIn && <StarRating rating={rating} /> }
  
                </div>
                <div className='price'>{`$${product.price}`}</div>
              </div>
             {isLoggedIn && <button
                     className='proBtn'
                     onClick={() => detailsBtn()}
               >
                   <Link
                     style={{ color: "white", textDecoration: "none" }}
                     to={isLoggedIn ? `/home/product/${product.id}` : null}
                   >
                    {translations[language]?.detailsbtn}
                  </Link>
              </button> }
             
            </div>
          </div>
        ))}
          </div>
     )}
           
          <div className='storeside'>
            <p></p>
          <div>
          <div className='rateFilter'>
                 <button
                    color="primary"
                    onClick={() => handleCategoryFilter(null)}
                    className='filterbycat'
                  >
                    All Categoryies
                  </button>
                  <button
                    color="primary"
                    onClick={() => handleCategoryFilter(1)}
                    className='filterbycat'
                  >
                    category 1
                  </button>
                  <button
                    color="primary"
                    onClick={() => handleCategoryFilter(2)}
                    className='filterbycat'
                  >
                    category 2
                  </button>
                  <button
                    color="primary"
                    onClick={() => handleCategoryFilter(4)}
                    className='filterbycat'
                  >
                    category 4
                  </button>
          </div>
          {/*<p style={{marginTop:'5em'}}>filter by category</p>
          <div className='rateFilter'>
            <div ><CiStar /> Five Only</div>
            <div > <CiStar />four Only</div>
            <div> <CiStar />three Only</div>
            <div><CiStar /> two Only</div>
            <div><CiStar /> one Only</div>
          </div>*/}
          
          
          </div>
          </div>
          
      </div>
  
          <div className='marks'>
           
          </div>
  
        </div>
        
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
      </div>
      <DetailsDialog
          isOpen={detailsOpen}
          onCancel={handleCancelDetails}
          product={selectedProduct}
          rating = {rating}
       />
    </div>
    );
};

export default Store;