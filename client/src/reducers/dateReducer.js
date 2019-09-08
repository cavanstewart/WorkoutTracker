import { CHANGE_DATE } from '../actions/types';


const initialState = {
    date: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_DATE:
            //console.log(action.payload.date)
            return {
                ...state,
                date: action.payload.date
            };
        default:
            //console.log(action.type)
            return state
    }
};