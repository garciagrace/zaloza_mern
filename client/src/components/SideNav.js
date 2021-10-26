import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const SideNav = () => {
  return (
    <div className='side-nav'>
      <h5>NAVIGATION</h5>
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
