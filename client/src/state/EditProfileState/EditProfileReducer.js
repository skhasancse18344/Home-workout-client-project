import { actionTypes } from "../actionType"

export const initialState= {
    image: "",
}
export const EditProfileReducer = (state, action) =>{
    switch(action.type){

        case actionTypes.IMAGE:
        return{
            ...state,
            image:action.payload,
    }
    default: return state;
}
    }
    
