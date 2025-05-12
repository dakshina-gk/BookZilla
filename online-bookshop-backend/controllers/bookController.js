const axios = require('axios');

exports.searchBooks = async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
    const books = response.data.items.map(book => ({
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0] || 'Unknown',
      description: book.volumeInfo.description || '',
      price: Math.floor(Math.random() * 1000) + 100, // fake price
    }));

    res.json(books);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching books from API' });
  }
};
