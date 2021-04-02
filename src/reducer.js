export const initialState = {
  location: "Login",
  user: null,
  plan: null,
  price: null,
  description: null,
  image: null,
};

export const actionTypes = {
  SET_LOCATION: "SET_LOCATION",
  SET_USER: "SET_USER",
  SET_PLAN: "SET_PLAN",
  SET_PRICE: "SET_PRICE",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  SET_IMAGE: "SET_IMAGE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_PLAN:
      return {
        ...state,
        plan: action.plan,
      };
    case actionTypes.SET_PRICE:
      return {
        ...state,
        price: action.price,
      };
    case actionTypes.SET_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };
    case actionTypes.SET_IMAGE:
      return {
        ...state,
        image: action.image,
      };
    default:
      return state;
  }
};

export default reducer;
