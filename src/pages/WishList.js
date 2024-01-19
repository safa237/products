import React from 'react';
import { selectWishlist } from '../rtk/slices/Wishlist-slice';
import { selectProducts } from '../rtk/slices/Product-slice';
import { removeFromWishlist } from '../rtk/slices/Wishlist-slice';
import { Button, Container , Table , Image } from "react-bootstrap";

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
import { addToWishlist   } from '../rtk/slices/Wishlist-slice';
import DetailsDialog from './products/DetailsDialog';
import { addToCart } from '../rtk/slices/Cart-slice';
import { CiStar } from "react-icons/ci";
import NavHeader from '../components/NavHeader';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useLocation } from 'react-router-dom';
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';

function Wishlist() {
  const navigate = useNavigate();
  const wishlist = useSelector(selectWishlist);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const allProducts = useSelector((state) => state.products);


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className='whishlistCont'>
    <NavHeader
        searchTermm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProductss={filteredProducts}
        handleProductClick={handleProductClick}
      />
      <div className='green-containerr greenabout cartGreen'>
        <div className='contactContainer home-containerr'>
    <Container style={{marginTop: '50px'}}>
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {wishlistProducts.map((product) => (
            <tr key={product.id}>
            <td>
                <Image
                        src={`data:image/png;base64,${product.poster}`}
                        alt="Product poster"
                        style={{width: "100px" , height: "100px"}}
                />
            </td>
            <td>{product.title}</td>
           
            <td>{product.price}</td>
            
          </tr>
      ))}
      </tbody>
    </Table>
        </Container>
        </div>
        </div>
        </div>
  );
}

export default Wishlist;
