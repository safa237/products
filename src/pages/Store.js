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
import { fetchProducts , selectProducts} from '../rtk/slices/Product-slice';
//import { addToWishlist , removeFromWishlist  } from '../rtk/slices/Wishlist-slice';
//import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import DetailsDialog from './products/DetailsDialog';
import { addToCart } from '../rtk/slices/Cart-slice';
import { CiStar } from "react-icons/ci";
import NavHeader from '../components/NavHeader';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';
import SidebarUser from '../components/SidebarUser';
import { addToWishlist , removeFromWishlist } from '../rtk/slices/Wishlist-slice';
import { clearWishlist } from '../rtk/slices/Wishlist-slice';
import loginimg from '../images/loginIcon.png';
import logoutimg from '../images/logouticon.png';
import cartimg from '../images/Cart.png';
import './store.css';

function Store  ()  {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const cart = useSelector(state => state.cart);
  

  const navigate = useNavigate();
  /*const [products, setProducts] = useState([]);*/
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  const userId = useSelector((state) => state.auth.id);
  const products = useSelector(selectProducts);

  const handlePriceRangeChange = (event) => {
    const { value } = event.target;
    setPriceRange((prevRange) => ({ ...prevRange, max: value }));
  };
  
  const [favoriteStatus, setFavoriteStatus] = useState({});

  const handleAddToFavorites = (productId, product) => {
    console.log('Product Object:', product);
    if (!productId || !product) {
      console.error('Product ID or product is undefined');
      return;
    }
  
    const isFavorite = favoriteStatus[productId] || false;
  
    if (!isFavorite) {
      const url = `https://mostafaben.bsite.net/api/Wishlist?userId=${userId}&productId=${productId}`;
  
      axios
        .post(url)
        .then((response) => {
          console.log(`Product ${productId} added to favorites successfully`, response.data);
          setFavoriteStatus((prevState) => ({ ...prevState, [productId]: true }));
          saveFavoritesToLocalStorage(userId, { ...favoriteStatus, [productId]: true });
          dispatch(addToWishlist(product)); // Dispatch action to add to wishlist
    
        })
        .catch((error) => {
          console.error(`Failed to add product ${productId} to favorites`, error);
        });
    } else {
      // Handle case when the product is already in favorites
    }
  };
  
  const handleRemoveFromFavorites = (productId, product) => {
    const url = `https://mostafaben.bsite.net/api/Wishlist/${productId}`;
  
    axios
      .delete(url)
      .then((response) => {
        console.log(`Product ${productId} removed from favorites successfully`, response.data);
        setFavoriteStatus((prevState) => ({ ...prevState, [productId]: false }));
        saveFavoritesToLocalStorage(userId, { ...favoriteStatus, [productId]: false });
        dispatch(removeFromWishlist(productId));
      })
      .catch((error) => {
        console.error(`Failed to remove product ${productId} from favorites`, error);
      });
  };
  
  const saveFavoritesToLocalStorage = (userId, favorites) => {
    const userFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || {};
    localStorage.setItem(`favorites_${userId}`, JSON.stringify({ ...userFavorites, ...favorites }));
  };
  
  const handleClick = (productId, product) => {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }
  
    const isFavorite = favoriteStatus[productId] || false;
  
    if (isFavorite) {
      handleRemoveFromFavorites(productId, product);
    } else {
      handleAddToFavorites(productId, product);
    }
  };
  
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || {};
    setFavoriteStatus(savedFavorites);
    checkLoggedInStatus();
  }, [userId]);
  

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
  }, [language ]);


  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const checkLoggedInStatus = () => {
    const userToken = localStorage.getItem('token');
    setIsLoggedIn(!!userToken);

    // Load wishlist from localStorage
    /*if (userToken) {
      const storedWishlist = localStorage.getItem('wishlist');
      const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      // Dispatch the addToWishlist action to update the store
      parsedWishlist.forEach((productId) => {
        dispatch(addToWishlist(productId));
      });
    }*/
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
 

 /* const handleAddToFavorites = (productId) => {
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
  };*/

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

  /*const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };*/

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategoryId(categoryId);
     
    navigate(`/store?category=${categoryId}`); 
    dispatch(fetchProducts(categoryId));
  };

  

 /* const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;

    return matchesSearch && matchesCategory;
  });*/

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
    const matchesPriceRange =
      product.price >= priceRange.min && product.price <= priceRange.max;

    return matchesSearch && matchesCategory && matchesPriceRange;
  });

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Adjust the API endpoint and data structure based on your actual API
        const response = await axios.get('https://mostafaben.bsite.net/api/Categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTermFromUrl = queryParams.get('search') || '';
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
    setSearchTerm(searchTermFromUrl);

    const categoryIdFromUrl = queryParams.get('category');
  setSelectedCategoryId(categoryIdFromUrl ? parseInt(categoryIdFromUrl) : null);
  }, [language, searchTermFromUrl]);
  
  // ...

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Update the URL when the search term changes
    navigate(`/store?search=${term}`);
  };


  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  






  const [selectedCategoryIdTwo, setSelectedCategoryIdTwo] = useState(null);


  const handleSelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    handleCategoryFilter(categoryId);
  };

  
  const handleSelectTwo  = (categoryId) => {
    setSelectedCategoryIdTwo(categoryId);
    navigate(`/store?category=${categoryId}`);
  };
  
  const handleSearchChangeInternal = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
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
  const [productExistsInCategory, setProductExistsInCategory] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const resetErrorMessage = () => {
    setShowErrorMessage(false);
    setProductExistsInCategory(true); 
  };

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [userRating, setUserRating] = useState(0);
  const fetchUserRating = async () => {
    try {
      const response = await axios.get('https://mostafaben.bsite.net/api/Rating/user/14');
      return response.data.value || 0;
    } catch (error) {
      console.error('Error fetching user rating:', error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const rating = await fetchUserRating();
      setUserRating(rating);
    };

    fetchData();
  }, []);


    return (
      <div className="page-container">
      {/* Header Container */}
      <>
    <div className='flexLanguage '>
        <div className='languageInnav rightAlign'>
      <select className='selectLang ' value={language} onChange={handleLanguageChange}>
          <option value="english">English</option>
          <option value="french">Française</option>
          <option value="arabic">لغه عربيه</option>
        </select>
        </div>
      </div>
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
       

        <div className="text-line">
          
          {!isLoggedIn && (
            <div className='logindiv flexlogindiv '>
               <div> <img style={{width: '15px' , height: '15px'}} src={loginimg} alt='user'/> </div>
               <div> <Link  to="/authentication">Login</Link> </div>
            </div>
          )}
        </div>

        <div className="text-line">
          {isLoggedIn && (
            <>
             <Link to="/cart" className="cart-link">
             <img style={{marginRight : '10px' , width: '30px' , height: '30px'}} src={cartimg} alt='cart'/>
           </Link>
            <Link>
              <div className="user-profile" onClick={toggleSidebar}>
              <img style={{width: '40px' , height: '40px'}} src={logoutimg} alt='user'/>
              </div>
            </Link>
            </>
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
</>
  
      {/* Green Container */}
      <div className="green-containerr">
       
        <div className='home-containerr testtt'>
       {/**  <div  className="search-container searchStore">
                <input type="text" style={{background: 'white'}} placeholder="Search" className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div> */}

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
           
            <FaHeart
  onClick={() => handleClick(product.id, product)}
  style={{ color: favoriteStatus[product.id] ? 'red' : 'black' }}
/>
          

           {isLoggedIn && <FaEye className="cart-iconPro"
                 onClick={() => handleDetailsClick(product)}
               /> }
                              

              </div>
              <div className="card-imgstore" >
              
                    <Link to={isLoggedIn ? `/home/product/${product.id}` : null}>
    <img src={`data:image/png;base64,${product.poster}`} alt="Product poster" />
  </Link>
                  
              </div>
              <div className='card-info card-infoStore'>
                <h2>{product.title}</h2>
                
                <div className='rate'>
                
                {isLoggedIn && <StarRating
                           initialRating={product.rate}
                          isClickable={false}
                        /> }
  
                </div>
                <div className='price'>{`$${product.price}`}</div>
              </div>
              <button
  className="proBtn"
  onClick={() => handleAddToCart(product.id, product)}
>
  add to cart
</button>
              
             
            </div>
          </div>
        ))}
          </div>
     )}
           
          <div className='storeside'>
            <p></p>
          <div >
          <h5 style={{color : 'black'}}>filter by category</h5>
          <div className='filterCatdiv'>
          <div className='rateFilter'>
          <button
                    color="primary"
                    onClick={() => handleCategoryFilter(null)}
                    className='filterbycat'
                  >
                    All Categories
                  </button>
  {categories.map(category => (
    <button
      key={category.id}
      color="primary"
      onClick={() => handleCategoryFilter(category.id)}
      className='filterbycat'
    >
      {category.name}
    </button>
  ))}
</div>
</div>
         {/*<p style={{marginTop:'5em'}}>filter by category</p>
          <div className='rateFilter'>
            <div ><CiStar /> Five Only</div>
            <div > <CiStar />four Only</div>
            <div> <CiStar />three Only</div>
            <div><CiStar /> two Only</div>
            <div><CiStar /> one Only</div>
  </div>*/}

  <h5 style={{marginTop: '50px' , color : 'black'}}>filter by price : {priceRange.max}</h5>
   <div  className="range-slider">
      <input
        type="range"
        min="0"
        max="2000"
        value={priceRange.max}
        onChange={handlePriceRangeChange}
      />
     
    </div>
   
          
          
          </div>
          </div>
          
      </div>
  
          <div className='marks'>
           
          </div>
  
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

export default Store;