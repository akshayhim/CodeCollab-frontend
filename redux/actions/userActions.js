import { register, login, removeToken } from "../../src/utils/auth"; // Import removeToken function

export const setUser = (token) => ({
  type: "SET_USER",
  payload: token,
});

export const logout = () => (dispatch) => {
  dispatch({
    type: "LOG_OUT",
    payload: null,
  });
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
