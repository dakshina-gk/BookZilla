import { Link } from 'react-router-dom';
import '../css/BookCard.css';

function BookCard({ book, onAddToCart }) {
  const handleAddToCart = onAddToCart || (() => {});

  const author = book.author || book.authors?.[0] || 'Unknown Author';
  const price = book.price !== undefined ? `$${book.price}` : 'Price not available';

  return (
    <div className="book-card">
      <img 
        src={book.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover'} 
        alt={book.title} 
        className="book-image" 
      />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{author}</p>
      <p className="book-price">{price}</p>
      <div className="book-actions">
        <button 
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(book)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default BookCard;
