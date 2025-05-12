import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/CheckoutSuccessPage.css';

const CheckoutSuccessPage = () => {
  useEffect(() => {
    localStorage.removeItem('bookshop-cart');
    
  }, []);

  return (
    <div className="checkout-success">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Order Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p>We've received your order and will process it shortly.</p>
        
        <div className="success-actions">
          <Link to="/" className="home-button">Return to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage; 