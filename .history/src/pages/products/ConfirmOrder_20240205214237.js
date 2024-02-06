import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, selectLanguage, selectTranslations } from "../../rtk/slices/Translate-slice";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Button, Container, Table, Modal } from "react-bootstrap";
import axios from "axios";
import { selectToken } from "../../rtk/slices/Auth-slice";
import "./confirmOrder.css";

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const cart = useSelector((state) => state.cart);
  const bearerToken = useSelector(selectToken);
  const [newAddress, setNewAddress] = useState({
    country: "",
    city: "",
    region: "",
    street: "",
    zipCode: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchUserAddresses();
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
    // Your deleteFromCart logic here
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    // Your search logic here
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const fetchUserAddresses = async () => {
    try {
      const response = await axios.get("https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/all", {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setAddress(response.data.data.addresses);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

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

  const addNewAddress = async () => {
    try {
      const response = await axios.post(
        "https://ecommerce-1-q7jb.onrender.com/api/v1/user/address/new",
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      console.log("adding new address successfully", response.data);
      setNewAddress({
        country: "",
        city: "",
        region: "",
        street: "",
        zipCode: 0,
      });
      fetchUserAddresses();
    } catch (error) {
      console.log("error in add newAddress >>", error);
      fetchUserAddresses();
    }
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [fieldName]: value,
    }));
  };

  return (
    <div className="confirmPage">
      {/* Your NavHeader component and other UI elements here */}
      
      <Container style={{ marginTop: "50px" }}>
        <Table striped bordered hover size="sm">
          {/* Table headers */}
          <tbody>
            {/* Table rows for existing addresses */}
            {address.map((item) => (
              <tr key={item.addressId}>
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
                    Confirm order in this address
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div>
          <button className="useaddress" onClick={() => setShowForm(!showForm)}>
            Adding New Address
          </button>
          {showForm && (
            <Table striped bordered hover size="sm">
              {/* Form headers */}
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => handleInputChange(e, "country")}
                      value={newAddress.country}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => handleInputChange(e, "city")}
                      value={newAddress.city}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => handleInputChange(e, "region")}
                      value={newAddress.region}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => handleInputChange(e, "street")}
                      value={newAddress.street}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      onChange={(e) => handleInputChange(e, "zipCode")}
                      value={newAddress.zipCode}
                    />
                  </td>
                  <td>
                    <button
                      className="useaddress"
                      onClick={() => addNewAddress()}
                    >
                      Save this Address
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
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
