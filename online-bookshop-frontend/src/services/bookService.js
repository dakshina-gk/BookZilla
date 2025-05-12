export const fetchBooks = async (query = 'books', maxResults = 40) => {
  try {
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`);
    const data = await res.json();

    if (!data.items) return [];

    return data.items.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Unknown Author'],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
      description: item.volumeInfo.description || 'No description available',
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
