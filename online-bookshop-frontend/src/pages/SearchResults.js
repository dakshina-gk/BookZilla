import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/SearchResults.css'; 

function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the query parameter from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');

  useEffect(() => {
    // Reset state when query changes
    setResults([]);
    setLoading(true);
    setError(null);

    if (!query) {
      setLoading(false);
      return;
    }

    // Function to fetch search results
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        
        const data = await response.json();
        const books = (data.items || []).map(item => ({
          id: item.id,
          title: item.volumeInfo.title || 'No Title',
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
          price: (Math.random() * 20 + 5), // Random price for example purposes
          coverImage: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'
        }));
        
        setResults(books);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results. Please try again later.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && query) {
      const mockResults = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99, coverImage: 'https://via.placeholder.com/150' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.99, coverImage: 'https://via.placeholder.com/150' },
        { id: 3, title: '1984', author: 'George Orwell', price: 9.99, coverImage: 'https://via.placeholder.com/150' },
      ].filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      
      setTimeout(() => {
        setResults(mockResults);
        setLoading(false);
      }, 500);
    }
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Search Results for: "{query}"</h2>
      
      {loading && <div className="loading">Loading results...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && results.length === 0 && (
        <div className="no-results">No books found matching "{query}"</div>
      )}
      
      <div className="results-grid">
        {results.map(book => (
          <div key={book.id} className="book-card">
            <Link to={`/book/${book.id}`}>
              <img src={book.coverImage} alt={book.title} className="book-cover" />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-price">${book.price.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;