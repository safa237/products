import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaPlus , FaMinus } from "react-icons/fa";
import logo from '../../images/Vita Logo2.png' ;
import { Link } from "react-router-dom";
import StarRating from "../rate/StarRating";
import ReviewDialog from "./ReviewDialog";
import { addToCart } from "../../rtk/slices/Cart-slice";
import { useDispatch } from "react-redux";
import './ProductDetails.css';

function ProductDetails({rating}) {
  const api_url = "https://mostafaben.bsite.net/api/Products";
  const [product, setProduct] = useState({});
  const params = useParams();
  console.log(params);
  useEffect(() => {
    fetch(`${api_url}/${params.productId}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, []);


  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const handleDetailsClick = (selectedProduct) => {
        
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };
const [detailsOpen, setDetailsOpen] = useState(false);

const dispatch = useDispatch();

const handleAddToCart = (productId, product) => {
 
  dispatch(addToCart(product));
};

  return (
    <div className="detailsPage">
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

        <div className="green-containerr">
          
          <div className="header-container flexContent">
            <div className="detailsIMG">
            {product.poster && (
             <img className="productImg"
               src={`data:image/png;base64,${product.poster}`}
               alt="Product poster"/>)}

            </div>
            <div className="detailsINFO">
              <h1 style={{color: 'white'}}>{product.title}</h1>
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
Cornell University in New York.
              </p>
            </div>
          </div>
          <div className="productFooter">
            <div className="header-container flexFooter">
              <div className="review">
                <button onClick={() => handleDetailsClick()}>Review</button>
              </div>
              <div className="middlefooter">
                <StarRating rating={rating} />
                <div style={{ marginLeft: "20px" }}>
                  <h1>{product.price * count} $</h1>
                </div>
                <div className="counter">
                  <button onClick={handleDecrement}>
                    <FaMinus />
                  </button>
                  <span>{count}</span>
                  <button onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="review">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
          </div>
          
        </div>
    
        <ReviewDialog
          isOpen={detailsOpen}
          onCancel={handleCancelDetails}
       />
    </div>
  );
}

export default ProductDetails;