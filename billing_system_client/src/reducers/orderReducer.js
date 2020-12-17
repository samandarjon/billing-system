import {GET_ORDER, GET_ORDERS} from "../actions/types";

const initialState = {
    orders: null,
    order: null
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS: {
            return {
                ...state,
                orders: action.payload
            }
        }
        case GET_ORDER: {
            return {
                ...state,
                order: action.payload
            }
        }
        default:
            return state;
    }
}