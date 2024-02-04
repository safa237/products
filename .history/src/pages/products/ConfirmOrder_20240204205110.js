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
import "./confirmOrder.css";

function ConfirmOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {}, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const totalprice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  useEffect(() => {
    console.log("Cart:", cart);
  }, [cart]);

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mostafaben.bsite.net/api/Orders/addOrderDetail",
        {
          ...formData,
          // Include other necessary data from your state or props
        }
      );

      if (response.status === 200) {
        // Handle success, maybe show a success message or redirect
        console.log("Order submitted successfully");
      } else {
        // Handle error, maybe show an error message
        console.error("Error submitting order:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="confirmPage">
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr  ">
        <div className="header-container ">
          <div className="flexContainerCart">
            <div className="flexcart">
              <div className="formOrder">
                <form
                  className="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="flexInput">
                    <input
                      className="name"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <input
                      className="name"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <select
                    style={{
                      width: "100%",
                      marginBottom: "15px",
                      marginRight: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a Country</option>
                    <option value="albania">Albania</option>
                    <option value="algeria">Algeria</option>
                    <option value="andorra">Andorra</option>
                    <option value="angola">Angola</option>
                    <option value="argentina">Argentina</option>
                    <option value="australia">Australia</option>
                    <option value="austria">Austria</option>
                    <option value="bahrain">Bahrain</option>
                    <option value="bangladesh">Bangladesh</option>
                    <option value="belgium">Belgium</option>
                    <option value="brazil">Brazil</option>
                    <option value="canada">Canada</option>
                    <option value="china">China</option>
                    <option value="denmark">Denmark</option>
                    <option value="egypt">Egypt</option>
                    <option value="finland">Finland</option>
                    <option value="france">France</option>
                    <option value="germany">Germany</option>
                    <option value="greece">Greece</option>
                    <option value="india">India</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="ireland">Ireland</option>
                    <option value="italy">Italy</option>
                    <option value="japan">Japan</option>
                    <option value="mexico">Mexico</option>
                    <option value="netherlands">Netherlands</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="norway">Norway</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="paris">Paris</option>
                    <option value="poland">Poland</option>
                    <option value="portugal">Portugal</option>
                    <option value="russia">Russia</option>
                    <option value="south-africa">South Africa</option>
                    <option value="south-korea">South Korea</option>
                    <option value="spain">Spain</option>
                    <option value="sweden">Sweden</option>
                    <option value="switzerland">Switzerland</option>
                    <option value="thailand">Thailand</option>
                    <option value="turkey">Turkey</option>
                    <option value="united-states">United States</option>
                    <option value="vietnam">Vietnam</option>
                    <option value="maghreb">Morocco</option>
                  </select>
                  <input
                    className=""
                    type="text"
                    placeholder="Street"
                    name="street"
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.street}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Region"
                    name="region"
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.region}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="Postal Code / Zip"
                    name="postalCode"
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="phone"
                    name="phone"
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    placeholder="email"
                    name="email"
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <input
                    className="note"
                    type="text"
                    placeholder="Additional Information (Optional)"
                    name="notes"
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </form>
              </div>
            </div>
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
    </div>
  );
}
export default ConfirmOrder;
