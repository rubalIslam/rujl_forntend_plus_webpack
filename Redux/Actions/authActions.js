// authActions.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // Make the login request using Axios
      const response = await axios.post(`${baseURL}/login`, { email, password });

      // Save user details in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(response.data));

      // Dispatch a success action with the user data
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (error) {
      // Dispatch a failure action if login fails
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response ? error.response.data : 'Login failed',
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    // Remove user details from AsyncStorage
    await AsyncStorage.removeItem('user');

    // Dispatch a logout action
    dispatch({
      type: 'LOGOUT',
    });
  };
};
