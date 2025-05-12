import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Payment.css';

const Payment = ({ cartItems, totalAmount, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format must be MM/YY';
    }
    
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // In a real app, you would integrate with a payment gateway here
      // For this example, we'll simulate a successful payment after a delay
      
      console.log('Processing payment for items:', cartItems);
      console.log('Payment information:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart from localStorage after successful payment
      localStorage.removeItem('bookshop-cart');
      
      // Navigate to success page
      navigate('/checkout/success');
    } catch (error) {
      console.error('Payment error:', error);
      setErrors({
        form: 'Payment processing failed. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    // Format card number with spaces after every 4 digits
    const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    
    // Only allow digits
    value = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    // Format with spaces
    value = formatCardNumber(value);
    
    setFormData({
      ...formData,
      cardNumber: value
    });
    
    if (errors.cardNumber) {
      setErrors({
        ...errors,
        cardNumber: ''
      });
    }
  };

  const handleExpiryDateChange = (e) => {
    let { value } = e.target;
    
    // Remove non-digits
    value = value.replace(/\D/g, '');
    
    // Add slash after month
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    setFormData({
      ...formData,
      expiryDate: value
    });
    
    if (errors.expiryDate) {
      setErrors({
        ...errors,
        expiryDate: ''
      });
    }
  };

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Payment Details</h2>
        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Total Items:</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="summary-item">
            <span>Total Amount:</span>
            <span>${totalAmount}</span>
          </div>
        </div>
        
        {errors.form && <div className="form-error">{errors.form}</div>}
        
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-section">
            <h3>Card Information</h3>
            
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                placeholder="Name as it appears on card"
                className={errors.cardName ? 'error' : ''}
              />
              {errors.cardName && <div className="error-message">{errors.cardName}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className={errors.cardNumber ? 'error' : ''}
              />
              {errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expiryDate ? 'error' : ''}
                />
                {errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setFormData({...formData, cvv: value});
                  }}
                  placeholder="123"
                  maxLength="4"
                  className={errors.cvv ? 'error' : ''}
                />
                {errors.cvv && <div className="error-message">{errors.cvv}</div>}
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Billing Address</h3>
            
            <div className="form-group">
              <label htmlFor="billingAddress">Address</label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
                placeholder="Street address"
                className={errors.billingAddress ? 'error' : ''}
              />
              {errors.billingAddress && <div className="error-message">{errors.billingAddress}</div>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <div className="error-message">{errors.city}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="ZIP / Postal code"
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={errors.country ? 'error' : ''}
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
                {/* Add more countries as needed */}
              </select>
              {errors.country && <div className="error-message">{errors.country}</div>}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="payment-button"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${totalAmount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;