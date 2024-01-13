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
import { useSelector } from "react-redux";
import NavHeader from "../../components/NavHeader";
import { useNavigate } from "react-router-dom";
import './ProductDetails.css';

function ProductDetails({rating}) {
  const navigate = useNavigate();
  const api_url = "https://mostafaben.bsite.net/api/Products";
  const [product, setProduct] = useState({});
  const params = useParams();
  console.log(params);
  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };
  useEffect(() => {
    fetch(`${api_url}/${params.productId}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [handleProductClick]);
 

  const [totalPrice, setTotalPrice] = useState(0);

  const [quantity, setQuantity] = useState(0);
  const allProducts = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  // Filter the products based on the search term entered in the Cart page
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const dispatch = useDispatch();

const handleAddToCart = () => {
  const cartItem = {
    productId: product.id,
    poster : product.poster ,
    title: product.title,
    quantity: quantity,
    price: product.price,
  };

  dispatch(addToCart(cartItem));
  setQuantity(0);
    setTotalPrice(0);
};


  const handleDetailsClick = (selectedProduct) => {
        
    setDetailsOpen(true);
  };

  const handleCancelDetails = () => {
    setDetailsOpen(false);
  };
const [detailsOpen, setDetailsOpen] = useState(false);




  return (
    <div className="detailsPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
      />

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
                  <h1>{product.price * quantity} $</h1>
                </div>
                <div className="counter">
                  <button onClick={handleDecrement}>
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button onClick={handleIncrement}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="review cart">
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