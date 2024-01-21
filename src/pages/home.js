import React, { useEffect, useState } from 'react';
import './stylehome.css';
import logo from '../images/Vita Logo2.png';
import product from '../images/product.png';
import { FaSearch } from 'react-icons/fa';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import Slider from './slider/Slider';
import StarRating from './rate/StarRating';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, selectLanguage, selectTranslations } from '../rtk/slices/Translate-slice';
import { fetchProducts } from '../rtk/slices/Product-slice';
import { addToWishlist, removeFromWishlist } from '../rtk/slices/Wishlist-slice';
import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import DetailsDialog from './products/DetailsDialog';
import { addToCart, deleteFromCart } from '../rtk/slices/Cart-slice';
import { clearWishlist } from '../rtk/slices/Wishlist-slice';
import { clearCart } from '../rtk/slices/Cart-slice';
import { logoutAction, setAuthData } from '../rtk/slices/Auth-slice'; // Assuming your auth slice includes setAuthData
import NavHeader from '../components/NavHeader';
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { jwtDecode } from 'jwt-decode';
import { loadWishlistFromStorage } from '../rtk/slices/Wishlist-slice';
import { setSearchTerm } from '../rtk/slices/Search-slice';
import { selectUserId } from '../rtk/slices/User-slice';

function Home() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(isLoggedIn);
  const [isUserLoggedInState, setIsUserLoggedInState] = useState(isLoggedIn);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  
  const productId = useSelector((state) => state.productSlice); 

  const token = useSelector((state) => state.auth.token);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term));
  };

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

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch(clearWishlist());
    dispatch(clearCart());
    setIsLoggedIn(false);
    setIsLoggedInState(false);
    setIsDropdownOpen(false);
    setIsUserLoggedInState(false);
  };

  const rating = selectedProduct ? selectedProduct.rate : 0;

  const handleRatingChange = async (userId, productId, newRating) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      const numericRating = parseFloat(newRating);
      await axios.post('https://mostafaben.bsite.net/api/Rating', {
        userId : userId,
        productId: parseInt(productId),
        value: numericRating,
      }, { headers });
      console.log('userid' , userId);
      console.log('productid' , productId);
  
      console.log('Rating submitted successfully!');
    } catch (error) {
      console.log('userid' , userId);
      console.log('productid' , productId);
      console.error('Error updating rating:', error);
      console.log('Response:', error.response); 
    }
  };
  
  
  
  

  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (productId, product) => {
    if (!isLoggedIn) {
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

    const isInCart = cart.some((item) => item.productId === cartItem.productId);

    if (isInCart) {
      dispatch(deleteFromCart(cartItem));
    } else {
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

 /* const handleDropdownOptionClick = (option) => {
    if (option === 'profile') {
      navigate('/profile');
    } else if (option === 'logout') {
      handleLogout();
    }

    setIsDropdownOpen(false);
  };*/

  const filteredProducts = products.filter(
    (product) =>
      product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  return (
    <div className="page-container">
      <NavHeader
        searchTermm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProductss={filteredProducts}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr">
        <div className="home-containerr testtt">
          <Slider />
          <div className="titleProduct">
            <h1>{translations[language]?.magasin}</h1>
            <h2>{translations[language]?.learnmore}</h2>
          </div>
          {loading && <div className="loading-spinner" style={{ width: '50px', height: '50px', marginTop: '10px' }}></div>}
          {!loading && (
            <div className="card-container">
              {filteredProducts.map((product) => (
                <div style={{ borderRadius: '5%' }} className="card" key={product.id}>
                  <div className="card-body">
                    <div className="card-icons">
                     <FaHeart
                      className={`favorite-icon ${wishlist.includes(product.id) ? 'favorite-icon-active' : ''}`}
                      onClick={() => handleAddToFavorites(product.id )}
                    /> 
                      <FaShoppingCart
                        className={`cart-iconPro ${
                          cart.some((item) => item.productId === product.id)
                            ? 'cart-iconPro-active'
                            : ''
                        }`}
                        onClick={() => handleAddToCart(product.id, product)}
                      />
                      {isLoggedIn && (
                        <FaEye
                          className="cart-iconPro"
                          onClick={() => handleDetailsClick(product)}
                        />
                      )}
                    </div>
                    <div className="card-img">
                      <img src={`data:image/png;base64,${product.poster}`} alt="Product poster" />
                    </div>
                    <div className="card-info">
                      <h2>{product.title}</h2>
                      <div className="rate">
                        <StarRating
                          initialRating={product.rate}
                          onRatingChange={(newRating) => handleRatingChange(userId ,product.id, newRating)}
                        />
                      </div>
                      <div className="price">{`$${product.price}`}</div>
                    </div>
                    <button
                      className="proBtn"
                      onClick={() => detailsBtn()}
                    >
                      <Link
                        style={{ color: 'white', textDecoration: 'none' }}
                        to={isLoggedIn ? `/home/product/${product.id}` : null}
                      >
                        {translations[language]?.detailsbtn}
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

         

  
          
  
        </div>
        
        <div className='footerr footerPhr'>
          <div className=' header-container '>
            <div className='flexFooter'>
                <div className='cartfooter'>
                    <div className='important'>
                        <h1>important links</h1>
                        <Link className='footerlink'>privacy policy </Link>
                        <Link className='footerlink'>cookies policy </Link>
                        <Link className='footerlink'>Terms & conditions </Link>
                    </div>
                    <div className='information'>
                        <h1>Informations sur la livraison</h1>
                        <h2>Informations d'expédition Pour garantir que vos achats arrivent sans problème, assurez-vous de fournir l'adresse et le numéro de téléphone corrects pour garantir une 
                        expérience d'achat pratique et efficace. Assurez-vous que vos informations d'expédition sont à jour, y compris les détails de l'adresse et le délai de livraison souhaité, pour 
                        vous assurer de recevoir votre commande rapidement et sans retards inutiles.
                        </h2>
                    </div>
                </div>
                <div className='cartfooter cartfootertwo'>
                <div className='important'>
                        <h1>coordonnées</h1>
                        <h2>Contactez-nous pour toute demande de renseignements ou d'assistance dont vous avez besoin, nous sommes là pour vous fournir soutien et conseils
                        </h2>
                    </div>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={address}/>
                        <h2>l'adresse:</h2>
                        </div>
                        <h2>LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M) <br />
                        Tetouan: Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan
                        </h2>
                    </div>
                    <div className='flexphoneemail'>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={phone}/>
                        <h2>Phone:</h2>
                        </div>
                        <h2>00212689831227</h2>
                    </div>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={email}/>
                        <h2>Email:</h2>
                        </div>
                        <h2>contact@vitaparapharma.com</h2>
                    </div>
                    </div>
                </div>
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