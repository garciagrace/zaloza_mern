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
import UpdateProfilePage from './pages/UpdateProfilePage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import OrderPage from './pages/OrderPage';
import AdminOrderPage from './pages/AdminOrderPage';

const App = ({ match }) => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container className='wrapper'>
          <Route path='/' component={HomePage} exact />
          {/* User */}
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/account' component={ProfilePage} exact />
          <Route
            path='/account/update-profile/:params/'
            component={UpdateProfilePage}
          />
          {/* Product */}
          <Route path='/products/:category/' component={ProductPage} exact />
          <Route
            path='/products/:category/:id/'
            component={ProductDetailsPage}
            exact
          />
          {/* Cart */}
          <Route path='/cart' component={CartPage} />
          <Route path='/shipping' component={ShippingPage} />
          <Route path='/payment' component={PaymentPage} />
          <Route path='/placeorder' component={PlaceOrderPage} />
          {/* Order */}
          <Route path='/order/:id' component={OrderDetailsPage} />
          <Route path='/orders' component={OrderPage} />
          {/* Admin */}
          <Route path='/admin/order' component={AdminOrderPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
