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
//import { addToWishlist , removeFromWishlist  } from '../rtk/slices/Wishlist-slice';
//import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './navheader.css';
import SidebarUser from './SidebarUser';
import { clearWishlist } from '../rtk/slices/Wishlist-slice';


function NavHeader({ userId , handleProductClick }) {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const allProducts = useSelector((state) => state.products);
  const products = useSelector((state) => state.products);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryIdTwo, setSelectedCategoryIdTwo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const cart = useSelector(state => state.cart);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 
    const storedUserId = localStorage.getItem('userId');
  if (userId !== storedUserId) {
    dispatch(clearWishlist());
    localStorage.removeItem('wishlist');
  }

    setIsLoggedIn(false);
  };
  useEffect(() => {
    const checkLoggedInStatus = () => {
      const userToken = localStorage.getItem('token');
      setIsLoggedIn(!!userToken);

      /*if (userToken) {
        const storedWishlist = localStorage.getItem('wishlist');
        const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
        parsedWishlist.forEach((productId) => {
          dispatch(addToWishlist(productId));
        });
      }*/
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

  useEffect(() => {
    if (!isLoggedIn) {
    
    }
  }, [isLoggedIn]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('');

 
  const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };
  

 
  

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.descreption.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;

    return matchesSearch && matchesCategory;
  }); 

  const [productExistsInCategory, setProductExistsInCategory] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setShowErrorMessage(false);
    setProductExistsInCategory(true); 
  };

 

  const handleSearchSubmit = () => {
    
    const productsInSelectedCategory = filteredProducts.filter(product => product.categoryId === selectedCategoryId);
  
    
    const searchTermLowerCase = searchTerm ? searchTerm.toLowerCase() : '';
    const productsMatchingSearch = productsInSelectedCategory.filter(product => {
      const productNameLowerCase = product.title ? product.title.toLowerCase() : '';
      return productNameLowerCase.includes(searchTermLowerCase);
    });
  
    if (selectedCategoryId !== null && productsMatchingSearch.length === 0) {
      setProductExistsInCategory(false);
      setShowErrorMessage(true);
      setTimeout(resetErrorMessage, 3000);
    } else {
      navigate(`/store?search=${searchTerm}${selectedCategoryId !== null ? `&category=${selectedCategoryId}` : ''}`);
    }
  };
  

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');  

 


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

 
  const handleSelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    handleCategoryFilter(categoryId);
  };

  
  const handleSelectTwo  = (categoryId) => {
    setSelectedCategoryIdTwo(categoryId);
    navigate(`/store?category=${categoryId}`);
  };
  

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };


  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  
  return (
    <Navbar  collapseOnSelect expand="lg" className=" bg-body-tertiary">
      
  <Container >
    <div  className='flexNav'>
      <div  className='flexNavone'>

      <div className='search-dropdown-container'>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
    <select
      value={selectedCategoryId}
      onChange={(e) => handleSelect(parseInt(e.target.value))}
      className="dropdown-select"
    >
      <option  value={null}>All</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
    <div className="input-with-icon">
      <input
        type="text"
        placeholder="Search Product"
        value={searchTerm}
        onChange={handleSearchChangeInternal}
      />
      <FaSearch className='searchicon' onClick={handleSearchSubmit} />
    </div>
    <div className="autocom-box">
      {productExistsInCategory === false && (
        <div className="error-message">
          This product does not exist in the selected category.
        </div>
      )}
    </div>
  </div>
</div>

        <Navbar.Brand>
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <div className='flexRightNav'>
        <select className='selectLang' value={language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="french">Française</option>
          <option value="arabic">لغه عربيه</option>
        </select>

        <div className="text-line">
          
          {!isLoggedIn && (
            <div className='logindiv'>
                <Link  to="/authentication">{translations[language]?.login}</Link>
            </div>
          )}
        </div>

        <div className="text-line">
          {isLoggedIn && (
            <Link>
              <div className="user-profile" onClick={toggleSidebar}>
                <FaUser />
              </div>
            </Link>
          )}
        </div>
      </div>
      </div>

     
      <Container className='navPagesContainer'>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <div className="navPages">
          <Link to="/home">{translations[language]?.home}</Link>
          <Link to="/store">{translations[language]?.store}</Link>
          <Link to="/blog">{translations[language]?.blog}</Link>


<select
  value={selectedCategoryIdTwo}
  onChange={(e) => handleSelectTwo(parseInt(e.target.value))}
  className="dropdown-selectTwo"
>
  <option value={null} className="dropdown-selectTwo">{translations[language]?.categories}</option>
  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>


          <Link to="/about">{translations[language]?.about}</Link>
          <Link to="/contact">{translations[language]?.contact}</Link>
        </div>
      </Nav>
    </Navbar.Collapse>
  </Container>
    </div>
  </Container>

  

  <SidebarUser isOpen={showSidebar} onClose={toggleSidebar} handleLogout={handleLogout} />
</Navbar>

  );
}

export default NavHeader;