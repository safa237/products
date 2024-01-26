import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';
import './profileInfo.css';

function ProfileInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false); 
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Add logic to handle saving data
    setIsEditing(false);
  };

  return (
    <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen ">
        <div className="header-container">
          <div className="userinfoContainer">
            <div className="imgInfo">
              <FaUser style={{ fontSize: '60px', color: 'black' }} />
              <h5>username@gmail.com</h5>
              <button onClick={handleEditClick}>Edit</button>
            </div>
            <div className="userdetailsInfo">
            <div className="flexinput">
                 <input className="name"
                    type="text"
                    name="firstName"
            placeholder="First Name"
            style={{'::placeholder': { color: 'black' }}}
          />
          <input className="name"
            type="text"
            name="Last Name"
            placeholder="Last Name"
            style={{'::placeholder': { color: 'black' }}}
          />
                 </div>

              <div className="flexinput">
                 <input className="name"
                    type="text"
                    name="Email"
            placeholder="Email"
            style={{'::placeholder': { color: 'black' }}}
          />
          <input className="name"
            type="text"
            name="phone"
            placeholder="Phone"
            style={{'::placeholder': { color: 'black' }}}
          />
                 </div>

                 <div className="flexinput">
                 <input className="name"
                    type="text"
                    name="Country"
            placeholder="Country"
            style={{'::placeholder': { color: 'black' }}}
          />
          <input className="name"
            type="text"
            name="postal code"
            placeholder="Postal Code"
            style={{'::placeholder': { color: 'black' }}}
          />
                 </div>

                 <div className="flexinput">
                 <input className="name"
            type="text"
            name="lastName"
            placeholder="City"
            style={{'::placeholder': { color: 'black' }}}
          />
                 <input className="name"
                    type="text"
                    name="street"
            placeholder="Street"
            style={{'::placeholder': { color: 'black' }}}
          />
         
                 </div>

              {isEditing && (
                <div className="flexinput flexbutton">
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
