// SidebarUser.js
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FaHeart, FaShoppingCart , FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sidebaruser.css';

function SidebarUser({ isOpen, onClose  }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Notify the parent component (NavHeader) about the logout
   
    onClose();
  };

    return (
        <div className={`sidebaruser ${isOpen ? 'open' : ''}`}>
           {/*<div className="user-info">
                
                <div className="user-name">User NameUser NameUser Name</div>
            </div>
            <hr className="separator" /> */}
            <nav className="sidebar-nav">
            <Link to="/order" className="cart-link">
              <FaBars style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>orders</h5>
            </Link>
            <Link to="/wishlist" className="cart-link">
              <FaHeart style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>wishlist</h5>
            </Link>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart style={{marginRight : '15px' , fill: '#23b447e6'}} className="cart-icon" />
              <h5>cart</h5>
            </Link>
           
            </nav>
           
        </div>
    );
}

export default SidebarUser;