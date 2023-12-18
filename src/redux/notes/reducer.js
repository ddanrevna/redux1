const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export function notesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NOTES/LOADING":
      return {
        ...state,
        loading: true,
      };
    case "NOTES/LOADING/SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "NOTES/LOADING/ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
