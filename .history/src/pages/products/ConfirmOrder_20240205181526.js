import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../../images/Vita Logo2.png";
import { FaTrash } from "react-icons/fa";
import { Button, Container, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../rtk/slices/Cart-slice";
import { useEffect } from "react";
import product from "../../images/product.png";
import NavHeader from "../../components/NavHeader";
import axios from "axios";
<<<<<<< HEAD
import "./confirmOrder.css";
import { selectToken } from "../../rtk/slices/Auth-slice";
=======
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal } from 'react-bootstrap';
import './confirmOrder.css';
>>>>>>> upstream/main

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
<<<<<<< HEAD
  const cart = useSelector((state) => state.cart);
  const bearerToken = useSelector(selectToken);
  const [address, setAdress] = useState([]);
  const [outOfStuckProduct,setOutofstuckproduct]=useState([])
=======
  const cart = useSelector(state => state.cart);
  const bearerToken = useSelector(selectToken);
>>>>>>> upstream/main

  useEffect(() => {
    fetchUserAdresses();
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const totalprice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

<<<<<<< HEAD
=======
 

  

>>>>>>> upstream/main
  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
  };

  const fetchUserAdresses = async () => {
    try {
      // const language = 'en'; // Replace with the desired language (en, ar, fr)

      const response = await axios.get(
        `https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/all`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      // console.log("addreses", response.data);
      setAdress(response.data.data.addresses);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const allProducts = useSelector((state) => state.products);
  const cartProducts = useSelector((state) => state.cart);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    email: "",
    notes: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

<<<<<<< HEAD
=======
 

  const [address, setAdress] = useState([]);

  const fetchUserAdresses = async () => {
    try {
      const response = await axios.get(
        'https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/all',
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("addreses", response.data);
      setAdress(response.data.data.addresses);
    }
    catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };


  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCloseModal = () => setShowModal(false);

>>>>>>> upstream/main
  const createOrder = async (addressId) => {
    try {
      const response = await axios.post(
        `https://ecommerce-1-q7jb.onrender.com/api/v1/user/order/cart/on/${addressId}`,
        {},
        {
          headers: {
<<<<<<< HEAD
            Authorization: `Bearer ${bearerToken}`,
=======
            'Authorization': `Bearer ${bearerToken}`,
>>>>>>> upstream/main
          },
        }
      );

      if (
        response.status === 200 
      ) {
        console.log("Order submitted successfully");
      } else {
        console.log("The order is out of stuck:", response.data.data);
        setOutofstuckproduct(response.data.data)
        alert(`this order is out of stock`)
      }
    } catch (error) {
      console.log("Error submitting form:", error.message);
    }
  };

<<<<<<< HEAD
=======
 

>>>>>>> upstream/main
  const handleSubmit = async (addressId) => {
    createOrder(addressId);
    console.log(addressId);
  };
<<<<<<< HEAD
  return (
=======

  useEffect(() => {
    fetchUserAdresses();
  }, []);

  return(
>>>>>>> upstream/main
    <div className="confirmPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
<<<<<<< HEAD
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr  ">
        <div className="header-container ">
          <div className="flexContainerCart">
            <div className="flexcart">
              <div className="formOrder">
                <form className="form">
                  <div className="formOrder">
                    <div className="d-flex flex-column">
                      <div className="d-flex flex-row">
                        <p className="p-4">Country</p>
                        <p className="p-4">City</p>
                        <p className="p-4">Region</p>
                        <p className="p-4">Street</p>
                        <p className="p-4">Zip Code</p>
                      </div>
                      {address.map((item, index) => (
                        <div className="d-flex flex-row" key={index}>
                          <p className="p-2">{item.country}</p>
                          <p className="p-2">{item.city}</p>
                          <p className="p-2">{item.region}</p>
                          <p className="p-2">{item.street}</p>
                          <p className="p-2">{item.zipCode}</p>

                          <button
                            className="btn-primary"
                            onClick={() => handleSubmit(item.addressId)}
                          >
                            Confirm Order on this address
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* 
            <div className="total confirmtotal">
              <h4>Total Price : {totalprice.toFixed(2)}</h4>
              <h6>Paiement when recieving</h6>
              <h6>
                Your Personal data will be used to process your order , support
                your experience throughout this website , and for other purposes
                described in our
                <Link
                  to="/privacy-policy"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <strong> privacy policy </strong> .
                </Link>
              </h6>
              <p>
                <input type="checkbox" id="myCheckbox" /> i agree to conditions
                and privacy policy
              </p>
              <button onClick={handleSubmit} className="confirmbtn">
                Confirm
              </button>
            </div> */}

          
             <div className="text-red">
                {outOfStuckProduct?.map((item)=>item?.id)}
              </div>
        
          </div>
        </div>
        <div className="footerr">
          <div className=" header-container flex-footer">
            <div className="footer-info">
              <p>{translations[language]?.links}</p>
              <p>{translations[language]?.shipping} </p>
            </div>
            <div className="footer-info">
              <p>{translations[language]?.private} </p>
              <p>{translations[language]?.cookies} </p>
            </div>
            <div className="footer-info">
              <p>{translations[language]?.info}</p>
              <p>{translations[language]?.contactP}</p>
            </div>
            <div className="footer-info">
              <p>{translations[language]?.subscribe}</p>
            </div>
          </div>
        </div>
      </div>
=======
        
        handleProductClick={handleProductClick}
      />

<Container style={{ marginTop: '50px' }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
          <th className="p-4">country</th>
          <th className="p-4">city</th>
          <th className="p-4">region</th>
          <th className="p-4">street</th>
          <th className="p-4">zipCode</th>
          <th>action</th>
          </tr>
        </thead>
        <tbody>
          {address.map((item) => (
            <tr >
              <td>{item.country}</td>
              <td>{item.city}</td>
              <td>{item.region}</td>
              <td>{item.street}</td>
              <td>{item.zipCode}</td>
            <td>
                <button 
                onClick={() => handleSubmit(item.addressId)}
                className="useaddress">confirm order in this address</button>
          </td>
            </tr>
          ))}
        </tbody>
      </Table>

      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
>>>>>>> upstream/main
    </div>
  );
}
export default ConfirmOrder;
<<<<<<< HEAD
=======

>>>>>>> upstream/main
