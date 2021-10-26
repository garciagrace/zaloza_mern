import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container className='wrapper'>
          <Route path='/' component={HomePage} exact />
          {/* User */}
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/account' component={ProfilePage} />
          {/* Product */}
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
