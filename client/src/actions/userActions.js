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
  dispatch({ type: 'USER_LOGOUT' });
  document.location.href = '/';
};

// Register user
export const register =
  (firstName, lastName, contactNum, email, password) => async (dispatch) => {
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
        { firstName, lastName, contactNum, email, password },
        config
      );

      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      });

      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
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
