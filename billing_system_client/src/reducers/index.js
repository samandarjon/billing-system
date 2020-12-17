import {combineReducers} from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import errorReducer from "./errorReducer";
import fileReducer from "./fileReducer";
import billingPricesReducer from "./billingPricesReducer";

export default combineReducers({
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
    errors: errorReducer,
    tax: billingPricesReducer,
    file: fileReducer,
});