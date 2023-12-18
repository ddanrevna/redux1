const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "USER/LOADING":
      return {
        ...state,
        loading: true,
      };
    case "USER/LOADING/SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "USER/LOADING/ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
