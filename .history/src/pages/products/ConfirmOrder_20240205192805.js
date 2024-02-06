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
import { selectToken } from "../../rtk/slices/Auth-slice";
import { Modal } from "react-bootstrap";
import "./confirmOrder.css";

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const bearerToken = useSelector(selectToken);

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

  const handleDeleteFromCart = (productId) => {
    dispatch(deleteFromCart({ id: productId }));
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

  const [address, setAdress] = useState([]);

  const fetchUserAdresses = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/all",
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("addreses", response.data);
      setAdress(response.data.data.addresses);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const createOrder = async (addressId) => {
    try {
      const response = await axios.post(
        `https://ecommerce-1-q7jb.onrender.com/api/v1/user/order/cart/on/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (response.status === 200) {
        setModalMessage("Order submitted successfully");
        setShowModal(true);
      } else {
        console.log("Error submitting order:", response.data);

        if (response.data && response.data.message) {
          setModalMessage(` ${response.data.message}`);
          setShowModal(true);
        } else {
          console.error("Unknown error:", response.data);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async (addressId) => {
    createOrder(addressId);
    console.log(addressId);
  };



  return (
    <div className="confirmPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <Container style={{ marginTop: "50px" }}>
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
              <tr>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>{item.region}</td>
                <td>{item.street}</td>
                <td>{item.zipCode}</td>
                <td>
                  <button
                    onClick={() => handleSubmit(item.addressId)}
                    className="useaddress"
                  >
                    confirm order in this address
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
              <div>
                
              </div>
        
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
    </div>
  );
}
export default ConfirmOrder;
