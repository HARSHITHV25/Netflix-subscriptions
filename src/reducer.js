export const initialState = {
  location: "Login",
};

export const actionTypes = {
  SET_LOCATION: "SET_LOCATION",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    default:
      return state;
  }
};

export default reducer;
