import NavHeader from "../components/NavHeader";
import { useDispatch , useSelector  } from "react-redux";
import { setSearchTerm } from '../rtk/slices/Search-slice';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLanguage , selectLanguage , selectTranslations } from '../rtk/slices/Translate-slice';
import './myorder.css';

function MyOrders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products);
    const language = useSelector(selectLanguage);
    const translations = useSelector(selectTranslations);
  
    const allProducts = useSelector((state) => state.products);

    const [searchTerm, setSearchTerm] = useState('');
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
  

      const [currentStep, setCurrentStep] = useState(1); // Set the initial step
  const [showWizard, setShowWizard] = useState(false);

  const getStepContent = (stepNumber) => {
    if (currentStep >= stepNumber) {
      return (
        <>
          <span className="check-mark">&#10003;</span>
          <span className="check-bg"></span>
        </>
      );
    } else {
      return stepNumber;
    }
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const handleDetailsClick = () => {
    setShowWizard(!showWizard);
  };
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };





    return(
        <div>
            <div className="page-container">
      {/* Header Container */}
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
      />

      {/* Green Container */}
      <div className="green-containerr">
        <div className='home-containerr testtt'>
        <div className="myOrders">
      <div className="orderInfo">
        <div>name</div>
        <div>order placed</div>
        <div>total price</div>
        <button onClick={handleDetailsClick}> {translations[language]?.track}</button>
      </div>
      {showWizard && (
        <section className="step-wizard">
          <ul className="step-wizard-list">
  <li
    className={`step-wizard-item ${currentStep === 1 ? 'current-item' : ''}`}
    onClick={() => handleStepClick(1)}
  >
    <span className="progress-count">{getStepContent(1)}</span>
    <span className="progress-label">{translations[language]?.placed}</span>
  </li>
  <li
    className={`step-wizard-item ${currentStep === 2 ? 'current-item' : ''}`}
    onClick={() => handleStepClick(2)}
  >
    <span className="progress-count">{getStepContent(2)}</span>
    <span className="progress-label">{translations[language]?.process}</span>
  </li>
  <li
    className={`step-wizard-item ${currentStep === 3 ? 'current-item' : ''}`}
    onClick={() => handleStepClick(3)}
  >
    <span className="progress-count">{getStepContent(3)}</span>
    <span className="progress-label">{translations[language]?.shipped}</span>
  </li>
  <li
    className={`step-wizard-item ${currentStep === 4 ? 'current-item' : ''}`}
    onClick={() => handleStepClick(4)}
  >
    <span className="progress-count">{getStepContent(4)}</span>
    <span className="progress-label">{translations[language]?.deliver}</span>
  </li>
</ul>
        </section>
      )}
    </div>
        </div>
        </div>
        </div>
        </div>
    );
}
export default MyOrders;