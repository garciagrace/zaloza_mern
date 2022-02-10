import axios from 'axios';

// Logged in user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'USER_LOGIN_REQUEST',
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });

    const token = (({ token }) => ({ token }))(data);

    localStorage.setItem('userInfo', JSON.stringify(token));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Logged out user
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'USER_DETAILS_RESET' });
  document.location.href = '/';
};

// Register user
export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_REGISTER_REQUEST',
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { firstName, lastName, email, password },
        config
      );

      const auth = {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      };

      await axios.post('/api/carts', { user: data._id }, auth);

      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      });

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      });

      const token = (({ token }) => ({ token }))(data);

      localStorage.setItem('userInfo', JSON.stringify(token));
    } catch (error) {
      dispatch({
        type: 'USER_REGISTER_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Get user details
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_DETAILS_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: 'USER_DETAILS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload: message,
    });
  }
};

// Update user details
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_UPDATE_PROFILE_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: 'USER_UPDATE_PROFILE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: 'USER_UPDATE_PROFILE_FAIL',
      payload: message,
    });
  }
};

// Get all users - admin
export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_LIST_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: 'USER_LIST_SUCCESS',
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: 'USER_LIST_FAIL',
      payload: message,
    });
  }
};

// Update user - admin
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_UPDATE_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });

    dispatch(getAllUsers());
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload: message,
    });
  }
};
