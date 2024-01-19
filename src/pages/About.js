import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Vita Logo2.png' ;
import goal from '../images/goal.png';
import delivery from '../images/delivery.png';
import awards from '../images/awards.png';
import people from '../images/people.png';
import email from '../images/Email icon.png';
import address from '../images/Location icon.png';
import phone from '../images/phone icon.png';
import { Link } from 'react-router-dom';

import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from '../rtk/slices/Translate-slice';
import NavHeader from '../components/NavHeader';
import './about.css';

function About() {
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
    <div className='help'>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filteredProducts={filteredProducts}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr greenabout cartGreen ">
        <div className='aboutcontent' >
          <div className='about-head'>
            <div className='imgabout'>
                <div >
                <img src={logo} alt="Logo" />
                </div>
            </div>
            <div className='infoabout'>
                <div>
                    <h5>Your trusted partner for your health needs. We provide high-quality products and distinguished 
                    service to ensure your health and comfort. Get to know us and how we care for you
                    </h5>
                </div>
                <div className='buybtn'>
                    <button className='buynowbtn'>Buy Now</button>
                </div>
            </div>
          </div>

          <div className='flexabout'>
            <div className='cardabout'>
                <div className='imgcardabout'>
                   <img src={goal} alt="goal" />
                </div>
                <div className='detailscardabout'>
                    <h3> High accuracy </h3>
                    <p> High accuracy guarantees you an excellent shopping experience on our e-commerce 
                    website, as we always strive to ensure the quality of our products and the accuracy of our services
                    </p>
                </div>
            </div>
            <div className='cardabout'>
                <div className='imgcardabout'>
                   <img src={awards} alt="awards" />
                </div>
                <div className='detailscardabout'>
                    <h3> Awards </h3>
                    <p> Winners of multiple awards, we guarantee you an exceptional shopping experience on our e-commerce website, as our 
                    services and products are distinguished by excellence and recognition.
                    </p>
                </div>
            </div>
            <div className='cardabout'>
                <div className='imgcardabout'>
                   <img src={people} alt="people" />
                </div>
                <div className='detailscardabout'>
                    <h3> Friends of yours </h3>
                    <p> We are your friends' place in the world of e-commerce, as we provide you with products and 
                    services that give you a unique and reliable shopping experience
                    </p>
                </div>
            </div>
            <div className='cardabout'>
                <div className='imgcardabout'>
                   <img src={delivery} alt="delivery" />
                </div>
                <div className='detailscardabout'>
                    <h3> Fast shipping </h3>
                    <p> We offer a fast shipping service that makes your products reach you as quickly as possible, so 
                    you can enjoy an immediate and comfortable shopping experience
                    </p>
                </div>
            </div>
          </div>
        </div>

        <div className='footerr footerPhr'>
          <div className=' header-container '>
            <div className='flexFooter'>
                <div className='cartfooter'>
                    <div className='important'>
                        <h1>important links</h1>
                        <Link className='footerlink'>privacy policy </Link>
                        <Link className='footerlink'>cookies policy </Link>
                        <Link className='footerlink'>Terms & conditions </Link>
                    </div>
                    <div className='information'>
                        <h1>Informations sur la livraison</h1>
                        <h2>Informations d'expédition Pour garantir que vos achats arrivent sans problème, assurez-vous de fournir l'adresse et le numéro de téléphone corrects pour garantir une 
                        expérience d'achat pratique et efficace. Assurez-vous que vos informations d'expédition sont à jour, y compris les détails de l'adresse et le délai de livraison souhaité, pour 
                        vous assurer de recevoir votre commande rapidement et sans retards inutiles.
                        </h2>
                    </div>
                </div>
                <div className='cartfooter cartfootertwo'>
                <div className='important'>
                        <h1>coordonnées</h1>
                        <h2>Contactez-nous pour toute demande de renseignements ou d'assistance dont vous avez besoin, nous sommes là pour vous fournir soutien et conseils
                        </h2>
                    </div>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={address}/>
                        <h2>l'adresse:</h2>
                        </div>
                        <h2>LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M) <br />
                        Tetouan: Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan
                        </h2>
                    </div>
                    <div className='flexphoneemail'>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={phone}/>
                        <h2>Phone:</h2>
                        </div>
                        <h2>00212689831227</h2>
                    </div>
                    <div className='address'>
                        <div className='flexaddress'>
                        <img  src={email}/>
                        <h2>Email:</h2>
                        </div>
                        <h2>contact@vitaparapharma.com</h2>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
