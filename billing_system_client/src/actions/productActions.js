import axios from "axios";
import {GET_ERRORS, GET_PRODUCT, GET_PRODUCTS} from "./types";
import {getProductTax} from "./taxActions";

export const getProductWithTerm = (term) => dispatch => {
    axios.get("/api/products/search/name?name=" + term)
        .then(res => {
            console.log(res)
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}
export const getProduct = (page = 0) => dispatch => {
    axios.get("/api/products?page=" + page + "&sort=name")
        .then(res => dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}
export const deleteProduct = (id) => dispatch => {
    axios.delete("/api/products/" + id)
        .then(() => dispatch(getProduct()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}
export const getOneProduct = (id) => dispatch => {
    axios.get("/api/products/" + id)
        .then(res => {
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
            let href = res.data._links.billingPrices.href;

            dispatch(getProductTax(href.substring(21)))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}
export const updateProduct = (id, update, history) => dispatch => {
    axios.put("/api/products/" + id, update).then(() => {
        dispatch(getProduct())
        history.push("/product")
    })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}
export const addProduct = (newProduct, history) => dispatch => {
    axios.post("/api/products", newProduct)
        .then(() => {
            dispatch(getProduct())
            history.push("/product")
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: {message: "Something is wrong!!!"}
        }))
}