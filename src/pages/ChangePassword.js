import './changepassword.css';
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

function ChangePassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
   
    
      
    return(
        <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen ">
        <div className="header-container">
          <div className='changePasswordText'>
            <h2>Change Your Password</h2>
            <h6>choose strong password and don't reuse it for other accounts</h6>
            <h6>changing your password will sign you out of all ypur devices. you will need to enter your new password on all your devices </h6>
          </div>
          <div className='changePasswordInputs'>
          <input
  className="name"
  type="password"
  name="newPassword"
  placeholder="New Password"
  autoComplete="new-password"
/>

<input
  className="name"
  type="password"
  name="confirmPassword"
  placeholder="Confirm Password"
  autoComplete="new-password"
/>

<input
  className="name"
  type="password"
  name="currentPassword"
  placeholder="Current Password"
/>
<div className="flexinput flexbutton">
                  <button>Save</button>
                  <button >Cancel</button>
                </div>

          </div>
          
                
              
        </div>
      </div>
    </div>
    );
}
export default ChangePassword;