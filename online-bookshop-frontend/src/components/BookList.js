import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import "../css/BookList.css";
import { fetchBooks } from "../services/bookService";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  const assignRandomPrices = (books) => {
    return books.map((book) => ({
      ...book,
      price: book.price || (Math.random() * 40 + 10).toFixed(2),
    }));
  };

  useEffect(() => {
    fetchBooks("bestsellers", 40)
      .then((fetchedBooks) => {
        const booksWithPrices = assignRandomPrices(fetchedBooks);
        setBooks(booksWithPrices);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("bookshop-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleAddToCart = (book) => {
    const isBookInCart = cart.some((item) => item.id === book.id);

    if (!isBookInCart) {
      const updatedCart = [...cart, book];
      setCart(updatedCart);
      localStorage.setItem("bookshop-cart", JSON.stringify(updatedCart));
      alert(`${book.title} added to cart!`);
    } else {
      alert(`${book.title} is already in your cart.`);
    }
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <>
          <BookCard
            className="book-card"
            key={book.id}
            book={book}
            onAddToCart={handleAddToCart}
          />
        </>
      ))}
    </div>
  );
};

export default BookList;
