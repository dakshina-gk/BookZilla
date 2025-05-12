const express = require('express');
const router = express.Router();

router.post('/create-session', async (req, res) => {
  try {
    const { items } = req.body;
    
    console.log('Checkout request received:');
    console.log('- Items:', JSON.stringify(items));
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid items in request:', items);
      return res.status(400).json({ error: 'Invalid items data' });
    }
    
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = item.quantity || 1;
      return sum + (price * quantity);
    }, 0).toFixed(2);
    
    console.log('Total order amount: $', total);
    
    const sessionId = `mock_session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    
    console.log('Created mock session:', sessionId);
    
    setTimeout(() => {
      res.json({ id: sessionId });
    }, 500);
  } catch (err) {
    console.error('Checkout Error:', err);
    res.status(500).json({ 
      error: 'Failed to create checkout session', 
      message: err.message 
    });
  }
});

router.post('/webhook', express.json(), (req, res) => {
  console.log('Received webhook:', req.body);
  res.json({ received: true });
});

module.exports = router;

