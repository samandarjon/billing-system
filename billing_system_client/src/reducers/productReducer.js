import {GET_PRODUCT, GET_PRODUCTS} from "../actions/types";

const initialState = {
    products: null,
    product: null
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.payload
            }
        }
        case GET_PRODUCT: {
            return {
                ...state,
                product: action.payload
            }
        }
        default:
            return state;
    }
}