import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const SideNav = (isAdmin) => {
  return (
    <div className='side-nav'>
      <h5>NAVIGATION</h5>
      {isAdmin && (
        <>
          <LinkContainer to='/admin/order'>
            <p className='side-nav-link'>Order List</p>
          </LinkContainer>
          <LinkContainer to='/admin/product'>
            <p className='side-nav-link'>Product List</p>
          </LinkContainer>
          <LinkContainer to='/admin/user'>
            <p className='side-nav-link'>User List</p>
          </LinkContainer>
        </>
      )}

      <LinkContainer to='/account'>
        <p className='side-nav-link'>My Account</p>
      </LinkContainer>
      <LinkContainer to='/orders'>
        <p className='side-nav-link'>Orders & Tracking</p>
      </LinkContainer>
    </div>
  );
};

export default SideNav;
