import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import { getUserDetails } from '../actions/userActions';

const SideNav = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails('profile'));
    }
  }, [dispatch, userInfo]);

  return (
    <div className='side-nav'>
      <h5>NAVIGATION</h5>
      {user.isAdmin === true && (
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
