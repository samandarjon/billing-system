import axios from "axios";
import {GET_ERRORS, GET_PRODUCT_TAX, GET_TAX} from "./types";

export const getTax = () => dispatch => {
    axios.get("/api/billingPrice")
        .then(res => dispatch({
            type: GET_TAX,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}
export const getProductTax = (uri) => dispatch => {
    axios.get(uri)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: GET_PRODUCT_TAX,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}