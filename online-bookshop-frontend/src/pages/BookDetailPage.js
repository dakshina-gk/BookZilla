import { useParams } from 'react-router-dom';
import '../css/BookDetailPage.css'

function BookDetailPage({ books }) {
  const { id } = useParams();
  const book = books.find(b => b.id === id);

  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-detail">
      <img src={book.thumbnail} alt={book.title} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <p>{book.stock > 0 ? 'In stock' : 'Out of stock'}</p>
    </div>
  );
}

export default BookDetailPage;
