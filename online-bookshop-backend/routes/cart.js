const express = require('express');
const router = express.Router();


const carts = new Map(); 

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  const userCart = carts.get(userId) || [];
  res.json({ items: userCart });
});

router.post('/:userId/items', (req, res) => {
  const { userId } = req.params;
  const { bookId, title, author, price, thumbnail, quantity = 1 } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  if (!bookId || !title) {
    return res.status(400).json({ error: 'Book ID and title are required' });
  }
  
  const userCart = carts.get(userId) || [];
  
  const existingItemIndex = userCart.findIndex(item => item.bookId === bookId);
  
  if (existingItemIndex >= 0) {
    userCart[existingItemIndex].quantity += quantity;
  } else {
    userCart.push({
      bookId,
      title,
      author,
      price,
      thumbnail,
      quantity
    });
  }
  
  carts.set(userId, userCart);
  
  res.status(201).json({ 
    message: 'Item added to cart',
    items: userCart
  });
});

router.put('/:userId/items/:bookId', (req, res) => {
  const { userId, bookId } = req.params;
  const { quantity } = req.body;
  
  if (!userId || !bookId) {
    return res.status(400).json({ error: 'User ID and Book ID are required' });
  }
  
  if (typeof quantity !== 'number' || quantity < 1) {
    return res.status(400).json({ error: 'Valid quantity is required' });
  }
  
  const userCart = carts.get(userId) || [];
  const itemIndex = userCart.findIndex(item => item.bookId === bookId);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }
  
  userCart[itemIndex].quantity = quantity;
  carts.set(userId, userCart);
  
  res.json({
    message: 'Cart updated',
    items: userCart
  });
});

router.delete('/:userId/items/:bookId', (req, res) => {
  const { userId, bookId } = req.params;
  
  if (!userId || !bookId) {
    return res.status(400).json({ error: 'User ID and Book ID are required' });
  }
  
  const userCart = carts.get(userId) || [];
  const updatedCart = userCart.filter(item => item.bookId !== bookId);
  
  carts.set(userId, updatedCart);
  
  res.json({
    message: 'Item removed from cart',
    items: updatedCart
  });
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  carts.delete(userId);
  
  res.json({
    message: 'Cart cleared'
  });
});

module.exports = router;

