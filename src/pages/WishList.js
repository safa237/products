/*import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, addToWishlist, removeFromWishlist } from '../rtk/slices/Product-slice';
import { Button, Container, Table } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavHeader from '../components/NavHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlistProducts = async () => {
    try {
      const response = await axios.get('https://mostafaben.bsite.net/api/Wishlist/25');
      setWishlistProducts(response.data); // Assuming the API response is an array of products
      setLoading(false);
      console.log("success fetch products", response.data);
      console.log("productid", response.data.wishlistItem.productId);
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistProducts();
  }, []); 

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="wishlistContainer">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Container style={{ marginTop: '50px' }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
             
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2">Loading...</td>
              </tr>
            ) : wishlistProducts.length === 0 ? (
              <tr>
                <td colSpan="2">No products found in wishlist.</td>
              </tr>
            ) : (
              wishlistProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.productId}</td>
                  
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Wishlist;*/


// WishlistPage.js
/*import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  console.log('Wishlist State:', wishlist);
  return (
    <div>
      <h1>Wishlist</h1>
      {wishlist.map((product) => (
        <div key={product.id}>
          
          {product && (
            <>
              <h1>{product.id}</h1>
              <p>{product.price}</p> 
            </>
          )}
        </div>
      ))}
    </div>
  );
};



export default Wishlist;*/

// Wishlist.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, addToWishlist, removeFromWishlist } from '../rtk/slices/Product-slice';
import { Button, Container, Table } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import NavHeader from '../components/NavHeader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.id);

  const fetchWishlistProducts = async () => {
    try {
      const response = await axios.get(`https://mostafaben.bsite.net/api/Wishlist/${userId}`);
      setWishlistProducts(response.data); // Assuming the API response is an array of products
      setLoading(false);
      console.log("success fetch products", response.data);
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistProducts();
  }, []); 

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="wishlistContainer">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Container style={{ marginTop: '50px' }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="1">Loading...</td>
              </tr>
            ) : wishlistProducts.length === 0 ? (
              <tr>
                <td colSpan="1">No products found in wishlist.</td>
              </tr>
            ) : (
              wishlistProducts.map((wishlistItem) => (
                <tr key={wishlistItem.wishlistItem.id}>
                  <td>{wishlistItem.wishlistItem.productId}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Wishlist;
