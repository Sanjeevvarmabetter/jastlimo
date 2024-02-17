import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Header from './components/Header';
import Operators from './pages/Operators';
import Blogs from './pages/Blogs';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';
import './App.css';



function Home() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/operators" element={<Operators />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/booking" component={Booking} /> */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* <Route path="book-tickets" component={BookTickets} /> */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;