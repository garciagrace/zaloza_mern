import React, { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { getUserDetails } from '../actions/userActions';
import { getCartList } from '../actions/cartActions';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cartList);
  const { cartItems } = cart;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails('profile'));
      dispatch(getCartList('mycart'));
    }
  }, [dispatch, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Zaloza</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/'>
                <Nav.Link className='navbar-link'>
                  <i className='fas fa-home'></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link className='navbar-link'>
                  <i className='fas fa-shopping-cart'></i> Cart{' '}
                  {userInfo &&
                    cartItems.length !== 0 &&
                    `(${cartItems.reduce((acc, item) => acc + item.qty, 0)})`}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={`${user.firstName || 'My Profile'} ${
                    user.lastName || ''
                  }`}
                  id='username'
                >
                  <LinkContainer to='/account'>
                    <NavDropdown.Item>My Account</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='navbar-link'>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              <NavDropdown id='dashboard' title='Admin Dashboard'>
                <LinkContainer to='/admin/order'>
                  <NavDropdown.Item>Order List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/user'>
                  <NavDropdown.Item>User List</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/product'>
                  <NavDropdown.Item>Product List</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
