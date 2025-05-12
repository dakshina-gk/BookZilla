import BookList from '../components/BookList';
import '../css/Home.css';
import Banner from '../components/Banner';

function HomePage({ books }) {
  return (
    <div>
      <h1 className='top-title'>Welcome to BookZilla</h1>
      <Banner />
      <BookList books={books} />
    </div>
  );
}

export default HomePage;

