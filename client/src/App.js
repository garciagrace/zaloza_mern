import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container className='wrapper'>
          <Route path='/' component={HomePage} exact />
          <Route path='/products/:category/' component={ProductPage} exact />
          <Route
            path='/products/:category/:id/'
            component={ProductDetailsPage}
            exact
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
