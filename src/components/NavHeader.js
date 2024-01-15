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


function NavHeader({handleProductClick}) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const allProducts = useSelector((state) => state.products);
  const products = useSelector((state) => state.products);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const cart = useSelector(state => state.cart);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Clear userId on logout
   
  };
  useEffect(() => {
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://mostafaben.bsite.net/api/Categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    checkLoggedInStatus();
    fetchCategories();
  }, [dispatch]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('');

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryColor(categoryId === null ? '' : 'red'); // Set the color for the selected category

  };
 
  const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  /*const handleProductClick = (productId) => {
    // Handle product click logic here
    console.log('Product clicked:', productId);
  };*/

  /*const filteredProducts = allProducts.filter((product) => {
    const titleMatches = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatches = !selectedCategoryId || product.categoryId === selectedCategoryId;

    return titleMatches && categoryMatches;
  });*/
 /* const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
  
    return matchesSearch && matchesCategory;
  });*/

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.descreption.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;

    return matchesSearch && matchesCategory;
  }); 

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
   


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <div className="wrapper">
        <div className='search-dropdown-container'>
          <div>
        

      <div className='searchcontainer'>
        
      <button onClick={toggleDropdown} className="dropdown-button">
      {selectedCategory}
      </button>
      {isDropdownOpen && (
        <ul className={`dropdown-list ${isDropdownOpen ? 'open' : ''}`}>
          {categories.map(category => (
            <li
              key={category.id}
              onClick={() => handleCategoryFilter(category.id) }
              className={`filterbycat ${selectedCategoryId === category.id ? 'selected' : ''}`}

            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
            <input
              type="text"
              placeholder="search "
              value={searchTerm}
              onChange={handleSearchChangeInternal}
            />
            
          </div>
        </div>
        {searchTerm && (
          <div className="autocom-box">
            {filteredProducts.map((product) => (
              <li
                className="product-dropdown-item"
                key={product.id}
                onClick={() => handleProductClick(product.id)}
              >
                {product.title}
              </li>
            ))}
          </div>
        )}
      </div>
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