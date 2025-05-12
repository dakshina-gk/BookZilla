import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import BookDetailPage from './pages/BookDetailPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import Footer from './components/Footer';
import SearchResults from './pages/SearchResults';
import { AuthProvider } from './context/AuthContext';
import Payment from './pages/Payment';


function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/payment" element={<Payment />} />

      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
