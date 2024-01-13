import React from 'react';
import logo from '../images/Vita Logo2.png' ;
import product from '../images/product.png' ;
import { FaSearch } from 'react-icons/fa';
import { FaHeart, FaShoppingCart , FaEye } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useEffect , useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import { fetchProducts } from '../rtk/slices/Product-slice';
import { addToWishlist , removeFromWishlist  } from '../rtk/slices/Wishlist-slice';
import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './navheader.css';


function NavHeader({ searchTerm, handleSearchChange , filteredProducts, handleProductClick }) {

    const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector(state => state.cart);
 // const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  

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

    if (userToken) {
      const storedWishlist = localStorage.getItem('wishlist');
      const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      parsedWishlist.forEach((productId) => {
        dispatch(addToWishlist(productId));
      });
    }
  };

  
  const handleLogout = () => {
    localStorage.removeItem('token');
   
    setIsLoggedIn(false); 
    setIsDropdownOpen(false); 
  };



  const [quantity, setQuantity] = useState(0);



  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === 'profile') {
      navigate('/profile'); 
    } else if (option === 'logout') {
      handleLogout();
    }
  
    // Close the dropdown after handling the option
    setIsDropdownOpen(false);
  };
  
 /* const filteredProducts = products.filter((product) =>
  product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())
);*/

const allProducts = useSelector((state) => state.products);
const cartProducts = useSelector((state) => state.cart);

/*const handleSearchChange = (e) => {
  const term = e.target.value;
  setSearchTerm(term.toLowerCase());
};*/

// Filter the products based on the search term entered in the Cart page
/*const filteredProducts = allProducts.filter((product) =>
  product.title.toLowerCase().includes(searchTerm)
);*/
  const handleUserIconClick = () => {
    toggleDropdown();
  };


    return(
      <Navbar  collapseOnSelect expand="lg"  className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <div >
        {/** <div className='search' >
                <input type="text" style={{ marginTop : '25px', width : '300px' ,background: 'white'}} placeholder="Search" className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                />
                <FaSearch className="search-icon" />
                {searchTerm && (
          <div className="search-dropdown">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="product-dropdown-item"
              >
                <p style={{color : '#3A7E89'}}>{product.title}</p>
              </div>
            ))}
          </div>
        )}
              </div> */}

<div className="wrapper">
          <div>
            <a href="" target="_blank" hidden></a>
            <input
              type="text"
              placeholder="search "
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="icon" onClick={() => handleProductClick(filteredProducts[0]?.id)}>
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>
        {searchTerm && (
        <div className="autocom-box">
          {filteredProducts.map((product) => (
            <li  className="product-dropdown-item" key={product.id} 
            onClick={() => handleProductClick(product.id)}>
              {product.title}
            </li>
          ))}
        </div>
        )}
    
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            
            <div className="text-line">
              <Link to="/home">{translations[language]?.home}</Link>
              <Link to="/store">{translations[language]?.store}</Link>
              <Link to="/blog">{translations[language]?.blog}</Link>
              {isLoggedIn && <Link to="/order">{translations[language]?.orders}</Link> }
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
           
            <select className='selectLang' value={language} onChange={handleLanguageChange}>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="arabic">Arabic</option>
            </select>
            <div className='text-line'>
             {isLoggedIn ? (
                  <Link onClick={handleLogout}>{translations[language]?.logout}</Link>
                ) : (
                  <Link to="/authentication">{translations[language]?.login}</Link>
                )} 
                </div>
          </Nav>
        </Navbar.Collapse>
      </Container>

    </Navbar>
    );
}
export default NavHeader;