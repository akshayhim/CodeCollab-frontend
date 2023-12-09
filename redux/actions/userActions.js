import { register, login, removeToken } from "../../src/utils/auth"; // Import removeToken function

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

// Modify logout action creator to return a function
export const logout = () => (dispatch) => {
  // Dispatch logout action with null payload
  dispatch({
    type: "LOG_OUT",
    payload: null,
  });
  // Remove token from local storage
  removeToken();
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const user = await register(userData);
    dispatch(setUser(user));
  } catch (error) {
    dispatch({ type: "REGISTER_ERROR", payload: error });
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await login(credentials);
    dispatch(setUser(user));
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error });
  }
};
