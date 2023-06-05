import { actionTypes } from "../actionType";

export const initialState = {
  category: [],
  image: "",
};

export const addPostReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INPUT:
      return {
        ...state,
        category:action.payload,
       
        
      };
    case actionTypes.IMAGE:
      return {
        ...state,
        image:action.payload,
        
      };
    default:
      return state;
  }
};
