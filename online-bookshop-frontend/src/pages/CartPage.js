import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Payment from './Payment'; // Import the new Payment component
import '../css/Cartpage.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [showPayment, setShowPayment] = useState(false); // New state to control payment page visibility
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = () => {
      setIsLoading(true);
      try {
        const savedCart = localStorage.getItem('bookshop-cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const removeFromCart = (bookId) => {
    const updatedCart = cartItems.filter(item => item.id !== bookId);
    setCartItems(updatedCart);
    localStorage.setItem('bookshop-cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === bookId ? {...item, quantity: newQuantity} : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('bookshop-cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setCheckoutError('Your cart is empty');
      return;
    }

    setCheckoutError(null);
    
    // Show payment page instead of navigating directly
    setShowPayment(true);
  };

  // Function to close payment overlay
  const closePayment = () => {
    setShowPayment(false);
  };

  if (isLoading) {
    return <div className="loading">Loading cart...</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.thumbnail || 'https://via.placeholder.com/100x150?text=No+Cover'} 
                  alt={item.title} 
                  className="item-image" 
                />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-author">by {item.author}</p>
                  <p className="item-price">${item.price || 'N/A'}</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                      disabled={(item.quantity || 1) <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}>
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
            {checkoutError && <div className="checkout-error">{checkoutError}</div>}
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={checkoutLoading || cartItems.length === 0}
            >
              {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}
      
      {/* Payment overlay - shown when checkout button is clicked */}
      {showPayment && (
        <Payment 
          cartItems={cartItems} 
          totalAmount={calculateTotal()} 
          onClose={closePayment} 
        />
      )}
    </div>
  );
};

export default Cart;