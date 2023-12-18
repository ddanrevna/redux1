import API from "../../utils/API";

export function login(email, password) {
  return async (dispatch) => {
    dispatch({ type: "USER/LOADING" });
    try {
      const query = new URLSearchParams({
        email,
        password,
      }).toString();

      const data = await API.get(`users?${query}`);

      if (data.length !== 1) {
        throw new Error("This user does not exist");
      }

      dispatch({ type: "USER/LOADING/SUCCESS", payload: data[0] });
    } catch (error) {
      dispatch({ type: "USER/LOADING/ERROR", payload: error.message });
    }
  };
}

export function register(email, password) {
  return async (dispatch) => {
    dispatch({ type: "USER/LOADING" });
    try {
      const existingUsers = await API.get(`users?email=${email}`);

      if (existingUsers.length > 0) {
        throw new Error("This user already exists");
      }

      const data = await API.signUp(email, password);

      dispatch({ type: "USER/LOADING/SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "USER/LOADING/ERROR", payload: error.message });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    dispatch({ type: "USER/LOADING" });
    try {
      dispatch({ type: "USER/LOADING/SUCCESS", payload: null });
    } catch (error) {
      dispatch({ type: "USER/LOADING/ERROR", payload: error.message });
    }
  };
}
