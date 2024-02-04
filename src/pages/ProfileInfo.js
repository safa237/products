import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios library
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';
import { selectToken } from '../rtk/slices/Auth-slice';
import './profileInfo.css';

function ProfileInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const bearerToken = useSelector(selectToken);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const allProducts = useSelector((state) => state.products);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      
      const response = await axios.put('https://ecommerce-1-q7jb.onrender.com/api/v1/user/en/update', userData,
         {
           headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      }
        );
      console.log('User data updated successfully', response.data);

      setIsEditing(false);
    } catch (error) {
      
      console.error('Error updating user data', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen">
        <div className="header-container">
          <div className="userinfoContainer">
            <div className="imgInfo">
              <FaUser style={{ fontSize: '60px', color: 'black' }} />
              <h5>username@gmail.com</h5>
              <button onClick={handleEditClick}>Edit</button>
            </div>

            <div className="userdetailsInfo">
              <div className="flexinput">
                <input
                  className="name"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  style={{ '::placeholder': { color: 'black' } }}
                  value={userData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <input
                  className="name"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  style={{ '::placeholder': { color: 'black' } }}
                  value={userData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="flexinput">
                <input
                  className="name"
                  type="text"
                  name="email"
                  placeholder="Email"
                  style={{ '::placeholder': { color: 'black' } }}
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <input
                  className="name"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  style={{ '::placeholder': { color: 'black' } }}
                  value={userData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="flexinput">
                <input
                  className="name"
                  type="text"
                  name="address"
                  placeholder="Address"
                  style={{ '::placeholder': { color: 'black' } }}
                  value={userData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
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
