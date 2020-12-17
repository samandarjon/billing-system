import {GET_PRODUCT_TAX, GET_TAX} from "../actions/types";

const initialState = {
    productTax: null,
    taxes: null
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT_TAX: {
            return {
                ...state,
                productTax: action.payload
            }
        }
        case GET_TAX: {
            return {
                ...state,
                taxes: action.payload
            }
        }
        default:
            return state;
    }
}