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
import { addToCart , deleteFromCart } from '../rtk/slices/Cart-slice';
import { clearWishlist } from '../rtk/slices/Wishlist-slice';
import { clearCart } from '../rtk/slices/Cart-slice';
import { logoutAction } from '../rtk/slices/Wishlist-slice';


function Home  ()  {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector(state => state.cart);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  /*const [products, setProducts] = useState([]);*/
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const [isInCart, setIsInCart] = useState(false);

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
    dispatch(fetchProducts());
    checkLoggedInStatus(); 
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
    alert('You have been logged out.');
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

  const [quantity, setQuantity] = useState(0);


  /*const handleAddToCart = (productId, product) => {
    if (!isLoggedIn) {
      // Display a message indicating that the user needs to sign in
      alert('Please sign in to add to cart.');
      return;
    }

    const cartItem = {
      productId: product.id,
      poster : product.poster ,
      title: product.title,
      quantity: quantity,
      price: product.price,
    };
    
      dispatch(addToCart(cartItem));
    
  };*/

  const handleAddToCart = (productId, product) => {
    if (!isLoggedIn) {
      // Display a message indicating that the user needs to sign in
      alert('Please sign in to add to cart.');
      return;
    }

    const cartItem = {
      productId: product.id,
      poster: product.poster,
      title: product.title,
      quantity: quantity,
      price: product.price,
    };

    // Check if the product is already in the cart
    const isInCart = cart.some((item) => item.productId === cartItem.productId);

    if (isInCart) {
      // If the product is already in the cart, remove it
      dispatch(deleteFromCart(cartItem));
    } else {
      // If the product is not in the cart, add it
      dispatch(addToCart(cartItem));
    }
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
  
  const filteredProducts = products.filter((product) =>
  product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
);


   
  
    return (
      <div className="page-container">
      {/* Header Container */}
      <div className="header-container">
        {/* Header */}
        <header className="myheader">
          <div className="left-section">
            {/* Search */}
            <div  className="search-container">
                <input type="text" style={{background: 'white'}} placeholder="Search" className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div>
          </div>
          <div className="center-section">
            {/* Logo */}
            <img src={logo} alt="Logo" />
          </div>
          <div className="right-section">
              
          <select value={language} onChange={handleLanguageChange}>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="arabic">Arabic</option>
      </select>
             <Link to="/wishlist" className="cart-link"> 
             {isLoggedIn && <FaHeart className="cart-icon" />}
             </Link>
             <Link to="/cart" className="cart-link"> 
             {isLoggedIn && 
                 <div>
                  <FaShoppingCart className="cart-icon" />
                  <span>{cart.length}</span> 
                  </div>}
             </Link>
              
              <div className="dropdown" onClick={toggleDropdown}>
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
          </div>
           
      

          </div>
  
        </header>
  
        {/* Line with Text */}
        <div className="text-line">
        <Link to="/home">{translations[language]?.home}</Link>
      <Link to="/store">{translations[language]?.store}</Link>
      <Link to="/about">{translations[language]?.about}</Link>
      <Link to="/brand">{translations[language]?.brand}</Link>
      <Link to="/blog">{translations[language]?.blog}</Link>
      <Link to="/contact">{translations[language]?.contact}</Link>
        </div>
      </div>
  
      {/* Green Container */}
      <div className="green-containerr">
       
        <div className='home-containerr'>
          <Slider />
         
          <div className="card-container">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <div className="card-body">
            <div className="card-icons">
           
            {isLoggedIn && <FaHeart
                      className={`favorite-icon ${wishlist.includes(product.id) ? 'favorite-icon-active' : ''}`}
                      onClick={() => handleAddToFavorites(product.id)}
                    /> }
           {isLoggedIn && <FaShoppingCart
                  className={`cart-iconPro ${cart.some((item) => item.productId === product.id) ? 'cart-iconPro-active' : ''}`}
                  onClick={() => handleAddToCart(product.id, product)}
                /> }

           {isLoggedIn && <FaEye className="cart-iconPro"
                 onClick={() => handleDetailsClick(product)}
               /> }
                              

              </div>
              <div className="card-img">
              <img
        src={`data:image/png;base64,${product.poster}`}
        alt="Product poster"
      />
              </div>
              <div className='card-info'>
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
  
        <div className='popular'>
          <h3>{translations[language]?.new}</h3>
          <p> {translations[language]?.discover}</p>
          </div>
          <div className="card-container">
  
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
  <StarRating rating={rating} />
  </div>
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
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
  <StarRating rating={rating} />
  </div>
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
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
  <StarRating rating={rating} />
  </div>
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
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
  <StarRating rating={rating} />
  </div>
  <div className='price'>$500</div>
  </div>
  <button className='proBtn'>{translations[language]?.detailsbtn}</button>
  </div>
  </div>
  
  
          </div>
  
          <div className='marks'>
           <p style={{textAlign: 'start'}}>{translations[language]?.brand}</p> 
           <div className='flex-marks'>
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           
           <div className='inner-marks'>
           <img src={product} alt="product" />
           <span>{translations[language]?.brand}</span>
           </div>
           </div>
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

export default Home;